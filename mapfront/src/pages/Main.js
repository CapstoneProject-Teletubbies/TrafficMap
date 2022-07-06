import React, { useEffect } from 'react';
import Input from "../components/Input";
import '../css/Main.css';
import Search from "../components/Search";
import ReactDOM from "react-dom";
import { BrowserView, MobilView } from 'react-device-detect';

function Main() {

    function setScreenSize(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

  useEffect(() => {
    setScreenSize();
    const script = document.createElement("script");
    script.innerHTML = `         
        function initTmap() {
            var map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
                width: "100%",
                height: "100%",
                zoom:15
            });
            map.addListener("click", onClick); //웹에서 지도 클릭
            map.addListener("touchstart", onTouchstart); // 모바일에서 지도 터치
        }
    
        
        function onClick(e) {
            var result_mouse = e.latLng
            var resultDiv = document.getElementById("result_mouse");
            resultDiv.innerHTML = result_mouse;
        }

        function onTouchstart(e) {
            var result = e.latLng
            var resultDiv = document.getElementById("result");
            resultDiv.innerHTML = result;
        }
        
        function add() {
            map.setOptions({zoomControl:true}); // 지도 옵션 줌컨트롤 표출 활성화
        }
        
        initTmap();
        add();
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  return (
    <main>
    <div
      id="TMapApp"
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
      }}
    >
    </div>

    <div class="search">
        <Search />
        <p id="result" />
        <p id="result_mouse" />
    </div>
    </main>
  );
}

export default Main;