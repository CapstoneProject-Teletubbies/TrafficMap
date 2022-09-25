import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import {MapInteractionCSS} from 'react-map-interaction';

import "swiper/swiper.min.css"
import '../css/modal.css';




const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, url, line } = props;

  console.log(props);
  console.log(Array.isArray(url));

  console.log((window.innerHeight)*0.35);
  var height = ((window.innerHeight)*0.35)*0.8;

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
    <div className={open ? 'openModal modal' : 'modal'} style={{width: "100%", height: "100%"}}>
      {open ? (
        <section>
          <header>
            <div style={{left: "15px"}}>지하철 입체지도</div>
            <button className="close" onClick={close} style={{top: "3px"}}>
              &times;
            </button>
          </header>
          <div style={{position: "relative", width: "100%", height: "80%"}}>
          {Array.isArray(url) && 
          <Swiper {...swiperParams} style={swiperStyle}>
            {url && url.map((obj, index)=>{
              console.log(line+obj+'.png');
              return(
                <SwiperSlide>
                  <MapInteractionCSS minScale="1" translationBounds={{xMin: 0, xMax: 0, yMin: 0, yMax: 0}}>
                  <img src={line+obj+'.png'}
                style={{width: "100%", height: "100%", objectFit: "contain"}}></img>
                </MapInteractionCSS>
                </SwiperSlide>
              );
            })}
          </Swiper>
          }
          {!Array.isArray(url) && url &&
          <div className="pr" style={{position: "relative", width: "100%", height: "100%", objectFit: "contain"}}>
            <MapInteractionCSS minScale="1" style={{position: "relative", width: "100%", height: "100%"}}>
              <div id="test" style={{position: "relative", width: "100%", height: height}}>
            <img src={url} style={{position: "relative", width: "100%", height: "100%", objectFit: "contain"}}></img>
            </div>
            </MapInteractionCSS>
          </div>}
          {!url && 
            <div style={{position: "relative", top: "40%"}}>
              내부 지도가 없습니다.
            </div>}
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