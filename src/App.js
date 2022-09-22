import React, {useState, useEffect} from 'react';
import './App.scss';

const todoData = [
    {id: '1', title: '공부하기', comleted: true},
    {id: '2', title: '청소하기', comleted: false},
];

const App = () => {
    const [isPopup, setIsPopup] = useState('');

    // 쿠키존재확인 후 없으면 쿠키생성
    useEffect(() => {
        const popUpStatus = document.cookie.split('popup=')[1]?.split(' ')[0].replace(';', '');
        if (popUpStatus === undefined) {
            document.cookie = `popup=true; path=/`;
        } else if (popUpStatus === 'true') {
            setIsPopup('true');
        } else if (popUpStatus === 'false') {
            setIsPopup('false');
        }
    }, []);
    // 팝업 닫기
    const close = () => {
        setIsPopup(false);
    };

    // 팝업 오늘만 보기
    const todayClose = (name, value, expireDays) => {
        setIsPopup(false);
        setCookie(name, value, expireDays);
    };

    // 쿠키만료일 설정
    const setCookie = (name, value, expireDays) => {
        let date = new Date();
        date.setDate(date.getDate() + expireDays); // 일자
        // date.setMinutes(date.getMinutes() + expireDays); //분 설정

        document.cookie =
            decodeURIComponent(name) + '=' + decodeURIComponent(value) + '; path=/; expires=' + date.toUTCString();
    };

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

            <div className={isPopup === 'true' ? 'pop-up' : 'popup-none'}>
                <p>팝업</p>
                <div className="button-box">
                    <button onClick={() => todayClose('popup', 'false', 1)}>오늘 그만보기</button>
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
