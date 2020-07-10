# Customer Frontend

Origin Repo
https://github.com/dunky11/react-saas-template

[**Check out the demo Origin**](https://reactsaastemplate.com)

[<img src="/.github/gifs/showcase.gif">](https://festive-goldberg-4b77e9.netlify.app 'Go to demo website')

### Prerequisites

#### Node.js 12+ (versions below could work, but are not tested)

- Linux:

  ```
  sudo apt install nodejs npm
  ```

- Windows or macOS:

  https://nodejs.org/en/

### Installing

1. Clone the repository

   ```
   git clone https://github.com/benpengtw/customer-frontend
   ```

2. Install dependencies, this can take a minute

   ```
   cd customer-frontend
   npm install
   ```

3. Start the local server

   P.S. 此專案沒有設定檔，但是可由 package.json 中的預設指令來設定不同的 env 資訊，指令包含以下資訊，可在 package.json 更改

   REACT_APP_URL= 非根目錄佈屬的 path  
   REACT_APP_API=api sever  
   REACT_APP_MERCHANTID= 藍新測試 MERCHANTID  
   REACT_APP_HASHKEY= 藍新測試 HASHKEY  
   REACT_APP_HASHV= 藍新測試 HASHV

   ```
   npm start:test || npm start:dev
   ```

Your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page.

### What to do next?

If you already know React, then most of the information you need is in the [Material-UI documentation](https://material-ui.com/getting-started/usage/).

You can go into [src/theme.js](/src/theme.js) and change the primary and secondary color codes at the top of the script to the values you like and some magic will happen.

狀態管理使用 mobx，可參考 https://github.com/gothinkster/react-mobx-realworld-example-app

## Deployment

If you are happy with the state of your website you can run:

```
npm run build:stag || npm run build:dev || npm run build:test
```

It will create a folder named build with your compiled project inside. After that copy its content into your webroot and you are ready to go.

或者是使用 ./docker-compose.yml 裡的 nginx 掛載它

如果要上 netlify ，需要在 Environment variables 增加 CI=false

## Build With

- [Create-React-App](https://github.com/facebook/create-react-app) - Used to bootstrap the development
- [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
- [React-Router](https://github.com/ReactTraining/react-router) - Routing of the app
- [Pace](https://github.com/HubSpot/pace) - Loading bar at the top
- //[Emoji-Mart](https://github.com/missive/emoji-mart) - Picker for the emojis
- //[React-Dropzone](https://github.com/react-dropzone/react-dropzone) - File drop component for uploads
- //[Recharts](https://github.com/recharts/recharts) - Charting library I used for the statistics
- [Aos](https://github.com/michalsnik/aos) - Animations based on viewport
- //[React-Cropper](https://github.com/roadmanfong/react-cropper) - Cropper for the image uploads
- //[React-Stripe-js](https://github.com/stripe/react-stripe-js) - Stripes payment elements
- [mobx](https://github.com/stripe/react-stripe-js) - obervable 狀態管理
- [mobx-react](https://github.com/stripe/react-stripe-js) - Stripes payment elements
- [axios](https://github.com/stripe/react-stripe-js) - 打 API 用

## Memos

mobx-react 使用教學 https://blog.csdn.net/roamingcode/article/details/103582180

@observable 'object' 一定要設初值，只有規定 type 是不夠的

CRA 非根目錄佈屬 https://igakki.com/2020/03/21/CRA%E8%B5%B7%E6%89%8B%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2%E5%88%B0%E9%9D%9E%E6%A0%B9%E7%9B%AE%E5%BD%95/

src\shared\TradInfo.ts 裡包含串接藍新金流時所需要的加密方法，其出處為 https://github.com/libterty/newebpay
