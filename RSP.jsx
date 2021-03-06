import React, { useState, useRef, useEffect } from "react";

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

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(changeHand, 200);
    
    return(() => {clearInterval(interval.current);});
  },[imgCoord]); 
  


  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {setImgCoord(rspCoords.가위);} 
    else if (imgCoord === rspCoords.가위) {setImgCoord(rspCoords.보);} 
    else if (imgCoord === rspCoords.보) {setImgCoord(rspCoords.바위);}
  };

  const onClickBtn = (choice) => (e) => {
    clearInterval(interval.current);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prev) => prev + 1);
    } else {
      setResult('졌습니다!');
      setScore((prev) => prev - 1);
    }

    setTimeout(() => {
      interval.current = setInterval(changeHand, 200);
    }, 500);

  }; // 여기서는 e를 안쓰니 필요 없지만 ... 고차함수 기억하기 위해 써놓았다.

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  );
};

export default RSP;

// https://en.pimg.jp/023/182/267/1/23182267.jpg

  // useEffect는 componentDidMount, componentDidUnmount의 역할, 두번째 인수인 배열에 넣은 state가 변경될 때 useEffect가 실행된다
  // 두 번째 인수로 아무것도 넣지 않으면, 처음 한 번만 실행된다.
  // 여러 state에 대해서 useEffect를 여러번 쓸 수 있다
  // 그러나 class에서는 componentDidMount, componentDidUnmount 등에서 조건문으로 state마다 분기처리 해줘야 한다.
  // 부모 컴포넌트가 리렌더될 때, 자식 역시 반드시 리렌더 되므로, memo 등을 사용해 퍼포먼스를 유지한다.

  // |                      | useEffect(()=>{},[result]) | useEffect(()=>{},[imgCoord]) | useEffect(()=>{},[score]) |
  // |----------------------|----------------------------|------------------------------|---------------------------|
  // | componentDidMount    | result                     | imgCoord                     | score                     |
  // | componentDidUpdate   | result                     | imgCoord                     | score                     |
  // | componentWillUnmount | result                     | imgCoord                     | score                     |
