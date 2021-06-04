import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage() {    
    // 랜딩페이지에 들어오자마자
    useEffect(() => {
        axios.get('/api/hello') // get request를 서버로 보냄 (endpoint는 /api/hello)
        .then(response => console.log(response.data)) // 서버로부터 응답 받은 내용을 콘솔에 출력
    }, [])

    return (
        <div>
            LandingPage 랜딩페이지
        </div>
    )
}

export default LandingPage
