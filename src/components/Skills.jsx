import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
// import { Typography } from '@mui/material';
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { actionTypes, initialState, skillReducer } from '../reducers/skillReducer'
import { requestStates } from '../constants'

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);

  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios.get('https://api.github.com/users/SuzukaIwano/repos')
      .then((response) => {
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);

  const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map(item => {
      return {
        language: item,
        count: allLanguageList.filter(language => language === item).length
      }
    });
  };

  const convertCountToPercentage = (count) => {
    if (count > 10) { return 100; }
    return count * 10;
  };

  const sortedLanguageList = () => (
    state.languageList.sort((firstLang, nextLang) => nextLang.count - firstLang.count)
  )

  return (
    <>
      <div id='skills'>
        <div className='container'>
          <div>スキル</div>
          <div className='skills-container'>
            {
              state.requestStates === requestStates.loading && (
                <p className='description'>取得中…</p>
              )
            }
            {
              state.requestStates === requestStates.success && (
                sortedLanguageList().map((item, index) => (
                  <div key={index}>
                    <div className='description'>{item.language}</div>
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress color='primary' variant="determinate" value={convertCountToPercentage(item.count)} />
                    </Box>
                  </div>
                ))
              )
            }
            {
              state.requestStates === requestStates.error && (
                <p className='description'>エラーが発生しました</p>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
