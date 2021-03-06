import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router';
import axios from 'axios';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import SideBar from "../components/SideBar"
import Building from '../components/Building';
import ReactDOM from "react-dom";
import getLocation from '../getLocation';
import plus from "../images/plus.png";
import minus from "../images/minus.png"
import target from "../images/location.png"
import BuildingInfo from "../components/BuildingInfo"

import mylocation from "../images/placeholderred.png"

function LocationMap() {
    const [keyword, setKeyword] = useState();  //검색 받은 키워드
    const [plusbutton, setPlusButton] = useState();
    const [minusbutton, setMinusButton] = useState();
    const [locationbutton, setLocationButton] = useState();
    const [newwindow, setNewWindow] = useState();

    const building = useLocation();
    const navigate = useNavigate();
 
    const [location, setLocation] = useState();
    const [buildinglocation, setBuildingLocation] = useState();
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

    const reload = () =>{
      navigate.push(building.pathname);
    }

    const handleSuccess = (pos) => {
      var buildinglatitude = building.state.props.obj.latitude;
      var buildinglongitude = building.state.props.obj.longitude;
      const {latitude, longitude } = pos.coords;
      setLocation({
        latitude, longitude
      })
      setBuildingLocation({
        buildinglatitude, buildinglongitude
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
    setScreenSize();
    if(building){
      navigator.geolocation.watchPosition(handleSuccess);
    }
    if(location){
      var lat = location.latitude;
      var lng = location.longitude;
    }
    if(buildinglocation){
      var blat = buildinglocation.buildinglatitude;
      var blng = buildinglocation.buildinglongitude;
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
                center: new Tmapv2.LatLng(pos.lat, pos.lng),
                width: "100%",
                height: "100%",
                httpsMode: true,
                zoomControl: false,
                zoom:18
            });
            map.addListener("click", onClick); //웹에서 지도 클릭
            map.addListener("touchstart", onTouchstart); // 모바일에서 지도 터치
    
            //map.zoomIn();
            //map["zoomIn"]();
        
            return map;
        }

        function createmarker(lat, lng){
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(lat, lng),
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
        
        if(!locationmap && ${lat} && ${blat}){
          var mylocation = {lat: ${blat}, lng: ${blng}};
          locationmap = initTmap(mylocation);
          createmarker(${blat}, ${blng});  
        }
        else{
          console.log(locationmap);
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
        <SearchBar onChange={handleKeyword} placeholder={'장소, 버스, 지하철, 주소 검색'}/>
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
        {/* <SideBar /> */}
      </div>
    </div>
    <div className="Infobar">
      
    </div>

    </main>
  );
}

export default LocationMap;