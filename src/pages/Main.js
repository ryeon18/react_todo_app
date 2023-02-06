import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Lists from '../components/Lists';
import Form from '../components/Form';
import Popup from '../components/Popup';

const Main = () => {
  const [isPopup, setIsPopup] = useState(true); // 팝업창
  const [todoList, setTodoList] = useState([]); // 할일목록
  const [addTitle, setTitle] = useState(''); // 할일 제목
  const progressNum = 50;
  // 쿠키존재확인 후 없으면 쿠키생성
  useEffect(() => {
    const popUpStatus = document.cookie.split('popup=')[1]?.split(' ')[0].replace(';', '');

    if (popUpStatus === undefined) {
      document.cookie = `popup=false; path=/`;
      setIsPopup(true);
    } else if (popUpStatus === 'true') {
      setIsPopup(false);
    } else if (popUpStatus === 'false') {
      setIsPopup(true);
    }
  }, []);

  useEffect(() => {
    Aos.init();
  });

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

  // 리스트 지우기
  const removeList = useCallback(
    id => {
      let newTodoData = todoList.filter(data => data.id !== id);
      setTodoList(newTodoData);
    },
    [todoList]
  );

  // 할일리스트 체크박스
  const handleCompleteChange = useCallback(
    id => {
      let newTodoList = todoList.map(data => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });

      setTodoList(newTodoList);
    },
    [todoList]
  );

  // 할일모두지우기
  const handleDeleteAll = () => {
    setTodoList([]);
  };

  return (
    <>
      <section className="h-[500px] w-screen flex flex-col items-center">
        <div className="flex flex-col justify-between items-center w-full max-w-[500px] min-w-[320px] mx-auto">
          {/* {isPopup && <div className="w-full h-screen fixed"></div>} */}
          <div className="w-full p-5 bg-white rounded text-center">
            <div>
              <div className="pb-5">
                <h1 className="text-3xl text-red-600 font-bold drop-shadow-lg">CHECK LIST</h1>
              </div>
              <div>
                <button id="kakao-shared-btn" onClick={() => kakaoSharedEvent()}>
                  카카오톡 공유
                </button>
              </div>
              <div>
                <Link to="/threeTest">ThreeTest</Link>
              </div>
              <div className="text-right">
                <button className="bg-slate-300 p-2 rounded-2xl" onClick={() => handleDeleteAll()}>
                  Delete All
                </button>
              </div>
              <Form handleSubmit={handleSubmit} addTitle={addTitle} handleTitle={handleTitle} />
            </div>
          </div>
        </div>
        <Lists
          todoList={todoList}
          setTodoList={setTodoList}
          removeList={removeList}
          handleCompleteChange={handleCompleteChange}
        />
        <article
          data-aos="fade" // 사용할 애니메이션
          data-aos-easing="ease-in-expo" // 애니메이션 시간흐름에 따른 속도설정 옵션 (default:ease)  빠름->느림, 느림->빠름
          data-aos-anchor="" // 특정한 객체에 anchor를 설정하여, 그 객체 기준으로 애니메이션 시작되는지 설정
          data-aos-delay="0" // 애니메이션 재생 대기시간 (애니메이션 등장 늦추는 속성) (default:0)
          data-aos-anchor-placement="top-bottom" // 애니메이션 시작 위치 속성 (default:top-bottom)
          data-aos-offset="200" // 나타나는 시점 조정
          data-aos-duration="3000" // 모션의 속도 최대 3000 (default:400)
          data-aos-once="true" // false로 하면 애니메이션 다시 재생
        >
          <h1>애니메이션</h1>
          <p>효과주기~</p>
        </article>
        <ul className="list">
          <li className="color1">1</li>
          <li className="color2">2</li>
          <li className="color3">3</li>
          <li className="color4">4</li>
          <li className="color5">5</li>
          <li className="color6">6</li>
          <li className="color7">7</li>
        </ul>
      </section>
      {/* {isPopup && <Popup isPopup={isPopup} todayClose={todayClose} close={close} />} */}
    </>
  );
};

export default Main;
