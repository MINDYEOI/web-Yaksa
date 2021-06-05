import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types';


// reducer은 (previousState, action) => (nextState)로
export default function (prevState = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...prevState, loginSuccess:action.payload}  // 위의 prevState를 그대로 가져오고,
                                        // user_action.js에 있는 payload를 그대로 가져와서 return.
            break;
        case REGISTER_USER:
            return {...prevState, success:action.payload}
            break;
        default:
            return prevState;
    }
}