// Redux에 있는 Store에 Reducer들이 여러가지 있을 수 있다.
// -> why? : Reducer 안에서 하는 일은
// state가 어떻게 변하는지를 보여준 다음, 변한 마지막 값을 return 해주는 것.
// 웹서비스를 제작하면서 user state, comment state ... 등등 다양한 기능에 대한 state들이 존재할 수 있고
// 각각 state마다 reducer가 있어서 user reducer, comment reducer ... 등등 다양한 reducer들이 존재할 수 있음.
// ------------------------------------
// 이렇게 나눠진 다양한 reducer을 combineReducers을 통해 rootReducer에서 하나로 합쳐주는 기능을 만들 것임.
import { combineReducers } from 'redux';
// import user from './user_reducer';   // user(회원가입, 로그인, 인증, 로그아웃 기능이 있음) reducer
// import comment from './comment_reducer'; // comment기능이 있을 때 reducer

const rootReducer = combineReducers( {

})

// 다른 곳에서도 rootReducer을 쓸 수 있도록
export default rootReducer;