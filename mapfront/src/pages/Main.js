import React, { useState, useEffect } from 'react';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import ReactDOM from "react-dom";
import getLocation from '../getLocation';

function Main() {
    function setScreenSize(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    //test
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    const handleSuccess = (pos) => {
      const {latitude, longitude } = pos.coords;

      setLocation({
        latitude, longitude
      })
      
      console.log(latitude, longitude);
    };
     
    useEffect(() => {
        if(location){
          let lat = location.latitude;
          let lng = location.longitude;
          console.log(location.latitude);
        }

    
    
    }, [handleSuccess])


    // const handleError= (error) -> {
    //   setError(error.message);
    // };


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess);
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



            return map;
            //test

            // map.zoomIn();
            // map["zoomIn"]();  //둘다 줌인 됨
            return map;
        }
 
        initTmap();


        function zoomin(){
            let zoomin = document.createElement("div");
            zoomin.id = "zoomIn";
        } 

        function onClick(e) {
            var result_mouse = e.latLng
            var resultDiv = document.getElementById("result_mouse");
            resultDiv.innerHTML = result_mouse;
            console.log(result_mouse._lat);
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