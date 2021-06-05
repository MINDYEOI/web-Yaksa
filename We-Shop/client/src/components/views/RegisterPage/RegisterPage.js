import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux';
import {RegisterUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {

    // 이 로그인페이지 안에서 input에 타이핑을 함으로써 데이터를 변화시켜주므로 state 사용.
    // 1-1. state을 사용하기 위해 state 만들어줌.
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");   // 1-2. email을 위한 state
    const [Password, setPassword] = useState(""); // 1-2. password를 위한 state
    const [Password2, setPassword2] = useState("");

    //1-3. 아래 input value에 넣어줌

    // 2-1. 타이핑할 때 타이핑 하는 거 보이게 하도록 핸들러를 만들어줌
    const emailEvent = (event) => {
        setEmail(event.currentTarget.value)
    }
    const passwordEvent = (event) => {
        setPassword(event.currentTarget.value)
    
    }
    const password2Event = (event) => {
        setPassword2(event.currentTarget.value)
    
    }  
    const NameEvent = (event) => {
        setName(event.currentTarget.value)
    
    }

    const dispatch = useDispatch();
    const submitEvent = (event) => {
        event.preventDefault(); // 이걸 하지 않으면 버튼을 누를 때마다 refresh돼서 데이터 처리를 할 수 없음
        
        //console.log('Email', Email); // 잘 나오는지 확인
        //console.log('Password', Password); // 잘 나오는지 확인

        // 비밀번호 두개가 같아야 회원가입이 되도록
        if(Password !== Password2)
            return alert('비밀번호가 일치하지 않습니다.')


        let regiInfo = {    // 보내주기 위해 저장
            name : Name,
            email: Email,
            password: Password
        }
    
        dispatch(RegisterUser(regiInfo)) // _actions폴더 user_action.js에 있음
            .then(response => {
                if(response.payload.success)
                    props.history.push('/login');
                
                else
                    alert('Fail to sign up');
                })
        
    }

    return (
        <div style={{
            justifyContent:'center', alignItems: 'center', display:'flex', width:'100%', height:'50vh'
        }}>
            <form onSubmit={submitEvent} style={{display: 'flex', flexDirection: 'column'}}>

                <label>Name</label>
                <input type="text" value={Name} onChange={NameEvent} />

                <label>Email</label>
                <input type="email" value={Email} onChange={emailEvent} />
                {/* input type="email"이라서 '이메일 주소에 '@'를 포함해주세요'라는 경고문 뜸. */}


                <label>Password</label>
                <input type="password" value={Password} onChange={passwordEvent} />

                <label>Confirm Password</label>
                <input type="password" value={Password2} onChange={password2Event} />
                
                <br/> 
                <button>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
