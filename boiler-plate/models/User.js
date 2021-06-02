// monggoDB Model and Schema
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,  // 'minjeong park'처럼 space가 있는 문자에 space가 없어지도록 함
        unique: 1    // 똑같은 이메일은 쓸 수 없도록
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // Number==1 이면 관리자, number==0 이면 일반 유저
        type: Number,
        default: 0  // default는 0
    },
    token : {
        type : String
    },
    tokenExp: { //토큰의 유효기간
        type: Number
    }
})

// 만든 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

// 이 모델을 다른 파일에서도 쓰고싶으면 아래와 같이 해주면 됨
module.exports = {User}