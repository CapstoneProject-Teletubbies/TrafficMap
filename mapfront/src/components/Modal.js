import React from 'react';
import '../css/modal.css';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  const handleSideButton = () => {

  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <div>지하철 입체지도</div>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className="row" style={{height: "100%"}}>
            <div className="col-2" style={{alignSelf: "center"}}>
                <i class="bi bi-chevron-compact-left"></i>
            </div>
            <div className="col-8">
            <img src='지하철입체지도/인천1호선/간석오거리_5번 출입구 근처 엘리베이터_부평삼거리 방면.png'
             style={{width: "220px", height: "220px"}}></img>
            </div>
            
            <div className="col-2" style={{alignSelf: "center"}}>
                <i class="bi bi-chevron-compact-right"></i>
            </div>
          </div>
          {/* <div>
            <button className="close" onClick={close}>
              close
            </button>
          </div> */}
        </section>
      ) : null}
    </div>
  );
};


export default Modal;