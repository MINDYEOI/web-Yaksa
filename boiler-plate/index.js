const express = require('express')
const app = express()
const port = 5000

// User.js에서 만든 model을 가져옴
const { User } = require('./models/User')

// body-parser 가져옴
const bodyParser = require('body-parser')
// bodyParser option
app.use(bodyParser.urlencoded({extended: true}))  //application/x-www-form-urlencoded로 된 데이터를 분석해서 가져옴
app.use(bodyParser.json())  // application/json 타입으로 된 데이터를 분석해서 가져옴

const config = require('./config/key')

const mongoose = require('mongoose')

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
app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body) // req.body에 User의 정보를 저장

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
