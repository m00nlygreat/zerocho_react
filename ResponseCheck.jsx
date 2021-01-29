import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout;
  startTime;
  endTime;
  // 클래스 안에 사용할 변수를 미리 선언한다.
  // timeout은 실패시 초기화 하기 위해 선언해두어야 함.

  randomSecond = () => {
    return Math.floor(Math.random() * 1000) + 2000;
  };

  onClickScreen = () => {
    const { state, message, result } = this.state;

    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요.",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭!",
        });
        this.startTime = new Date();
      }, this.randomSecond());

    } else if (state === "ready") {
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요.",
      });
      clearTimeout(this.timeout);
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  }

  renderAverage = () => {
    const { state, message, result } = this.state;
    return result.length === 0 ? null : (
      <>
      <div>반응 속도: {result.reduce((a, c) => a + c) / result.length}ms</div>
      <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message, result } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
