const React = require("react");
const { Component } = React;
const Try = require("./Try");

function getNumbers() {
  return 1;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = () => {};

  onChangeInput = () => {};

  fruits = [
    { fruit: "사과", taste: "맛있다." },
    { fruit: "배", taste: "시원하다."},
];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        {this.fruits.map((v, i) => {
          return (
          <Try key={v.fruit+v.taste} value={v} index={i}/>
          );
        })}
      </>
    );
  }
}

module.exports = NumberBaseball;

// 리액트에서 반복을 위해, map의 두번째 매개변수인 index를 사용하면, 엘리먼트의 추가/삭제를 리액트가 알아차리기 어려워 성능 문제 발생

// 클래스 컴포넌트에서, 메서드는 무조건 화살표 함수 쓰자. 안쓰면 this의 바인딩이 되지 않고 contructor 써야함.
// 화살표 함수에서, 중괄호{} 대신 바로 리턴값을 입력하여 return 문 생략 가능.

// import와 require가 다른 점.
// require는 CommonJS (Node.js 문법)
// -> Webpack에서는 무조건 CommonJS를 사용
// const A = require('R');
// module.exports = A
// module.exports는 export default와 같다고 봄.

// import는 ES2015 문법
// import는 구조분해 문법을 같이 쓸 수 있는 거 같다
// import React, { Component } from 'react';
// export default A;
// export const B;
// export const C;
// import A from 'R';
// import { B, C } from R;
