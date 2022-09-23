import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router';
import axios from 'axios';
import '../css/Main.css';
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import getLocation from '../getLocation';
import plus from "../images/plussign.png";
import minus from "../images/minussign.png"
import target from "../images/location.png"
import BuildingDetailInfo from "../components/BuildingDetailInfo"
import BusStopDetailInfo from '../components/BusStopDetailInfo';

import placeholderred from "../images/placeholderred.png"
import ping from "../images/ping.png"
import mylocation from "../images/mylocation.png"
import busstop from "../images/busstop.png"
import train from "../images/train.png"

import proj4 from 'proj4';

function LocationMap() {
    const [sid, setSid] = useState();
    const [keyword, setKeyword] = useState();  //검색 받은 키워드
    const [plusbutton, setPlusButton] = useState();
    const [minusbutton, setMinusButton] = useState();
    const [locationbutton, setLocationButton] = useState();
    const [icon, setIcon] = useState(ping);
    const [findWay, setFindWay] = useState();
    const [infoWindow, setInfoWindow] = useState(true);

    const building = useLocation();
    const navigate = useNavigate();


    console.log(building);
 
    const [location, setLocation] = useState();
    const [buildinglocation, setBuildingLocation] = useState();
    const [subway, SetSubway] = useState();
    const [error, setError] = useState();

    const [refresh, setRefresh] = useState(true);

    useEffect(()=>{
      if(building.state.subway){
        SetSubway(building.state.subway);
        setSid(1);
      }
    })

    useEffect(()=>{
      console.log(building);
      setRefresh(false);
    }, [building]);

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
      var buildinglatitude;
      var buildinglongitude
      if(building.state.props.address !== '버스정류장'){
        buildinglatitude = building.state.props.obj.latitude;
        buildinglongitude = building.state.props.obj.longitude;
        if(building.state.subway === null){
          setSid(0);
        }else{
          setIcon(train);
        }
      }
      else if(building.state.props.address === '버스정류장' && !building.state.id){
        setSid(2);
        setIcon(busstop);
        buildinglatitude = building.state.props.obj.posx;
        buildinglongitude = building.state.props.obj.posy;
      }else{
        const besseltm = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
        const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees" 
        var lat = building.state.props.obj.posx;
        var lng = building.state.props.obj.posy;
        var pt = new proj4.Point(lat, lng);
        var test = proj4(besseltm, wgs84, pt);

        buildinglatitude = test.y;
        buildinglongitude = test.x;
        console.log("길찾기 중인 버정");
        setSid(0);

      }
    
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

    const handlebackButton = () => {
      window.location.href = "/";
    }

  
    const handleKeyword = (e) => setKeyword(e.target.value);
    
    function setScreenSize(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
     
  useEffect(() => {
    var zoomin;
    var zoomout;
    var movelocation;

    var mrefresh = refresh;
    console.log(mrefresh);

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
          var wgs84;
          if(parseInt(pos.lat) > 1000){
            var epsg3857 = new Tmapv2.Point(pos.lat, pos.lng);
            console.log(epsg3857);
            wgs84 = Tmapv2.Projection.convertBesselTMToWGS84GEO(epsg3857);
            console.log("좌표변환실행");
            console.log(wgs84);
          }
          else{
            wgs84 = new Tmapv2.LatLng(pos.lat, pos.lng);
          }
            var map = new Tmapv2.Map("TMapApp", {
                center: wgs84,
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

        function createmarker(lat, lng, img, sizew, sizeh){
          var wgs84;
          if(parseInt(lat) > 1000){
            var epsg3857 = new Tmapv2.Point(lat, lng);
            console.log(epsg3857);
            wgs84 = Tmapv2.Projection.convertBesselTMToWGS84GEO(epsg3857);
            console.log("좌표변환실행");
            console.log(wgs84);
          }
          else{
            wgs84 = new Tmapv2.LatLng(lat, lng);
          }
          console.log(img);
          var marker = new Tmapv2.Marker({
            position: wgs84,
            icon: img,
            iconSize : new Tmapv2.Size(sizew, sizeh),
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
          // createmarker(${lat}, ${lng}, "${mylocation}", 40, 40);
          createmarker(${blat}, ${blng}, "${icon}", 32 , 48);  
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

  return (
    <main style={{overflow: "hidden"}}>
    <div
      id="TMapApp"
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        overflow: "hidden",
      }}
    >
    </div>

    <nav
      class="navbar navbar-default"
      style={{
        width: "100%",
        height: "10%",
        display: "flex",
        padding: "0px 10px",
        backgroundColor: "white",
        boxShadow: "0px 1px 20px 1px #A6A6A6",
      }}>
      <div className="row" style={{ textAlign: "center", width: "100%"}}>
        <div className="col-2" style={{ }}>
        <i
          class="bi bi-arrow-left-circle"
          style={{ fontSize: "2rem"}}
          onClick={handlebackButton}
        ></i>
        </div>
        <div className="col-10 align-self-center" style={{ right: "5%" }}>
        {building.state.props.name}
        </div>
      </div>

    </nav>


    <div className="left">
      <div className="mylocation">
        <Button onClick={handleLocationButton} src={target}/>
      </div>

    </div>

    <div className="rightbarbutton">
      <div className="zoom">
      <button className="plusbutton" onClick={handlePlusButton} style={{backgroundColor: "#A6A6A6", border: "none", opacity: "0.8", borderRadius: "50px",  width: "42px", right: "-1px",}}><img src={plus} style={{width: "80%", height: "70%"}}></img></button>
        <button className="minusbutton" onClick={handleMinusButton} style={{backgroundColor: "#A6A6A6", border: "none", opacity: "0.8",  borderRadius: "50px",  marginTop: "10px", width: "42px", right: "-1px",}}><img src={minus} style={{width: "80%", height: "70%"}}></img></button>
        {/* <SideBar /> */}
      </div>
    </div>
    {sid !== 2 && 
    <div className="Infobar" style={{position: "fixed", width: "100%", height: "10%", bottom: "0px" }}>
        <BuildingDetailInfo props={building.state.props.obj} subway={subway} findway={building.state.props.id} whole={building.state} mylocation={building.state.props.mylocation}/>
    </div>}
    {sid === 2 && <BusStopDetailInfo obj={building.state.props.obj} bustop={building.state.busstop} location={location} findway={building.state.props.id} whole={building.state} mylocation={building.state.props.mylocation}></BusStopDetailInfo>}

    </main>
  );
}

export default LocationMap;