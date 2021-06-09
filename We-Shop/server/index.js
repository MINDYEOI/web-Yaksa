const express = require("express")
const app = express()
const port = process.env.PORT || 5000

const path = require("path");
const cors = require('cors')

// body-parser 가져옴
const bodyParser = require('body-parser')
// bodyParser option
app.use(bodyParser.urlencoded({extended: true}))  //application/x-www-form-urlencoded로 된 데이터를 분석해서 가져옴
app.use(bodyParser.json())  // application/json 타입으로 된 데이터를 분석해서 가져옴
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const config = require("./config/key");


const mongoose = require("mongoose");


const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB ---> Connected'))
  .catch(err => console.log(err));

app.use(cors())


app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));


// 이미지 가져오려고
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server ---> http://localhost:${port}`)
});