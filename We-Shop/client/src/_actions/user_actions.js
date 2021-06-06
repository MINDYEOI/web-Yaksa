import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function loginUser(logInfo){
    const request = axios.post(`${USER_SERVER}/login`,logInfo)// logInfo를 post로 전달
    .then(response => response.data); // 서버에서 받은 데이터를 request에 저장

return {    // return을 통해 Reducer로 보냄 
            // Reducer에서 previousState, action을 이용해 nextState로 만들기 때문 :: (previousState, action) => nextState
            // request를 reducer로 보내는 작업

    // action은 type과 response을 넣어줘야 함
    type: LOGIN_USER,
    payload: request    // payroad == response
}
}

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

