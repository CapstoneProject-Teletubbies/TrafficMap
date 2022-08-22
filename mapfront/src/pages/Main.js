import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import SideBar from "../components/SideBar";
import ReactDOM from "react-dom";
import getLocation from '../getLocation';
import plus from "../images/plus.png";
import minus from "../images/minus.png";
import target from "../images/location.png";
import nav from "../images/nav.png";

import mylocation from "../images/mylocation.png";

function Main() {
    const [keyword, setKeyword] = useState();  //검색 받은 키워드
    const [plusbutton, setPlusButton] = useState();
    const [minusbutton, setMinusButton] = useState();
    const [locationbutton, setLocationButton] = useState();
 
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();

    const outsideRef = useRef(null);
    useOutsideClick(outsideRef);

    const handlePlusButton = () => {    //확대버튼
      setPlusButton(true);
    };
    const handleMinusButton = () => {   //축소버튼
      setMinusButton(true); 
    };
    const handleLocationButton = () => {  //내위치이동 버튼
      setLocationButton(true);
    }
    const handleNavButton = () =>{      //길찾기 버튼
      console.log("길찾기 버튼 클릭");
      navigate('/find-way', {
        state: {
          mylocation: location,
        }
      });
    }

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

    function useOutsideClick(ref){      //클릭이벤트
      useEffect(()=>{
        console.log(`useEffect()`);
    
        function handleClickOutside(event){
          setTimeout(function(){
          // console.log(ref);
          
          if(ref.current && !ref.current.contains(event.target)){
            const mytest = document.getElementById('test');
            console.log(`select의 외부 클릭을 감지!`);
            console.log(mytest.innerText);
          }
        }, 100)
        }
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

    }

    
    function setScreenSize(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
     
  useEffect(() => {
    var zoomin;
    var zoomout;
    var movelocation;
    setScreenSize();
    navigator.geolocation.watchPosition(handleSuccess);
    if(location){
      var lat = location.latitude;
      var lng = location.longitude;
    }

    if(plusbutton === true){
      zoomin = true;
      setPlusButton(false);
    }
    else{
      zoomin = false;
    }
    if(minusbutton === true){
      zoomout = true;
      setMinusButton(false);
    }
    else{
      zoomout = false;
    }
    if(locationbutton === true){
      movelocation = true;
      setLocationButton(false);
    }
    else{
      movelocation = false;
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
        if(testmap && ${movelocation}){
          var setmylocation = new Tmapv2.LatLng(${lat}, ${lng});
          testmap.setCenter(setmylocation);
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
        overflowY: "hidden",
        height: "100%",
        width: "100%",
        position: "fixed",
      }}
    >
    </div>

    <div className="search">
        <SearchBar onChange={handleKeyword} placeholder={'장소, 버스, 지하철, 주소 검색'} location={location} src={'/search'}/>
        <Button onClick={handleNavButton} src={nav}></Button>
    </div>
    <div id="test">
        <p id="result" />
        <p id="result_mouse" />
    </div>

    <div className="left">
      <div className="mylocation">
        <Button onClick={handleLocationButton} src={target}/>
      </div>

    </div>

    <div className="rightbarbutton">
      <div className="zoom">
        <Button onClick={handlePlusButton} src={plus}/>
        <Button onClick={handleMinusButton} src={minus}/>
        {/* <SideBar /> */}
      </div>
    </div>
    <div className="Infobar" ref={outsideRef}>
      
    </div>

    </main>
  );
}

export default Main;