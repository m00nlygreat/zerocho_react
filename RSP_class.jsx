import React, { Component } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: "",
    imgCoord: "0",
    score: 0,
  };

  interval;

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 200);
  } // 처음 렌더 되고 이것이 실행됨. setInterval 등의 비동기 요청에 많이 사용.

  componentDidUpdate() {} // 컴포넌트가 리렌더 될 때마다

  componentWillUnmount() {
      clearInterval(this.interval);
  } // 컴포넌트가 제거되기 직전. 부모가 this(자식)을 없앴을때. 없앤다는 건 어떻게 하는건가?

  changeHand = () => {
    const { imgCoord } = this.state;

    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => (e) => {
    clearInterval(this.interval);

    const { imgCoord } = this.state;

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 200);
    }, 500);
  }; // 고차 함수라고 불리는데, 원래 onClick에 들어가야 했을 (e) => 가 호출하는 함수에 중첩으로 들어가 있는 것이다. 고차함수를 찾아볼 것

  render() {
    const { result, imgCoord, score } = this.state;

    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        />
        <div>
          <button
            id="rock"
            className="btn"
            onClick={this.onClickBtn("바위")}
          >
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn"
            onClick={this.onClickBtn("보")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score} 점</div>
      </>
    );
  }
}

export default RSP;

// https://en.pimg.jp/023/182/267/1/23182267.jpg

// 클래스의 경우
// constructor() -> render() -> ref -> componentDidMount() -> setState/props_changed -> shouldComponentUpdate(true) -> render() -> componentDidUpdate() -> (소멸될 때) componentWillUnmount()
