import React, { PureComponent, memo } from "react";

const Try = ({ tryInfo }) => {

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;

// Hooks에는 PureComponent와 같은 역할을 하는 memo가 있다.
// 자식이 모두 PureComponent 또는 memo로 구현된 경우, 부모 역시 PureComponent, memo가 될 수 있다