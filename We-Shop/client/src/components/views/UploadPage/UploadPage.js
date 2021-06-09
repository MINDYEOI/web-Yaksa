import React from 'react';
import { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd'; // css
import ImageUpload from '../../utils/ImageUpload'

const { TextArea } = Input;     // 박스크기 조절을 사용자가 임의로 가능하게 함.

// Select Options
const options = [{ key: 1, value: "a" },
    { key: 2, value: "b" },
    {key: 3, value : "c"}    
]

function UploadPage() {

    // OnChange Function
    
    const [Image, setImage] = useState("")
    const [Title, setTitle] = useState("");
    const [Info, setInfo] = useState("");
    const [Cost, setCost] = useState("");
    const [Option, setOption] = useState(1);

    const titleEvent = (event) => {
        setTitle(event.currentTarget.value);
    }

    const infoEvent = (event) => {
        setInfo(event.currentTarget.value);
    }

    const costEvent = (event) => {
        setCost(event.currentTarget.value);
    }


    const optionEvent = (event) => {
        setOption(event.currentTarget.value);
    }


    const imageEvent = (event) => {
        setImage(event.currentTarget.value);
    }

    const updateImages = ( newImages ) => {
        setImage(newImages);
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
                <h2> 업로드 </h2>
                    
            </div>

            <Form>
                {/* 파일업로드 부분은 코드가 길어서 따로 컴포넌트로 만들어버리기~! */}
                <ImageUpload refreshFunction={updateImages}/>
                <br />
                <br />
                <label>이름</label>
                <Input onChange={ titleEvent} value={Title} />
                {/* ㄴ ant design에서 가져온 Input */}
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={ infoEvent} value={Info} />
                <br />
                <br />
                <label>가격</label>
                <Input onChange={ costEvent} value={Cost} type="number"/>
                <br />
                <br />
                <select onChange={optionEvent} value={ Option}>
                    {options.map(item => (
                        <option key={item.key} value={item.key}>{ item.value}</option>
                    ))}
                    <option></option>
                </select>
                <br />
                <br />
                <Button>확인</Button>
                
            </Form>

        </div>
    )
} 

export default UploadPage
