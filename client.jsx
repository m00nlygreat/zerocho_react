const React = require("react");
const ReactDom = require("react-dom");
import MineSweeper from './MineSweeper'


ReactDom.render(<MineSweeper />, document.querySelector("#root"));

// JSX 문법을 쓰고 싶으면 jsx 확장자로
