import React from 'react';

const UrlModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, connect } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'} style={{width: "100%", height: "100%"}}>
      {open ? (
        <section style={{height: "150px"}}>
          <header>
            <button onClick={close} style={{porision: "relative", top: "-6px", right: "3px"}}>
              &times;
            </button>
          </header>
          <div style={{position: "relative", height: "80%", width: "100%"}}>
            <div style={{top: "10%"}}>
                <text>대중교통 길찾기는 카카오맵 외부 url로 연결됩니다.</text>
            </div>
            <div style={{position: "absolute", bottom: "10px", width: "100%"}}>
                <button onClick={connect} style={{borderRadius: "3px"}}>연결</button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default UrlModal;