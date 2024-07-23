// 状態管理をする
export const requestStates = {
  // 初期状態：APIを叩く前
  idle: 'IDLE',
  // ローディング中：コンテンツには何も表示できない
  loading: 'LOADING',
  // 取得成功
  success: 'SUCCESS',
  // 取得失敗
  error: 'ERROR'
};
