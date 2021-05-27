// express module을 가져옴
const express = require('express')
// 새로운 express app을 만듦
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mindyeoi:20241004qw@boilerplate.djq4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => 
  console.log(`Example app listening at http://localhost:${port}`)
)

