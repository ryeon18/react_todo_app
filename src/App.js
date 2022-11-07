import React, {useState, useEffect} from 'react';
import './App.scss';

const todoData = [
    // {id: '1', title: '공부하기', completed: true},
    // {id: '2', title: '청소하기', completed: false},
];

const App = () => {
    const [isPopup, setIsPopup] = useState(''); // 팝업창
    const [todoList, setTodoList] = useState(todoData); // 할일목록
    const [addTitle, setTitle] = useState(''); // 할일 제목

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

    // useEffect(() => {
    //     setTodoList();
    // }, [todoList]);

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

    // 리스트 지우기
    const removeList = id => {
        let newTodoData = todoList.filter(data => data.id !== id);
        setTodoList(newTodoData);
    };

    //  할일 리스트 제목
    const handleTitle = e => {
        setTitle(e.target.value);
    };

    // 할일 리스트 추가
    const handleSubmit = e => {
        e.preventDefault();
        if (addTitle.length <= 0) {
            return alert('해야 할 일을 입력해 주세요');
        } else {
            let newTodo = {
                id: Date.now(),
                title: addTitle,
                completed: false,
            };
            setTodoList(prev => [...prev, newTodo]);
            setTitle('');
        }
    };

    const handleCompleteChange = id => {
        let newTodoList = todoList.map(data => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });

        setTodoList(newTodoList);
    };

    return (
        <div>
            <div className="todo-block">
                <div className="title">
                    <h1>할 일 목록</h1>
                </div>
                <form className="add-list" onSubmit={e => handleSubmit(e)}>
                    <input
                        type="text"
                        name="value"
                        placeholder="해야 할 일을 입력하세요."
                        value={addTitle}
                        className="list-title"
                        onChange={e => handleTitle(e)}
                    />
                    <input type="submit" value="입력" className="submit-btn" />
                </form>
                {todoList?.map(data => {
                    const {id, title, completed} = data;
                    return (
                        <div key={id} className="todo-list">
                            <div className="list-style">
                                <input
                                    type="checkbox"
                                    defaultchecked={completed}
                                    onChange={() => handleCompleteChange(id)}
                                />
                                <span className={completed === true ? 'list-title done-todo' : 'list-title'}>
                                    {title}
                                </span>
                            </div>
                            <button className="btn-style" onClick={() => removeList(id)}>
                                x
                            </button>
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
