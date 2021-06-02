// express module을 가져옴
const express = require('express')
// 새로운 express app을 만듦
const app = express()
const port = 5000

<<<<<<< HEAD
// User.js 정보 가져옴 (회원가입 위해)
const { User } = require("./models/User")

// body-parsor 가져옴 (clinet에서 오는 정보를 서버에서 분석해서 가져올 수 있음)
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))  // application/x-www-form-urlencoded 로 되어있는 데이터를 분석해서 가져올 수 있음
app.use(bodyParser.json())  // application/json 으로 되어있는 데이터를 분석해서 가져올 수 있음

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mindyeoi:aaa111@boilerplate.djq4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
=======
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mindyeoi:20241004qw@boilerplate.djq4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
>>>>>>> 8d4c706f8fbe0f97a457ec2881c56d7c0d2862b9
{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

<<<<<<< HEAD
// 회원가입 기능
// post 메소드를 이용, end point는 register
app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보들(User.js에 있는 것들)을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body) // bodyparser가 있기 때문에 여기 User의 정보를 들어가게 할 수 있음
  user.save((err, userInfo) => {// 정보들이 user모델에 저장
          // 에러가 생기면
          if(err) return res.json({success:false, err}) //클라이언트에 에러가 있다고 json 형식으로 전달
          // 성공하면
          return res.status(200).json({
            success: true // json형식으로 success: true 전달
          })
  }) 

})

=======
>>>>>>> 8d4c706f8fbe0f97a457ec2881c56d7c0d2862b9
app.listen(port, () => 
  console.log(`Example app listening at http://localhost:${port}`)
)

