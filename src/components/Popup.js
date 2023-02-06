import React from 'react';

const Popup = ({isPopup, todayClose, close}) => {
  return (
    <article
      className={
        isPopup === true ? 'fixed flex justify-center items-center top-0 bottom-0 right-0 left-0 p-5' : 'hidden'
      }
    >
      <div className="w-full max-w-xs bg-orange-300 overflow-hidden rounded-lg p-5 shadow-xl">
        <p className="flex items-center justify-center pb-3">팝업</p>
        <div className="button-box">
          <button onClick={() => todayClose('popup', 'false', 1)} className="p-2">
            오늘 그만보기
          </button>
          <button onClick={() => close()} className="p-2">
            닫기
          </button>
        </div>
      </div>
    </article>
  );
};

export default Popup;
