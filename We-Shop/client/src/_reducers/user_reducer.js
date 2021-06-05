import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';


// reducer은 (previousState, action) => (nextState)로
export default function (prevState = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...prevState, loginSuccess:action.payload}  // 위의 prevState를 그대로 가져오고,
                                        // user_action.js에 있는 payload를 그대로 가져와서 return.
                                        // loginSuccess는 server/index.js 에서 login에 성공하면 json type으로 loginSuccess: true를 전달하라고 했기 때문
            break;
        case REGISTER_USER:
            return {...prevState, success:action.payload}
                                // success는 server/index.js 에서 register에 성공하면 json type으로 success: true를 전달하라고 했기 때문
            break;

        case AUTH_USER:
            return {...prevState, user:action.payload}
            break;    
        default:
            return prevState;
    }
}