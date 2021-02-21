import React, { Component } from "react";
import Ball from './Ball';

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {

  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];


  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(()=>{
        this.setState((prev)=>{
        return {
          winBalls : [ ...prev.winBalls, winNumbers[i]],
        };}
        )
      }, (i+1) * 1000);
      this.timeouts[6] = setTimeout(()=>{
        this.setState({
          bonus: winNumbers[6],
          redo: true,
        });
      }, 7000);
    }
  }
  componentDidMount() {
    this.runTimeouts();
  } // let을 사용하여 변수를 선언하면 클로저 문제 안생김... 리얼?
  
  componentDidUpdate(pProps, pState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  } // props와 state를 비교하여, 업데이트시마다 실행할 구문을 적어준다.

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    );
  }
}

export default Lotto;
