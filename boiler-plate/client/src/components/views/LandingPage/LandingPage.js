import React, {useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {    

    // 로그아웃 버튼 클릭 됐을 때
    const onLogoutClickedEvent = () => {
        axios.get('/api/users/logout')
        .then(response => {
            // 만약 success:true이면 로그인 페이지로 가기
            if(response.data.success)
                props.history.push("/login");
            else
                alert("Fail to logout.")
        })
    }
    // 랜딩페이지에 들어오자마자
    useEffect(() => {
        axios.get('/api/hello') // get request를 서버로 보냄 (endpoint는 /api/hello)
        .then(response => console.log(response.data)) // 서버로부터 응답 받은 내용을 콘솔에 출력
    }, [])

    return (
        <div style={{justifyContent:'center', alignItems: 'center', display:'flex', width:'100%'}}>
            <h1>시작 페이지</h1>
            <button onClick ={onLogoutClickedEvent}> Logout </button>
        </div>

        
    )
}


export default withRouter(LandingPage)