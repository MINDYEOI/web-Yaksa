import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage() {    
    // 랜딩페이지에 들어오자마자
    useEffect(() => {
        axios.get('/api/hello') // get request를 서버로 보냄 (endpoint는 /api/hello)
        .then(response => console.log(response.data)) // 서버로부터 응답 받은 내용을 콘솔에 출력
    }, [])

    return (
        <div style={{justifyContent:'center', alignItems: 'center', display:'flex', width:'100%'}}>
            <h1>시작 페이지</h1>
        </div>
    )
}

export default LandingPage
