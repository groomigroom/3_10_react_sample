https://ko.react.dev/learn
자습서 링크

npx create-react-app my-app으로 시작하기
npm run start로 사이트 보는 거

터미널에 npm install gh-pages --save-dev

package.json에 가장 아래에 }이후에 , 하나 쳐주고,
아래로 줄바꿈 한뒤에 "homepage": "https://사용자이름.github.io/저장소이름"
입력하기.

/*
구체적인 이유는 다음과 같습니다:
정적 자원(Assets) 경로 해결: 기본적으로 React(CRA)는 앱이 서버의 루트(/)에 호스팅된다고 가정하고 빌드합니다. 하지만 GitHub Pages 프로젝트 사이트의 URL은 보통 https://xn--jx2bx4ko9ehxa8d.github.io 형식이므로, homepage를 설정하지 않으면 JS나 CSS 파일을 찾을 때 /static/js/... 처럼 루트에서 찾으려다 404 에러가 발생합니다.
상대 경로 생성: homepage를 설정하면 빌드 도구가 해당 URL을 바탕으로 index.html 내의 자원 경로를 /저장소이름/static/...과 같이 올바른 경로로 자동 변환해 줍니다.
브라우저 라우팅 연동: react-router 등을 사용할 때 basename 설정을 위해 process.env.PUBLIC_URL을 사용하는데, 이 환경 변수의 값이 바로 package.json의 homepage에서 가져온 경로로 설정됩니다.
*/

package.json의 scripts 부분에
,
"predeploy": "npm run build",
"deploy": "gh-pages -d build" 를 추가하기.

/*
이 두 스크립트는 명령어 하나로 '빌드'와 '배포' 과정을 자동화하기 위해 추가합니다. 
각 스크립트의 역할은 다음과 같습니다.
"predeploy": "npm run build": 배포 직전에 최신 소스 코드를 실행 가능한 정적 파일(HTML, JS, CSS)로 변환하는 빌드 과정을 자동으로 실행합니다.
npm은 deploy 명령을 실행할 때 이름 앞에 pre가 붙은 스크립트가 있다면 이를 사전에 자동으로 실행하는 규칙이 있습니다.
"deploy": "gh-pages -d build": gh-pages 패키지를 사용하여 빌드된 결과물(보통 build 폴더)을 GitHub 저장소의 gh-pages 브랜치로 업로드(Push)합니다.
이 과정에서 gh-pages 브랜치가 없다면 새로 생성하고, 이미 있다면 최신 빌드 파일로 업데이트합니다. 
GitHub
GitHub
 +6
사용 효과
터미널에서 npm run deploy 명령어 딱 하나만 입력하면, 내부적으로 npm run build가 먼저 실행되어 최신 파일을 만들고, 그 결과물이 즉시 GitHub Pages로 전송되어 배포가 완료됩니다. 
DEV Community
DEV Community
 +1
코드를 수정할 때마다 매번 빌드하고 수동으로 업로드할 필요가 없어 매우 편리합니다. 
*/

터미널에서 npm run deploy를 실행하기

이제 github pages로 가서 pages->branch를 gh-pages로 설정하고 save하면 끝

그리고 codespace로 다시 열었을 때는,
npm install 후에 npm run start 해야 함,
수정 후에는 npm run deploy 해야 함.


,,,,,,,,

GitHub Codespaces 없이도 **로컬 환경에서 React 프로젝트를 GitHub Pages로 배포**할 수 있어요. `gh-pages` 패키지 사용하는 방식 기준으로 단계별로 설명할게요.

---

## 1️⃣ `gh-pages` 설치

프로젝트 루트에서 실행:

```bash
npm install gh-pages --save-dev
```

---

## 2️⃣ `package.json` 설정

### (1) `homepage` 추가

👉 배포될 URL 지정

```json
"homepage": "https://<github-username>.github.io/<repository-name>"
```

예:

```json
"homepage": "https://myname.github.io/my-react-app"
```

---

### (2) `scripts` 수정

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

설명:

* `predeploy`: 배포 전에 자동으로 build 실행
* `deploy`: build 폴더를 gh-pages 브랜치에 업로드

---

## 3️⃣ GitHub 저장소 준비

1. GitHub에 새 레포 생성
2. 로컬 프로젝트 연결

```bash
git init
git remote add origin https://github.com/<username>/<repo>.git
git add .
git commit -m "first commit"
git push -u origin main
```

---

## 4️⃣ 배포 실행

```bash
npm run deploy
```

👉 그러면:

* `gh-pages` 브랜치가 자동 생성됨
* build 결과가 업로드됨

---

## 5️⃣ GitHub Pages 설정

1. GitHub 레포로 이동
2. **Settings → Pages**
3. Source를:

```
Branch: gh-pages
Folder: / (root)
```

로 설정

---

## 6️⃣ 접속 확인

몇 분 후 아래 주소로 접속:

```
https://<username>.github.io/<repo>
```

---

## ⚠️ 자주 발생하는 문제

### 🔹 1. CSS/JS 깨짐

👉 `homepage` 경로 틀린 경우

---

### 🔹 2. React Router 사용 시 404

👉 해결 방법:

```bash
npm install --save-dev gh-pages
```

그리고 `BrowserRouter` 대신:

```jsx
<HashRouter>
```

---

### 🔹 3. 배포 안 될 때

```bash
npm run build
```

에서 에러 없는지 먼저 확인

---

## 👍 요약

1. `gh-pages` 설치
2. `homepage` 설정
3. `deploy script` 추가
4. `npm run deploy` 실행
5. GitHub Pages에서 `gh-pages` 브랜치 선택

---

원하면 **Vite 기반 React**, **custom domain 연결**, 또는 **자동 배포(GitHub Actions)**까지도 이어서 알려줄게요.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


