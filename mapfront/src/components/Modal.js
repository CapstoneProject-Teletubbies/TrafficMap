import React from 'react';
import '../css/modal.css';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const handleSideButton = () => {

  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className="row" style={{height: "100%"}}>
            <div className="col-2" style={{alignSelf: "center"}}>
                <i class="bi bi-chevron-compact-left"></i>
            </div>
            <div className="col-8">
            <img src='/logo192.png'></img>
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