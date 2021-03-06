
import React, {memo} from 'react';

const Ball = memo(({number}) => {
    let background;
    console.log(number);
    if (number<= 10) { background = 'red';} 
    else if (number<= 20) { background = 'orange';} 
    else if (number<= 30) { background = 'yellow';} 
    else if (number<= 40) { background = 'blue';} 
    else { background = 'green';} 

    return (
        <div className="ball" style={{background}}>{number}</div>
    )
});

// 함수 컴포넌트, not hooks

// import React, { PureComponent } from 'react';
// class Ball extends PureComponent {
//     render() {
//         const { number } = this.props;
//         let background;
//         if (number<= 10) { background = 'red';} 
//         else if (number<= 20) { background = 'orange';} 
//         else if (number<= 30) { background = 'yellow';} 
//         else if (number<= 40) { background = 'blue';} 
//         else { background = 'green';} 

//         return (
//             <div className="ball" style={{background}}>{number}</div>
//         )
//     }
// }

export default Ball;