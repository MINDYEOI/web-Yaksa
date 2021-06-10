![](https://images.velog.io/images/mindyeoi/post/39416bc0-636f-4034-b4f5-84d064701c03/whatmedicine.png)![](https://images.velog.io/images/mindyeoi/post/2ad382db-8e5b-4532-9e0b-e16fa32a56ae/KakaoTalk_Photo_2021-06-11-05-00-23.png)
<center> 
  <h2> 약 배달 서비스 : 약사 </h2>
  이제 아플 때 억지로 약국가지 마세요!<br>
약사가 배달해드립니다!
  </center>

## Installation
#### 이 서비스를 로컬에서 이용하기 위해선 mongoDB 계정이 필요합니다!
1. 터미널에서 다음 순서대로 입력해주세요!
```
git clone http://khuhub.khu.ac.kr/2018110650/We-Shop.git
cd We-Shop
npm install
cd client
npm install
```

2. `We-Shop/server/config` 폴더에 `dev.js` 파일을 만들어주세요!
3. `We-Shop/server/config/dev.js` 파일에 다음을 입력하고 저장해주세요!
```module.exports = {
  mongoURI: "mongodb+srv://<mongoDBID>:<mongoDBpw>@boilerplate.djq4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```
`<mongoDBID>`,`<mongoDBpw>`에는 각각 사용자님의 계정정보가 들어가야 합니다!
4. `We-Shop` 루트 디렉토리에서 terminal에 다음 명령어를 입력해주세요!
```
npm run dev
```

## Commit Message Convention
* 이슈 및 기능 단위 커밋으로 관리하였습니다.
* 커밋 메시지 형식은 다음과 같습니다.
```
[feat] : 새로운 기능 개발
[fix] : 버그 수정
[docs] : 문서 수정/추가, 폴더 구조 변경
[update] : 기존 기능 업데이트
[merge] : 브랜치 merge
```
## Branch Strategy : Git-Flow
### 🏳️ main 
- 기본적으로 제공되는 브랜치.
- 버전 업그레이드 시에 이 브랜치에 업그레이드 됩니다.

### 🏴 develop
- 기능 개발/업데이트를 하기 위해 만들어 놓는 브랜치입니다.
- 실질적인 main 브랜치입니다.
- client와 server을 merge하는 공간입니다.

### 🎁 client
- client 부분 기능 개발/업데이트를 하기 위해 만들어 놓는 브랜치입니다.

### 👾 server
- server 부분 기능 개발/업데이트를 하기 위해 만들어 놓은 브랜치입니다.
