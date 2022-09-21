import React, {useState, useEffect} from 'react';
import './App.css';

const todoData = [
    {id: '1', title: '공부하기', comleted: true},
    {id: '2', title: '청소하기', comleted: false},
];

const App = () => {
    const [isPopup, setIsPopup] = useState(true);

    useEffect(() => {});

    const close = () => {
        setIsPopup(!isPopup);
    };

    const todayClose = () => {};

    return (
        <div>
            <div className="todoBlock">
                <div className="title">
                    <h1>할 일 목록</h1>
                </div>
                {todoData.map(data => {
                    const {id, title, completed} = data;
                    return (
                        <div key={id}>
                            <input type="checkbox" defalutchecked={completed} />
                            {title}
                            <button>x</button>
                        </div>
                    );
                })}
            </div>
            <div className={isPopup ? 'pop-up' : 'none'}>
                <p>팝업</p>
                <div className="button-box">
                    <button onClick={() => todayClose()}>오늘 그만보기</button>
                    <button onClick={() => close()}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default App;
// export default class App extends Component {
//     btnStyle = {
//         color: '#fff',
//         border: 'none',
//         padding: '5px 9px',
//         borderRadius: '50%',
//         cursor: 'pointer',
//         float: 'right',
//     };

//     getStyle = () => {
//         return {
//             padding: '10px',
//             borderBottom: '1px #ccc dotted',
//             TextDecoration: 'none',
//         };
//     };

//     todoData = [
//         {id: '1', title: '공부하기', comleted: true},
//         {id: '2', title: '청소하기', comleted: false},
//     ];
//     render() {
//         return (
//             <div className="container">
//                 <div className="todoBlock">
//                     <div className="title">
//                         <h1>할 일 목록</h1>
//                     </div>
//                     {this.todoData.map(data => {
//                         const {id, title, completed} = data;
//                         return (
//                             <div style={this.getStyle()} key={id}>
//                                 <input type="checkbox" defalutChecked={completed} />
//                                 {title}
//                                 <button style={this.btnStyle}>x</button>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         );
//     }
// }
