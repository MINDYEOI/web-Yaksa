// monggoDB Model and Schema
const mongoose = require('mongoose');
// bcrypt 가져옴
const bcrypt = require('bcrypt')
// bcrypt 사용하기 위해 salt를 생성하고 그걸 이용해 암호화 시킴
const saltRounds = 10   // salt를 몇글자 할 건지

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

// index.js의 app.post('/register', (req, res)에 있는
// user model에 user 정보를 저장하기 전에 무엇을 한다는 것
// function( next )를 해서 얘네가 끝난 다음에 다음걸 실행해라~
userSchema.pre('save', function( next ){
    var user = this

    if(user.isModified('password')) // password를 변경할 때만 적용되도록..
    {
        // 비밀번호 암호화 (https://www.npmjs.com/package/bcrypt 에서 가져옴)
        bcrypt.genSalt(saltRounds, function(err, salt)  // salt를 만드는 함수
        {
            if(err) return next(err)  // 에러 나면 return err
            bcrypt.hash(user.password, salt, function(err, hash) {   // bcrypt.hash(암호화되지 않은 pw, salt, function(err, 암호화된 비밀번호))
                if(err) return next(err)    // 에러 나면 return err
                user.password = hash    // 성공하면 user.password를 hash로 교체
                next()    
            });
        });
    }
 

})


// 만든 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

// 이 모델을 다른 파일에서도 쓰고싶으면 아래와 같이 해주면 됨
module.exports = {User}