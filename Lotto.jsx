import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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

const Lotto = () => {
  const lottoNumbers = useMemo(()=>getWinNumbers(), []);
  // 두 번째 인자의 값이 변경되지 않는 한 다시 실행되지 않는다
  // hooks 에서는 함수 컴포넌트가 매번 다시 실행되는데, 여기서 함수의 리턴값이 변경되지 않게 하기 위해 useMemo를 사용

  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // 조건에 따라 달리 실행되는 구문에 hooks를 사용하지 마라.
  // 항상 같은 구조를 갖을 수 있게끔 함수 컴포넌트의 최상단에 선언할 것

  useEffect(()=>{

    console.log('useEffect');

    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(()=>{setWinBalls((prev)=>[ ...prev, winNumbers[i]]);}, (i+1) * 1000);
      timeouts.current[6] = setTimeout(()=>{setBonus(winNumbers[6]);setRedo(true);}, 7000);
    } // runTimeouts

    return () => {
      timeouts.current.forEach((v)=>{
        clearTimeout(v);
      })
    };  // componentWillUnmount

  }, [timeouts.current]); 

  useEffect(()=>{
    console.log('로또 숫자를 생성합니다.');
  },[winNumbers]);

  // 두번째 인수가 빈 배열이면, componentDidMount와 같다.
  // 배열에 요소가 있으면, componentDidMount와 componentDidUpdate 둘 다 수행

  const onClickRedo = useCallback(() => {

    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, []);

  // 함수 컴포넌트가 매번 재 실행될때, useCallback으로 함수를 감싸면, 해당 함수가 새로 선언되지 않는다.
  // useCallback의 안에서 state를 사용하는 경우, 두 번째 인자에 그 state를 넣어줘야 한다. 그렇지 않으면 해당 state의 변화를 막는다.
  // 자식 컴포넌트에 함수를 props로 전달할 때는 반드시 useCallback을 사용해야 한다. 띠용.. 안그러면 자식 컴포넌트가 항상 리렌더됨... 미쳤다 개어려워

  return (
    <>
    <div>당첨 숫자</div>
    <div id="결과창">
      {winBalls.map((v) => (
        <Ball key={v} number={v} />
      ))}
    </div>
    <div>보너스!</div>
    {bonus && <Ball number={bonus} onClick={onClickRedo} />}
    {redo && <button onClick={onClickRedo}>한번 더!</button>}
  </>
  )
}

export default Lotto;


// useEffect를 단독으로 2번째 인수를 빈 배열로 사용하면 componentDidMount와 같은 효과이다
// 2번째 인수가 빈배열이 아니더라도 ComponentDidMount 를 포함하여 효과를 낸다
// 이것을 막기 위해, 즉 componentDidUpdate의 효과만을 내기 위해서 다음과 같은 패턴을 사용

/*
const mounted = useRef(false);
useEffect(() => {
 if (!mounted.current) {
 mounted.current = true;
 } else {
 componentDidMount();
}}, [감시할 값]);
*/