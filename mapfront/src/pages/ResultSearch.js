import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router';
import axios from 'axios';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import ReactDOM from "react-dom";
import getLocation from '../getLocation';
import plus from "../images/plus.png";
import minus from "../images/minus.png"
import target from "../images/location.png"
import ph from "../images/placeholder.png"

import mylocation from "../images/mylocation.png"

function ResultSearch() {
    const [keyword, setKeyword] = useState();  //검색 받은 키워드
    const [plusbutton, setPlusButton] = useState();
    const [minusbutton, setMinusButton] = useState();
    const [locationbutton, setLocationButton] = useState();
    const [plength, setPlength] = useState();
    const [markerlat, setMarkerLat] = useState([]);
    const [markerlng, setMarkerLng] = useState([]);
    const [markerlist, setMarkerList] = useState([]);
    const [choosemarker, setChooseMarker] = useState();

    const [buildingList, setBuildingList] = useState([]);
    const marker = useLocation();
    console.log(marker.state.keyword);  //test
 
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    const handlePlusButton = () => {
      setPlusButton(true);
    };
    const handleMinusButton = () => {
      setMinusButton(true);
    };
    const handleLocationButton = () => {
      setLocationButton(true);
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
    
    function setScreenSize(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
     
  useEffect(() => {
    var zoomin;
    var zoomout;
    var movelocation;
    var test;

    if(buildingList[0] && !plength){
      for(var i = 0; i < buildingList.length; i++){
        markerlat.push(buildingList[i].latitude);
        markerlng.push(buildingList[i].longitude);     
        setMarkerLat(markerlat => [...markerlat]);
        setMarkerLng(markerlng => [...markerlng]);
      }
      setPlength(buildingList.length);
      console.log(buildingList);
    }

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

    console.log('choosemarker: '+choosemarker);
    console.log('test out: ' + test);

    const script = document.createElement("script");
    script.innerHTML = `
        // var test1 = 4; 
        // ${test = 'test1'};
        // console.log(${test});
        var locationmap;
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

        
        function searchmarker(){  //검색 결과 지도 마커 생성 함수
          var marker;
          var markers = [];
          var arrlat = new Array(${markerlat});
          var arrlng = new Array(${markerlng});
          for(var i = 0; i < ${plength}; i++){
            marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(arrlat[i], arrlng[i]),       
              map: locationmap,
            })
            markers.push(marker);    //마커 배열에 저장
            markers[i].addListener("dragend", function(evt){
              var latlng = evt.latLng;
              console.log(marker.getPosition());
              console.log(latlng);
              for(var i = 0; i < markers.length; i++){
                console.log(i);
                var t = i;
                if(latlng === markers[i].getPosition()){
                  
                  ${test = `i`};
                  console.log('test: '+${test});
                  console.log(i); 
                }
              }
            })
            marker.addListener("touchstart", function(evt){
              console.log('test');
            })
          }
        }

        function createmarker(){  // 현재 위치 표시 마커 생성
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(${lat}, ${lng}),
            icon: "${mylocation}",
            map: locationmap
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
        
        if(!locationmap && ${lat} && ${plength}){     //지도생성, 마커생성
          var mylocation = {lat: ${lat}, lng: ${lng}};
          locationmap = initTmap(mylocation);
          createmarker();  
          searchmarker();
        }
        else{
          //searchmarker();
          console.log("Init false");
        }

        if(locationmap && ${zoomin}){
          locationmap.zoomIn();
        }
        if(locationmap && ${zoomout}){
          locationmap.zoomOut();
        }
        if(locationmap && ${movelocation}){
          var setmylocation = new Tmapv2.LatLng(${lat}, ${lng});
          locationmap.setCenter(setmylocation);
        }
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, [handleSuccess]);

  useEffect(()=>{
    console.log('setBuildingList');
    setBuildingList(marker.state.building);
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

    <NavBar keyword={marker.state.keyword}/>

    <div className="search">   
        <p id="result" />
        <p id="result_mouse" />
    </div>

    <div className="left">
      <div className="mylocation">
        <Button onClick={handleLocationButton} src={target}/>
      </div>
    </div>

    <div className="test">
      <div className="zoom">
        <Button onClick={handlePlusButton} src={plus}/>
        <Button onClick={handleMinusButton} src={minus}/>
      </div>
    </div>
    <div>

    </div>

    </main>
  );
}

export default ResultSearch;