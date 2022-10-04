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

import charging from "../images/charging_station_icon.png"
import elevator from "../images/elevator.png";

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

        var wheelmarkers;
        var elevatormks;

        var latlon;

        if(!latlon){
          latlon = [{lat: 37.44738908, lon: 126.7306811}, {lat: 37.44765055, lon: 126.7124925}, {lat: 37.45611315, lon: 126.7133538}, {lat: 37.46398002, lon: 126.710947}, {lat: 37.46611111, lon: 126.714686}, {lat: 37.467324, lon: 126.699152},
                    {lat: 37.4613873, lon: 126.7311568}, {lat: 37.43588036, lon: 126.7473614}, {lat: 37.42791756, lon: 126.7507057}, {lat: 37.43010131, lon: 126.7159454}, {lat: 37.40422829, lon: 126.7163979}, {lat: 37.39776762, lon: 126.7263901},
                    {lat: 37.44789883, lon: 126.7370578}, {lat: 37.39176155, lon: 126.7217373}, {lat: 37.42468926, lon: 126.7533209}, {lat: 37.45514557, lon: 126.701585}, {lat: 37.44854249, lon: 126.7530631}, {lat: 37.45587968, lon: 126.7195142},
                    {lat: 37.4574194, lon: 126.7023421}, {lat: 37.45688086, lon: 126.7013016}, {lat: 37.46964954, lon: 126.7081713}, {lat: 37.44944591, lon: 126.7011633}, {lat: 37.45678003, lon: 126.7104966}, {lat: 37.45521033, lon: 126.7315437},
                    {lat: 37.44817192, lon: 126.7366364}, {lat: 37.43963366, lon: 126.7598083}, 
                    {lat: 37.53264131, lon: 126.6441471}, {lat: 37.52641513, lon: 126.6705158}, {lat: 37.56441872, lon: 126.673601}, {lat: 37.54899846, lon: 126.6782282}, {lat: 37.53265854, lon: 126.6537394}, {lat: 37.52509167, lon: 126.6801348}, 
                    {lat: 37.51554696, lon: 126.6778363}, {lat: 37.51460915, lon: 126.6722848}, {lat: 37.51118138, lon: 126.6747559}, {lat: 37.50250466, lon: 126.6746007}, {lat: 37.50820266, lon: 126.6782976}, {lat: 37.49434393, lon: 126.672588},
                    {lat: 37.49085455, lon: 126.6848496}, {lat: 37.49250983, lon: 126.6800417}, {lat: 37.48748624, lon: 126.683403}, {lat: 37.60508357, lon: 126.6618003}, {lat: 37.59507709, lon: 126.7017045}, {lat: 37.59210015, lon: 126.6746255}, 
                    {lat: 37.59496672, lon: 126.6279671}, {lat: 37.59439292, lon: 126.6405824}, {lat: 37.60167498, lon: 126.6564585}, {lat: 37.5977252, lon: 126.667137}, {lat: 37.59293488, lon: 126.6731833}, {lat: 37.58496948, lon: 126.6759831}, 
                    {lat: 37.56876146, lon: 126.6754722}, {lat: 37.56122795, lon: 126.6775452}, {lat: 37.55133706, lon: 126.6770966}, {lat: 37.54395416, lon: 126.6768454}, {lat: 37.52470809, lon: 126.6752851}, {lat: 37.51757789, lon: 126.6768399563},
                    {lat: 37.5070671, lon: 126.6762537}, {lat: 37.50025173, lon: 126.6758537}, {lat: 37.49007763, lon: 126.6752728}, {lat: 37.48412624, lon: 126.6838511}, {lat: 37.47416837, lon: 126.6814437},
                    {lat: 37.537442, lon: 126.737759}, {lat: 37.532424, lon: 126.7121}, {lat: 37.525051, lon: 126.709819}, {lat: 37.539606, lon: 126.72135}, {lat: 37.54421, lon: 126.72814}, {lat: 37.537759, lon: 126.728978}, 
                    {lat: 37.530757, lon: 126.729686}, {lat: 37.532912, lon: 126.723909}, {lat: 37.528104, lon: 126.73642}, {lat: 37.548144, lon: 126.741451}, {lat: 37.561578, lon: 126.754899}, {lat: 37.545278, lon: 126.717463}, 
                    {lat: 37.571645, lon: 126.736023}, {lat: 37.566414, lon: 126.742647}, {lat: 37.553578, lon: 126.744932}, {lat: 37.545062, lon: 126.738621}, {lat: 37.534507, lon: 126.741707}, {lat: 37.57709, lon: 126.733483}, 
                    {lat: 37.547444, lon: 126.727095}, {lat: 37.543628, lon: 126.715609}, {lat: 37.550132, lon: 126.741986}, {lat: 37.526032, lon: 126.750287}, {lat: 37.529235, lon: 126.715001}, {lat: 37.543227, lon: 126.728081}, 
                    {lat: 37.538084, lon: 126.722601}, {lat: 37.530313, lon: 126.72257},
                    {lat: 37.47408104, lon: 126.6213401}, {lat: 37.49416117, lon: 126.5314849}, {lat: 37.49332988, lon: 126.4883439}, {lat: 37.45278277, lon: 126.6282058}, {lat: 37.47444945, lon: 126.6272621},
                    {lat: 37.455946717, lon: 126.705586062}, {lat: 37.456085358, lon: 126.706082821}];
        }
        
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
            map.addListener("zoom_changed", onZoomChanged);
            
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
          var marker;
          if(marker){
            marker.setMap(null);
          }
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(${lat}, ${lng}),
            icon: "${mylocation}",
            iconSize: new Tmapv2.Size(40, 40),
            map: locationmap
          })
        }

        function onClick(e) {
            var result_mouse = e.latLng
            var resultDiv = document.getElementById("result_mouse");
            // resultDiv.innerHTML = result_mouse;
            console.log(result_mouse._lat);     
        }

        function onTouchstart(e) {
            var result = e.latLng
            var resultDiv = document.getElementById("result");
            // resultDiv.innerHTML = result;       
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

        function onZoomChanged(e) {
          if(elevatormks){
            console.log(locationmap.getZoom());
            if(locationmap.getZoom()>15){
              for(var i = 0; i < elevatormks.length; i++){
                elevatormks[i].setMap(locationmap);
              }
            }else{
              for(var i = 0; i < elevatormks.length; i++){
                elevatormks[i].setMap(null);
              }
            }
          }
        }

        if(!locationmap && ${lat} && ${plength}){     //지도생성, 마커생성
          var mylocation = {lat: ${lat}, lng: ${lng}};
          locationmap = initTmap(mylocation);
          searchmarker();
        }
        else{
          //searchmarker();
          console.log("Init false");
        }
        
        var mymarker;
        if(mymarker){
          mymarker.setMap(null);
        }
        loc = new Tmapv2.LatLng(${lat}, ${lng});
        mymarker = new Tmapv2.Marker({
          position: loc,
          icon: "${mylocation}",
          iconSize : new Tmapv2.Size(40, 40),
          map: locationmap
        }) 

      //////////////////////////////////////////////////////////////////////////////////////////////
      var wheelmarker;
      if(locationmap && !wheelmarkers && latlon){
        for(var i = 0; i < 26; i++){
          wheelmarker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(latlon[i].lat, latlon[i].lon),
            icon: "${charging}",
            iconSize: new Tmapv2.Size(15, 15),
            map: locationmap
          });
        }
      }

      if(locationmap && !elevatormks){        //엘레베이터 받아옴
        $.ajax({
          method: "POST",
          url: "http://localhost:9000/api/find/incheonElevator",
          async: false,
          data: {

          },
          success: function(res){
            console.log(res);

            elevatormks = [];
            for(var i = 0; i < res.length; i++){
              var lat = res[i].latitude;
              var lng = res[i].longitude;

              var markerevt = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(lat, lng),
                icon: "${elevator}",
                iconSize: new Tmapv2.Size(15, 15),
                // map: locationmap
              });
              elevatormks.push(markerevt);
            }
          },
          error: function(err){
            console.log("엘리베이터 못받아옴");
          }
        })
        
      }

      //////////////////////////////////////////////////////////////////////////////////////////////

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
  }, [handleSuccess, location]);

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

    <div className="left" style={{zIndex: "3"}}>
      <div className="mylocation">
        {/* <Button onClick={handleLocationButton} src={target}/> */}
        <button className="targetbutton" onClick={handleLocationButton} style={{backgroundColor: "white", borderRadius: "7px", border:"none", height: "45px"}}><img src={mytarget} style={{width: "120%", height: "87%", left: "-3px"}}></img></button>
      </div>
    </div>

    <div className="rightbarbutton" style={{zIndex: "3"}}>
      <div className="zoom">
        {/* <Button onClick={handlePlusButton} src={plus}/>
        <Button onClick={handleMinusButton} src={minus}/> */}
                <button className="plusbutton" onClick={handlePlusButton} style={{backgroundColor: "#A6A6A6", border: "none", opacity: "0.8", borderRadius: "50px",  width: "42px", right: "-1px",}}><img src={plussign} style={{width: "80%", height: "70%"}}></img></button>
        <button className="minusbutton" onClick={handleMinusButton} style={{backgroundColor: "#A6A6A6", border: "none", opacity: "0.8",  borderRadius: "50px",  marginTop: "10px", width: "42px", right: "-1px",}}><img src={minussign} style={{width: "80%", height: "70%"}}></img></button>
      </div>
    </div>

    <div id="test" style={{position: "fixed", top: "0px", zIndex: "10", zIndex: "0"}}>
    </div>
    <div id="test1" style={{position: "fixed", top: "0px", zIndex: "10", zIndex: "0"}}>
    </div>
    <div className="Infobar" ref={outsideRef} style={{position: "fixed", top: "0px", zIndex: "10"}}>
      
      {choosemarker && <BuildingDetailInfo props={buildingList[choosemarker]} findway={null} whole={{props: {mylocation: location, name: buildingList[choosemarker].name, obj: buildingList[choosemarker]}}} subway={null} mylocation={location}/>}
      {/* <BuildingDetailInfo props={building.state}/> */}
    </div>
    </main>
  );
}

export default ResultSearch;