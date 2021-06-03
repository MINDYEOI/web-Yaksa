const express = require('express')
const app = express()
const port = 5000

// User.js에서 만든 model을 가져옴
const { User } = require('./server/models/User')

// body-parser 가져옴
const bodyParser = require('body-parser')
// bodyParser option
app.use(bodyParser.urlencoded({extended: true}))  //application/x-www-form-urlencoded로 된 데이터를 분석해서 가져옴
app.use(bodyParser.json())  // application/json 타입으로 된 데이터를 분석해서 가져옴

const config = require('./server/config/key')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const mongoose = require('mongoose')

const { auth } = require('./server/middleware/auth')

//이 정보는 비밀임..! 몽고DB아이디랑 비밀번호를 감춰야해..!
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('민정이짱짱맨최고최고!')
})

// 회원가입 구현
// route의 endpoint는 register
app.post('/api/users/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body) // req.body에 User의 정보를 저장

  // 비밀번호 암호화


  // mongoDB에서 오는 메서드. 정보들이 user model에 저장
  user.save((err, userInfo) => {
    // 만약 에러가 나면, json형식으로 success:false를 보내주고, 에러메시지를 보내줌
    if(err) return res.json({success: false, err})
    // 성공하면 status(200) (status(200)은 성공했다는 뜻)
    return res.status(200).json({
      success: true
    })
  }) 

})

// 로그인 구현 -> 로그인 하면 토큰 생성
app.post('/api/users/login', (req, res) => {
  // 1. 요청된 이메일이 데이터베이스에 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user)
    {
      return res.json({
        loginSuccess: false,
        message: "There is no user with that email."
      })
    }
    // 2. email과 비밀번호가 맞는지 확인 (User.js에 comparePassword 함수 정의되어 있음)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess: false, message: "Password is not match."})
    // 3. 비밀번호까지 맞다면 유저를 위한 토큰 생성 (User.js에 generateToken 함수 정의)
      user.generateToken((err, user) => { // err가 없으면 user에 정보 받아옴
          if(err) 
            return res.status(400).send(err);
    // 4. 생성한 토큰을 저장함 -> 쿠키나 로컬 스토리지 등에 저장할 수 있는데 여기선 쿠키에 저장
      res.cookie("loginCookie", user.token)
      .status(200)  //성공했다는 표시
      .json({loginSuccess: true, userId: user._id})
      })
    })
  })
})


// 인증 구현 (이 사람이 일반유저인지 관리자인지)
app.get('/api/users/auth', auth ,(req,res) => {
  // 여기까지 미들웨어(auth) 통과했으면 authentication == true 라는 뜻
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role ===  0 ? false : true,  // role이 0이면 일반 유저, role이 0이 아니면 관리자.
    isAuth: true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// 로그아웃 구현 (로그인 때 만든 토큰을 지워버림)
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, // id로 User를 찾아서 업데이터 시킴
    { token: "" }, (err, user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    }) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})