import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();
  // ref로 선언을 했다면, current를 꼭 붙여주어야 함.
  // class component에서 클래스 멤버변수로 선언했다면, Hooks에서는 Ref로
  // Ref란, 화면에는 영향을 주지 않는 변수 값을 선언할 때 사용한다.

  const randomSecond = () => {
    return Math.floor(Math.random() * 1000) + 2000;
  };

const onClickScreen = () => {
    
    if (state === "waiting") {

      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");

      timeout.current = setTimeout(() => {

        setState("now");
        setMessage("지금 클릭!");
        
        
        startTime.current = new Date();
      }, randomSecond());

    } else if (state === "ready") {


      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
      clearTimeout(timeout);
    } else if (state === "now") {
      endTime.current = new Date();

      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
      
    }


};

const onReset = () => {
  setResult([]);
};

const renderAverage = () => {
  return result.length === 0 ? null : (
    <>
      <div>반응 속도: {result.reduce((a, c) => a + c) / result.length}ms</div>
      <button onClick={onReset}>리셋</button>
    </>
  );
};

return (
  <>
    <div id="screen" className={state} onClick={onClickScreen}>
      {message}
    </div>
    {renderAverage()}
  </>
);
};


export default ResponseCheck;
