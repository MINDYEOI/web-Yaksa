const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리
  // 1. client 쿠키에서 토큰을 가져옴.
  let token = req.cookies.w_auth;

  // 2. 토큰을 복호화한 후 유저를 찾는다. (User.js에 findByToken(); 있음)
  User.findByToken(token, (err, user)=>{
    // 에러가 있으면
    if(err) throw err;
    // 유저가 없으면
    if(!user) return res.json({ isAuth:false, error: true})
    // 에러도 없고 유저도 있으면
    req.token = token;  // token과 user를 request에 넣어줌으로써 index.js에서 request 사용할 수 있음
    req.user = user;
    next();
});

// 3. 유저가 있으면 인증OK, 유저가 없으면 인증No!
}

// 이 auth를 다른 파일에서도 쓸 수 있도록
module.exports = { auth };