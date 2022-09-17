import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router';
import axios from 'axios';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import BuildingDetailInfo from "../components/BuildingDetailInfo";
import ReactDOM from "react-dom";
import getLocation from '../getLocation';
import plus from "../images/plus.png";
import plussign from "../images/plussign.png";
import minus from "../images/minus.png"
import minussign from "../images/minussign.png"
import target from "../images/location.png"
import mytarget from "../images/target.png"
import ph from "../images/placeholder.png"

import mylocation from "../images/mylocation.png"
import eletrue from "../images/placeholder_ee.png"
import elefalse from "../images/placeholder_ex.png"

import { render } from '@testing-library/react';

let what;

function ResultSearch() {
    const [keyword, setKeyword] = useState();  //검색 받은 키워드
    const [plusbutton, setPlusButton] = useState();
    const [minusbutton, setMinusButton] = useState();
    const [locationbutton, setLocationButton] = useState();
    const [plength, setPlength] = useState();
    const [markerlat, setMarkerLat] = useState([]);
    const [markerlng, setMarkerLng] = useState([]);
    const [iselevator, setIsElevator] = useState([]);
    const [markerlist, setMarkerList] = useState([]);
    const [choosemarker, setChooseMarker] = useState();
    const [middleLat, setMiddleLat] = useState();
    const [middleLng, setMiddleLng] = useState();
 
    const outsideRef = useRef(null);
    useOutsideClick(outsideRef);

    const [buildingList, setBuildingList] = useState([]);
    const [sid, setSid] = useState();
    const marker = useLocation();
    // console.log(marker.state.keyword);  //test
 
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

    /////////////////////////////////////////////////////////////////////// 

    useEffect(()=>{                                                 //div 변화 감지
      var element = document.getElementById('test');
      element.addEventListener("DOMSubtreeModified", function(){      
        if(element.innerText){
          var markerindex = parseInt(element.innerText);
          console.log(markerindex);
          if(markerindex == 0){
            console.log("0인데요!");
            setChooseMarker(0);
          }else{
            setChooseMarker(markerindex);
          }    
          if(buildingList[0]){
            console.log(buildingList);
          }
        }
        else{
          console.log("업거든!");
        }
      });
    }, [])

    ////////////////////////////////////////////////////////////////////////
    function useOutsideClick(ref){      //클릭이벤트
      useEffect(()=>{
        console.log(`useEffect()`);
    
        function handleClickOutside(event){
          setTimeout(function(){
          // console.log(ref);

          if(ref.current && !ref.current.contains(event.target)){
            const mytest = document.getElementById('test');
            what = mytest.innerText;
            const notmarker = parseInt(what);
            setChooseMarker(notmarker);
            console.log(`select의 외부 클릭을 감지!`);
            if(!what){
              setChooseMarker(null);
            }
            mytest.innerHTML="";
          }
          else{
            console.log("먼가 클릭함?");
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
    var test;
    var middlelat = 0, middlelng = 0;

    if(buildingList[3] && !plength){
      for(var i = 0; i < buildingList.length; i++){
        markerlat.push(buildingList[i].latitude);
        markerlng.push(buildingList[i].longitude);  
        middlelat = middlelat + buildingList[i].latitude;
        middlelng = middlelng + buildingList[i].longitude;   
        setMarkerLat(markerlat => [...markerlat]);
        setMarkerLng(markerlng => [...markerlng]);
        if(buildingList[i].elevatorState === '운행중'){
          iselevator.push(true);
        }else{
          iselevator.push(false);
        }
      }
      middlelat = middlelat / buildingList.length;
      middlelng = middlelng / buildingList.length;
      setMiddleLat(middlelat);
      setMiddleLng(middlelng);
      setPlength(buildingList.length);

      console.log(middlelat, middlelng);
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
    const script = document.createElement("script");
    script.innerHTML = `
        var locationmap;
        var zoomIn;
        
        function initTmap(pos) {
            var map = new Tmapv2.Map("TMapApp", {
                center: new Tmapv2.LatLng(${middleLat}, ${middleLng}),
                width: "100%",
                height: "100%",
                httpsMode: true,
                zoomControl: false,
                zoom:13
            });

            
            map.addListener("click", onClick); //웹에서 지도 클릭
            map.addListener("touchstart", onTouchstart); // 모바일에서 지도 터치
            map.addListener("touchend", onTouchend); // 모바일에서 지도 터치 end
            map.addListener("drag", onDrag); // 모바일에서 지도 드래그 ing
            
            //map.zoomIn();
            //map["zoomIn"]();
        
            return map;
        }

        function searchmarker(){  //검색 결과 지도 마커 생성 함수
          var marker;
          var markers = [];
          var arrlat = new Array(${markerlat});
          var arrlng = new Array(${markerlng});
          var elevator = new Array(${iselevator});
          var icon;
          for(var i = 0; i < ${plength}; i++){
            if(elevator[i] == true){
              icon = "${eletrue}";
            }else{
              icon = "${elefalse}";
            }
            marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(arrlat[i], arrlng[i]),   
              icon: icon,    
              iconSize: new Tmapv2.Size(50, 50),       
              map: locationmap,
            })
            markers.push(marker);    //마커 배열에 저장
            markers[i].addListener("dragend", function(evt){
              var latlng = evt.latLng;
              for(var i = 0; i < markers.length; i++){
                if(latlng === markers[i].getPosition()){          
                  ${test = `i`};
                  console.log('test: '+${test});
                  var element = document.getElementById('test');
                  element.innerHTML = '<p>'+${test}+'</p>';                       
                }
              }
            })
            markers[i].addListener("touchend", function(evt){
              var latlng = evt.latLng;
              for(var i = 0; i < markers.length; i++){
                if(latlng === markers[i].getPosition()){
                  ${test = `i`};
                  var element = document.getElementById('test');
                  element.innerHTML = ${test};
                }
              }
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

        function onTouchend(e) {
          var element = document.getElementById('test');
          var element1 = document.getElementById('test1');
          console.log(element1.innerText);
          if(element1.innerText == 'false'){
            element.innerHTML = 'x';     
          }else if(element1.innerText == 'true'){
            element1.innerHTML = 'false';
          }   
        }
        
        function onDrag(e) {
          var element = document.getElementById('test1');
          element.innerHTML = 'true';         
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

  useEffect(()=>{ //~방향인 애들 없애기
    console.log('setBuildingList');
    var tmp = (marker.state.building).filter(function(data){
      return !data.name.includes('방향');
    });
    console.log(tmp);
    setBuildingList(tmp);
    
    console.log(buildingList);
   }, []);

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

    <NavBar keyword={marker.state.keyword}/>

    <div className="search">   
        <p id="result" />
        <p id="result_mouse" />
    </div>

    <div className="left">
      <div className="mylocation">
        {/* <Button onClick={handleLocationButton} src={target}/> */}
        <button onClick={handleLocationButton} style={{backgroundColor: "white", borderRadius: "7px", height: "45px"}}><img src={mytarget} style={{width: "120%", height: "87%", left: "-2px"}}></img></button>
      </div>
    </div>

    <div className="rightbarbutton">
      <div className="zoom">
        {/* <Button onClick={handlePlusButton} src={plus}/>
        <Button onClick={handleMinusButton} src={minus}/> */}
        <button onClick={handlePlusButton} style={{backgroundColor: "white", borderRadius: "7px", width: "42px"}}><img src={plussign} style={{width: "100%", height: "80%"}}></img></button>
        <button onClick={handleMinusButton} style={{backgroundColor: "white", borderRadius: "7px", marginTop: "5px", width: "42px"}}><img src={minussign} style={{width: "100%", height: "80%"}}></img></button>
      </div>
    </div>

    <div id="test" style={{position: "fixed", top: "0px", zIndex: "10", zIndex: "0"}}>
    </div>
    <div id="test1" style={{position: "fixed", top: "0px", zIndex: "10", zIndex: "0"}}>
    </div>
    <div className="Infobar" ref={outsideRef} style={{position: "fixed", bottom: "0px"}}>
      
      {choosemarker && <BuildingDetailInfo props={buildingList[choosemarker]} findway={null} whole={{props: {mylocation: location, name: buildingList[choosemarker].name, obj: buildingList[choosemarker]}}} subway={null} mylocation={location}/>}
      {/* <BuildingDetailInfo props={building.state}/> */}
    </div>
    </main>
  );
}

export default ResultSearch;