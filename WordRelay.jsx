const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {

  const [word, setWord] = useState('제로초');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setValue('');
      setWord(value);
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
   
  return (
    <>
      <div>{word}</div>
      <form action="" onSubmit={onSubmitForm}>
        <label id="label" htmlFor="wordInput">글자를 입력하세요.</label>
        <input type="text" ref={inputRef} value={value} onChange={onChangeInput}/>
        <button id="wordInput" className="wordInput" >입력!</button>
      </form>
      <div>{result}</div>
    </>
  )

}

  




module.exports = WordRelay;
