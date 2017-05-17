/**
 * Created by gbl17 on 2017/4/24.
 */
//该用法无效
// export const user = {
//   name3: state => state.mUserName,
//   password3 (state) {
//     return state.mPassWord + 'getters'
//   }
// }
export const evenInfos = (state) => {
  return state.todos.filter(todo => todo.done)
}
export const list = (state) => state.financeList
