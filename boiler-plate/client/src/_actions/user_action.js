import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';
export function loginUser(logInfo) {
    const request = axios.post('/api/users/login', logInfo) // logInfo를 post로 전달
        .then(response => response.data); // 서버에서 받은 데이터를 request에 저장

    return {    // return을 통해 Reducer로 보냄 
                // Reducer에서 previousState, action을 이용해 nextState로 만들기 때문 :: (previousState, action) => nextState
                // request를 reducer로 보내는 작업

        // action은 type과 response을 넣어줘야 함
        type: "LOGIN_USER",
        payload: request    // payroad == response
    }
}

export function RegisterUser(regInfo) {
    const request = axios.post('/api/users/register', regInfo) // logInfo를 post로 전달
        .then(response => response.data); // 서버에서 받은 데이터를 request에 저장

    return {    // return을 통해 Reducer로 보냄 
                // Reducer에서 previousState, action을 이용해 nextState로 만들기 때문 :: (previousState, action) => nextState
                // request를 reducer로 보내는 작업

        // action은 type과 response을 넣어줘야 함
        type: "REGISTER_USER",
        payload: request    // payroad == response
    }
}