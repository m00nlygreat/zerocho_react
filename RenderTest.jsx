import React, { PureComponent } from 'react';

class NumberBaseball extends PureComponent {
    state = {
        counter: 0,
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }



    onClick = () => {
        this.setState({});
    };

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

// 컴포넌트의 리렌더 조건을 명시하기위해, 컴포넌트 내부에 shouldComponentUpdate(nextProps, nextState, nextContext) 함수를 통해 bool 값을 리턴한다.
// PureComponent로 바꿔주는 방법도 있다
// PureComponent는 state의 변화를 자동으로 감지하지만, 배열이나 객체가 state에 들어가면 좀 어려워한다

export default NumberBaseball;