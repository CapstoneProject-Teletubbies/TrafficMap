import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import "swiper/swiper.min.css"
import '../css/modal.css';




const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, url, line } = props;

  console.log(props);

  SwiperCore.use([Navigation, Pagination]);

  const swiperParams = {
    navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',},
    slidesPerView: 1,
    scrollbar: {draggable: true},
  }

  const swiperStyle = {
    position: "relative",
    width: "100%",
    height: "100%"
  }

  const handleSideButton = () => {

  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <div>지하철 입체지도</div>
            <button className="close" onClick={close} >
              &times;
            </button>
          </header>
          <div style={{position: "relative", width: "100%", height: "80%"}}>
          <Swiper {...swiperParams} style={swiperStyle}>
            {url && url.map((obj, index)=>{
              console.log(line+obj+'.png');
              return(
                <SwiperSlide>
                  <img src={line+obj+'.png'}
                style={{width: "100%", height: "100%"}}></img>
                </SwiperSlide>
              );
            })}
                {/* <SwiperSlide>
                <img src='지하철입체지도/인천1호선/간석오거리_5번 출입구 근처 엘리베이터_부평삼거리 방면.png'
                style={{width: "100%", height: "100%"}}></img>
                </SwiperSlide>
                <SwiperSlide>
                <img src='지하철입체지도/인천1호선/간석오거리_5번 출입구 근처 엘리베이터_부평삼거리 방면.png'
                style={{width: "100%", height: "100%"}}></img>
                </SwiperSlide> */}
          </Swiper>
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