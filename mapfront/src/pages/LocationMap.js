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
import charging from "../images/charging_station_icon.png"
import elevator from "../images/elevator.png";
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

    const handleRefreshButton = () => {
      console.log("새로고침");
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

        var wheelmarkers, elevatormks;
        
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
            map.addListener("zoom_changed", onZoomChanged);
    
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
            // resultDiv.innerHTML = result_mouse;
            console.log(result_mouse._lat);     
        }

        function onTouchstart(e) {
            var result = e.latLng
            var resultDiv = document.getElementById("result");
            // resultDiv.innerHTML = result;
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