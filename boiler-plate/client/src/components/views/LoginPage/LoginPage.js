import axios from 'axios';
//import { response } from 'express';
import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'

function LoginPage() {
    

    // 이 로그인페이지 안에서 input에 타이핑을 함으로써 데이터를 변화시켜주므로 state 사용.
    // 1-1. state을 사용하기 위해 state 만들어줌.
    const initialState = "";
    const [Email, setEmail] = useState(initialState);   // 1-2. email을 위한 state
    const [Password, setPassword] = useState(initialState); // 1-2. password를 위한 state
    //1-3. 아래 input value에 넣어줌

    // 2-1. 타이핑할 때 타이핑 하는 거 보이게 하도록 핸들러를 만들어줌
    const emailEvent = (event) => {
        setEmail(event.currentTarget.value)
    }
    const passwordEvent = (event) => {
        setPassword(event.currentTarget.value)
    
    }

    const dispatch = useDispatch();
    const submitEvent = (event) => {
        event.preventDefault(); // 이걸 하지 않으면 버튼을 누를 때마다 refresh돼서 데이터 처리를 할 수 없음
        
        //console.log('Email', Email); // 잘 나오는지 확인
        //console.log('Password', Password); // 잘 나오는지 확인

        let logInfo = {    // 보내주기 위해 저장
            email: Email,
            password: Password
        }
    
        dispatch(loginUser(logInfo)) // _actions폴더 user_action.js에 있음
        
    }
    return (
        <div style={{
            justifyContent:'center', alignItems: 'center', display:'flex', width:'100%', height:'50vh'
        }}>
            <form onSubmit={submitEvent}>
                <label>Email</label>
                <input type="email" value={Email} onChange={emailEvent} />
                {/* input type="email"이라서 '이메일 주소에 '@'를 포함해주세요'라는 경고문 뜸. */}
                <label>Password</label>
                <input type="password" value={Password} onChange={passwordEvent} />
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
