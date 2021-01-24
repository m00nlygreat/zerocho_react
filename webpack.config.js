const path = require("path");

module.exports = {
  name: "word-relay-setting",
  mode: "development",
  devtool: "eval",

  resolve: {
      extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./client'],
  },

  module: {
      rules: [{
          test: /\.jsx?/,
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
          }
      }]

  },
  
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};

// client.js와 WordRelay.jsx 를 합쳐서 ./dist/app.js로 합쳐줌.
// WordRelay.jsx는 client.jsx가 이미 require 하고 있으므로, webpack이 알아서 합쳐준다.

// resolve, extensions:: entry에 확장자 생략.
// dist directory는 예제를 복잡하게 하기 위한 것. __dirname은 현재 디렉토리
// mode: 'development'는 실 서비스에서는 production으로 변경.

// @babel/core
// @babel/preset-env 환경에 맞게 알아서 바꿔줌
// @babel/preset-react JSX 사용을 가능케해줌.
// babel-loader 웹팩과 바벨을 연결해줌.

// @babel/plugin-proposal-class-properties 뭔진 모르겠지만 에러 떠서 추가.