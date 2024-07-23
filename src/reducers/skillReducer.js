import { requestStates } from "../constants";

// 4つの状態を変化させるアクション
export const actionTypes = {
  initial: 'INITIAL',
  fetch: 'FETCHING',
  success: 'FETCH_SUCCESS',
  error: 'FETCH_ERROR'
}

// 初期ステートをオブジェクト型で定義
export const initialState = {
  languageList: [],
  requestState: requestStates.idle,
}

export const skillReducer = (
  state, action
) => {
  switch (action.type) {
    case actionTypes.initial: {
      return {
        languageList: [],
        requestState: requestStates.initial
      }
    }
    case actionTypes.fetch: {
      return {
        ...state,
        requestState: requestStates.loading
      }
    }
    case actionTypes.success: {
      return {
        languageList: action.payload.languageList,
        requestState: requestStates.success
      }
    }
    case actionTypes.error: {
      return {
        languageList: [],
        requestState: requestStates.error
      }
    }
    default: {
      throw new Error();
    }
  }
}
