import React from 'react';

const Popup = ({isPopup, todayClose, close}) => {
    return (
        <div className={isPopup === 'true' ? 'hidden fixed top-1/4 left-1/3 ' : 'hidden'}>
            <p>팝업</p>
            <div className="button-box">
                <button onClick={() => todayClose('popup', 'false', 1)}>오늘 그만보기</button>
                <button onClick={() => close()}>닫기</button>
            </div>
        </div>
    );
};

export default Popup;
