const React = require("react");
const { Component } = React;
import Try from './Try';

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
} // this를 사용하지 않는 함수는 컴포넌트 바깥에 있어도 된다. 그러면 다른 데서도 사용 가능하지만, 그럴 일은 잘 없다

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, {try: this.state.value, result: '홈런!'}],
        }
      }); // tries는 직전 state의 배열에 값을 추가하고 있기 때문에, 함수형 setState로 prevState를 참조한다.
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = this.state.value.split('').map((v)=>parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9 ) {
        this.setState({
          result: `10번 넘게 틀려서 실패~ 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1){
          if (answerArray[i] === this.state.answer[i]) {
            strike +=1;
          }
            else if (this.state.answer.includes(answerArray[i])) {
              ball += 1;
            }
          }
          this.setState((prevState) => {
            return {
              tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
              value: '',
            }
          });
        }
      }
    }
  

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  render(){
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {tries.length}</div>
        {tries.map((v, i) => {
          return <Try key={`${i+1}차 시도: `} tryInfo={v} />;
        })}
      </>
    );
  };
};

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
