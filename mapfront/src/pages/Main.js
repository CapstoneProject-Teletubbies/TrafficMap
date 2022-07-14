import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import ReactDOM from "react-dom";
import getLocation from '../getLocation';
import plus from "../images/plus.png";
import minus from "../images/minus.png"

import mylocation from "../images/mylocation.png"

function Main() {
    const [keyword, setKeyword] = useState();  //검색 받은 키워드
    const [plusbutton, setPlusButton] = useState();
    const [minusbutton, setMinusButton] = useState();
    const [init, setInit] = useState(true);
 
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    const handleInit = (isinit) => {
      setInit(isinit);
    };

    const handlePlusButton = () => {
      console.log("버튼 클릭");
      setPlusButton(true);
    };
    const handleMinusButton = () => {
      console.log("버튼 클릭");
      setMinusButton(true);
    };

    const handleSuccess = (pos) => {
      const {latitude, longitude } = pos.coords;

      setLocation({
        latitude, longitude
      })
    };

    // const handleError= (error) -> {
    //   setError(error.message);
    // };

    const handleKeyword = (e) => setKeyword(e.target.value);
    const handleSearch = () => {  //Axios
      const search = axios.create({
        baseURL: 'https://localhost:8000/'
      })
      search.post('/api/find/address', null, {keyword: keyword})
      .then(function (res){
        console.log(res.data)
      }).catch(function (err){
        alert(`에러쉬불!!!!!!!!`);
      })
      
    }

    function setScreenSize(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
     
  useEffect(() => {
    var zoomin;
    var zoomout;
    setScreenSize();
    navigator.geolocation.watchPosition(handleSuccess);
    if(location){
      var lat = location.latitude;
      var lng = location.longitude;
    }

    if(plusbutton === true){
      console.log("true임!~");
      zoomin = true;
      setPlusButton(false);
    }
    else{
      console.log("false인데?");
      zoomin = false;
    }
    if(minusbutton === true){
      zoomout = true;
      setMinusButton(false);
    }
    else{
      zoomout = false;
    }

    const script = document.createElement("script");
    script.innerHTML = ` 
        var testmap;
        var zoomIn;
        function initTmap(pos) {
            var map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(pos.lat, pos.lng),
                width: "100%",
                height: "100%",
                httpsMode: true,
                zoomControl: false,
                zoom:15
            });
            map.addListener("click", onClick); //웹에서 지도 클릭
            map.addListener("touchstart", onTouchstart); // 모바일에서 지도 터치


            console.log("init 실행");
    
            //map.zoomIn();
            //map["zoomIn"]();
        
            return map;
        }

        function createmarker(){
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(${lat}, ${lng}),
            icon: "${mylocation}",
            map: testmap
          })
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
        
        if(!testmap && ${lat}){
          var mylocation = {lat: ${lat}, lng: ${lng}};
          testmap = initTmap(mylocation);
          createmarker();  
        }
        else{
          console.log("Init false");
        }

        if(testmap && ${zoomin}){
          testmap.zoomIn();
        }
        if(testmap && ${zoomout}){
          testmap.zoomOut();
        }
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, [handleSuccess]);

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
        <SearchBar onChange={handleKeyword}/>
        <p id="result" />
        <p id="result_mouse" />
    </div>

    <div className="test">
      <div className="zoom">
        <Button onClick={handlePlusButton} src={plus}/>
        <Button onClick={handleMinusButton} src={minus}/>
      </div>
    </div>


    </main>
  );
}

export default Main;