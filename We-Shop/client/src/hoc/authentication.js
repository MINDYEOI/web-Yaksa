// 사용자의 상태를 보고
// 해당 페이지에 들어갈 수 있게 할지 안할지 결정해 줌. hoc 이용.
import axios from 'axios';
import React, {useEffect} from 'react';
//import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'


export default function (SpecificComponent, option, adminRoute = null){
                                            // ㄴ option 종류
                                            //   - null  아무나 출입 가능한 페이지
                                            //   - true  로그인한 유저만 출입 가능
                                            //   - false 로그인한 유저 출입 불가능

    function AuthenticationCheck(props) {
        //1. backend에 request를 날려서 사용자의 상태를 확인
        const dispatch = useDispatch(); // 1-1. dispatch 사용
        useEffect(() => {  
            dispatch(auth()) // 페이지가 이동할 때마다 dispatch가 작동해서 backend에 request를 줌 
            .then(response => { // 받은 response
                console.log(response);
                

                // 로그인 안했다면
                if(!response.payload.isAuth) {
                    if(option) {  // 만약 위 option이 true이면 (로그인한 유저만 출입 가능한 페이지로 가게 하려면)
                        props.history.push('/login');   // 로그인 하게 함
                    }
                }
                
                // 로그인 했다면
                else {
                    if(adminRoute && !response.payload.isAdmin) {  // admin만 갈 수 있는 페이지를 admin이 false 사람이 들어가려 한다면
                        props.history.push('/');    // 홈페이지로 돌아가게 함
                    }
                    else { 
                        if(option===false) {// 로그인한 유저가 출입 불가능한 곳을 가려고 한다면
                            props.history.push('/'); // 홈페이지로 돌아가게 함
                
                        }
                    }
                }
                })
        },[])
    
        return (
            <SpecificComponent />
        )
        
        }

    return AuthenticationCheck
}