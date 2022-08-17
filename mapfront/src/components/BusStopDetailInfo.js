import React from 'react';
import $ from 'jquery';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import {DraggableCore} from 'react-draggable';
import proj4 from 'proj4';
import axios from 'axios';
import BusInfo from '../components/BusInfo'


const BusStopDetailInfo = (props)=>{
    const [startXY, setStartXY] = useState();
    const [top, setTop] = useState();
    const [bottom, setBottom] = useState(13);

    const [bustop, setBustop] = useState();
    const [rbus, setRBus] = useState();
    const [dist, setDist] = useState();
    const [busnumlist, setBusNumList] = useState([]);
    const [isset, SetIsSet] = useState(false);
    const [disable, setDisable] = useState(false);

    var bustopinfobar, rbuslist; 

    const searchBusNum = (routeid) => {
        const busnum = axios.create({
            baseURL: 'http://localhost:9000/'
        })
        busnum.post('api/bus/route/detail/', null, {params: {routeId: routeid}})
        .then(function(res){
            console.log(res.data[0]);
            setBusNumList(busnumlist => [...busnumlist, res.data[0]]);
        }).catch(function(err){
            console.log("버스 routid로 정보 못받아옴");
        })
    }
    

    const ref = useRef(null);

    

    // useEffect(()=>{                 //클릭 이벤트 임시 나중에 pc에서 onClick 이벤트 되는지 안되는지 확인 먼저
    //     console.log(props);
    //     setTimeout(function(){
    //     let button1 = document.querySelector('#button1');
    //     if(button1){
    //         button1.addEventListener('click', function(){
    //             console.log("클릭");
    //     })
    //     }
    // }, 1000);
    // }, [])

    useEffect(()=>{
        var busarr = props.bustop;
        console.log(busarr);
        console.log("useEffect");
        if(busarr){
        busarr.map((obj, index) => {
            searchBusNum(obj.routeid);
        });
        SetIsSet(true);
        }
    }, [])

    useEffect(()=>{
        setBustop(props.obj);
        setRBus(props.bustop);
        
        setTimeout((bustopinfobar = document.getElementById('bustopinfobar')), 100);
        setTimeout(()=>{
            $('#rbuslist').on('touchstart', function(e){
                setDisable(true);
                console.log(e.changedTouches[0].clientX);
                console.log("먼가시작");
            });
            $('#rbuslist').on('touchmove', function(e){
                setDisable(true);
                console.log("먼가ing");
            });
            $('#rbuslist').on('touchend', function(e){
                setDisable(false);
                console.log("먼가끝");
            });
        }, 50);
        var height = -(bustopinfobar.offsetHeight*0.9);
        setTop(height);
    }, [])

    function touchstart(){
        console.log("터치요");
    }

    function touchmove(){
        console.log("터치중~");
    }

    function touchend(){
        console.log("터치끝");
    }

    ////////////// 현재 내 위치와 선택한 건물의 거리 계산 (버정 BESSELTM 좌표계라 변환하는거까지)
    useEffect(()=>{
        const besseltm = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
        const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees" 
        var lat1x = props.obj.posx;
        var lon1y = props.obj.posy;
        var pt = new proj4.Point(lat1x, lon1y);
        var test = proj4(besseltm, wgs84, pt);
        var lat1 = test.y;
        var lon1 = test.x;

        var lat2x = props.location.latitude;
        var lon2y = props.location.longitude;

        console.log(lat2x, lon2y);
        function deg2rad(deg){
            return deg * (Math.PI/180);
        }

        var r = 6371;
        var dLat = deg2rad(lat2x-lat1);
        var dLon = deg2rad(lon2y-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2x)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = r* c;
        
        console.log("km: "+d);
        setDist(Math.round(d*1000));
    
    }, [])
    //////////////

    const handleDragStart = (evt) => {          //드래그 시작 이벤트  
        setStartXY(evt);    
    }

    const handleDrag = (evt) => {   //드래그 중 이벤트           
        console.log("드래그중~");

    }

    const handleDragStop = (evt) => {                           //드래그 끝났을 때 이벤트
        var element = document.getElementById('bustopinfobar');
        var posy;
        posy = startXY.y - evt.y ;
        if(posy > 0){
            posy = evt.lastY;
            var height = (element.offsetHeight)*0.87 + evt.lastY;
            $('#bustopinfobar').stop(true).animate({bottom: posy}, 300);
            setTop(evt.lastY);
            setBottom(height);
            // setDisable(true);
        }
        else if(posy < 0){   
            var height = -(element.offsetHeight)*0.87 + evt.lastY;
            setTop(height);
            setBottom(evt.lastY + 13);
            $('#bustopinfobar').stop(true).animate({bottom: height}, 300);
            // setDisable(false);
        }

    }

    const test = (evt) => {            //출발, 도착 터치 이벤트
        console.log("클릭");
        
    }
 
    return(
        <Draggable ref={ref} onMouseDown={(e)=>{test(e)}} disabled={disable} onStart={(e, data) => handleDragStart(data)} onDrag={(e, data) => handleDrag(data)} onStop={(e, data) => handleDragStop(data)} axis='y' bounds={{top: top, bottom: bottom}}>
        <div id="bustopinfobar" style={{position: "fixed", backgroundColor: "white", width: "100%", height: "100%", bottom: "-87%", borderRadius: "7px", textAlign: "-webkit-center",
                boxShadow: "0px 2px 20px 2px #A6A6A6"}}>
            <div style={{position: "relative", backgroundColor: "#D5D5D5", width: "50%", height: "0.6%",  marginTop: "6px"
                        , borderRadius: "6px", }}>
            </div>
                {bustop &&
                    <div style={{position: "relative", height: "100%"}}>
                        <div style={{position: "fixed", width:"100%", height: "12%"}}>
                            <div style={{fontSize: "1.2rem", float: "left", padding: "9px"}}>
                                {bustop.bstopnm} <br></br>
                                <div style={{fontSize: "1.0rem", float: "left", paddingLeft: "2px"}}>{dist}m</div>
                            </div>
                            <div className="" style={{position: "relative", width: "170px", float: "right", right: "0px", marginTop: "13%"}}>
                                <button id="button1" onTouchEnd={test} type="button" class="btn btn-outline-primary btn-sm col-5" style={{borderRadius: "20px", height: "35px", marginLeft: "8px"}}>출발</button>
                                <button id="button2" onTouchEnd={test} type="button" class="btn btn-primary btn-sm col-5" style={{borderRadius: "20px", height: "35px", marginLeft: "8px"}}>도착</button>
                            </div>
                        </div>
                        <div id="rbuslist" onTouchStart={touchstart} onTouchMove={touchmove} onTouchEnd={touchend} style={{position: "fixed", overflowY: "scroll", width: "100%", height: "87%", bottom: "0px", boxShadow: "0px 1px 1px 1px gray", zIndex: "6"}}>
                            <ol className="list-group" >
                            {rbus && isset && rbus.map((obj, index)=>{
                                var test = busnumlist[index];
                                if(test){
                                    let time = parseInt(obj.arrivalestimatetime/60);
                                return(
                                    <div>
                                    <BusInfo obj={test}></BusInfo>
                                    <div style={{float: "left", textAlign: "-webkit-left" ,width: "100%", paddingLeft: "5%", boxShadow: "inset 0px 0px 1px 0.1px gray"}}>
                                        남은시간: {time}분
                                    </div>
                                    </div>
                                );}})}
                            </ol>
                        </div>     
                    </div>
                }
        </div>
        </Draggable>
    );
}

export default BusStopDetailInfo;
