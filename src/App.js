import React, {useState, useEffect} from 'react';
// import './App.scss';
import List from './components/List';
import Form from './components/Form';
import Popup from './components/Popup';

const App = () => {
    const [isPopup, setIsPopup] = useState(''); // 팝업창
    const [todoList, setTodoList] = useState([]); // 할일목록
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

    useEffect(() => {
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init(process.env.REACT_APP_KAKAO_KEY);
            }
        }
    }, []);

    const kakaoSharedEvent = () => {
        const {Kakao} = window;
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: `공유하기 테스트`,
                description: `공유하기 description`,
                imageUrl: '/',
                imageWidth: 80,
                link: {mobileWebUrl: '/', webUrl: '/'},
            },
            buttons: [{title: '웹으로 보기', link: {mobileWebUrl: '/', webUrl: '/'}}],
            installTalk: true,
        });
    };

    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center">
                <div className="flex flex-col justify-between items-center w-full max-w-[500px] min-w-[320px] mx-auto">
                    <div className="w-full p-5 bg-white rounded text-center">
                        <div>
                            <div className="pb-5">
                                <h1 className="text-3xl text-red-600 font-bold drop-shadow-lg">CHECK LIST</h1>
                            </div>
                            <button id="kakao-shared-btn" onClick={() => kakaoSharedEvent()}>
                                카카오톡 공유
                            </button>
                            <Form handleSubmit={handleSubmit} addTitle={addTitle} handleTitle={handleTitle} />
                        </div>
                    </div>
                </div>
                <List
                    todoList={todoList}
                    setTodoList={setTodoList}
                    handleCompleteChange={handleCompleteChange}
                    removeList={removeList}
                />
            </div>
            {isPopup && <Popup isPopup={isPopup} todayClose={todayClose} close={close} />}
        </>
    );
};

export default App;
