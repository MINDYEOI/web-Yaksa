// monggoDB Model and Schema
const mongoose = require('mongoose');
// bcrypt 가져옴
const bcrypt = require('bcrypt')
// bcrypt 사용하기 위해 salt를 생성하고 그걸 이용해 암호화 시킴
const saltRounds = 10   // salt를 몇글자 할 건지

//
const jwt = require('jsonwebtoken')

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
        bcrypt.genSalt(saltRounds, (err, salt) =>  // salt를 만드는 함수
        {
            if(err) return next(err)  // 에러 나면 return err
            bcrypt.hash(user.password, salt, (err, hash) => {   // bcrypt.hash(암호화되지 않은 pw, salt, function(err, 암호화된 비밀번호))
                if(err) return next(err)    // 에러 나면 return err
                user.password = hash    // 성공하면 user.password를 hash로 교체
                next()    
            });
        });
    }
    else
    {
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){

    // 1. plainPassword가 1234567    암호화된 비밀번호 가 같은지 체크해야함
    // 그러면 plainPassword도 암호화해서 비교해야함. (복호화 할 수 없기 때문에)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch)
    {                                            // 에러가 나면 err callback, 아니면 isMatch
        if(err)     return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb)
{
    var user = this;
    // jsonwebtoken을 이용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')    //database에 있는 id라서 _id

    user.token = token
    user.save(function(err, user){
        if(err)
            return cb(err) // 에러가 있다면 callback으로 에러 전달
        cb(null, user)    // 에러가 없다면 err는 없고 user정보만 전달
    })
    
}

userSchema.statics.findByToken = function(token, cb)
{
    var user = this;

    // 1. 토큰을 decoding
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 2. 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인.
        user.findOne({"_id": decoded, "token": token}, function(err, user){ // findOne :: mongoDB에 이미 있는 method
            // 에러가 나면
            if(err) return cb(err);
            // 에러가 안나면
            cb(null, user)
        })    
    })
}

// 만든 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

// 이 모델을 다른 파일에서도 쓰고싶으면 아래와 같이 해주면 됨
module.exports = {User}