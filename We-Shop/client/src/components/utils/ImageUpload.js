import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';

function ImageUpload() {

    const imageDropEvent = (files) => {
        let imageData = new FormData();

        const config = {
            header: {'content-type': 'multipart/image-data'}
        }
        imageData.append("file", files[0])

        // 이미지 전달
        axios.post('/api/product/image', imageData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                }
                else {
                    alert('파일 저장을 실패했습니다.')
                }
        })

    }
    return (
        <div style={ {display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={imageDropEvent}>
            {({getRootProps, getInputProps}) => (
            <section>
                        <div style={{
                            width: 300, height: 200, border: '1px solid lightgray', borderRadius: '1em', display: 'flex',
                            alignItems: 'center', textAlign: 'center', justifyContent: 'center'
                        }}
                {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>이곳을 클릭하여 <br/> 상품 사진을 업로드 해주세요.</p>
                 </div> 
            </section>
  )}
</Dropzone>
        </div>
    )
}

export default ImageUpload
