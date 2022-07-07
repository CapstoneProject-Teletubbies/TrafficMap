import React, { useEffect } from 'react';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import ReactDOM from "react-dom";
function Main() {

    function setScreenSize(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

  useEffect(() => {
    setScreenSize();
    const script = document.createElement("script");
    script.innerHTML = `
        var map;         
        function initTmap() {
            var map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
                width: "100%",
                height: "100%",
                zoom:15
            });
            map.addListener("click", onClick); //웹에서 지도 클릭
            map.addListener("touchstart", onTouchstart); // 모바일에서 지도 터치

            return map;
            //tesy

            var tmapGroundOverlay = new Tmapv2.GroundOverlay();
            tmapGroundOverlay.url = "/";
            // map.zoomIn();
            // map["zoomIn"]();  //둘다 줌인 됨
        }
        map = initTmap();

        function zoomin(){
            let zoomin = document.createElement("div");
            zoomin.id = "zoomIn";
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

    <div className="search">
        <SearchBar />
        <p id="result" />
        <p id="result_mouse" />
    </div>

    <div className="test">
      <div className="zoom">
        <Button />
      </div>
    </div>


    </main>
  );
}

export default Main;