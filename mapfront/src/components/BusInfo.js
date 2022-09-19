import React, { useEffect } from 'react';
import '../css/BuildingInfo.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";

const baseurl = 'http://localhost:9000/'


const BuildingInfo = (props) => {
    const navigate = useNavigate();
    const arrow = "<->";
    const [color, setColor] = useState();   //버스 분류 색깔

    useEffect(()=>{
        var id = props.obj.routetpcd;
        switch (id) {
            case 1: setColor('#009300'); break;       //지선
            case 2: setColor('#0054FF'); break;        //간선
            case 4: setColor('#DB0000'); break;         //광역
            case 6: setColor('#87CE00'); break;   //마을버스
            case 7: setColor('#FFE400'); break;      //순환
        }
    }, [])

    const searchBusRoute = (detail) => {
        const busroute = axios.create({
         baseURL: baseurl
        })
        busroute.post('/api/bus/route', null, {params: {routeId: props.obj.routeid}})
        .then(function(res){
         console.log(res.data);
         navigate('/bus-route', {
            state:{
                busroute: res.data,
                busrouteinfo: detail,
                props: props.obj,
            }
         })
        }).catch(function(err){
         console.log('버스 노선 못받아옴');
        })
     }

     const searchBusRouteInfo = () => {
        console.log(props);
        const busrouteinfo = axios.create({
            baseURL: baseurl
        })
        busrouteinfo.post('/api/bus/route/detail', null, {params: {routeId: props.obj.routeid}})
        .then(function(res){
            searchBusRoute(res.data);
            console.log(res.data);
        }).catch(function(err){
            console.log("버스 노선 정보 못받아옴");
        })
     }

     console.log(props);

    return(
        <li className="list-group-item" onClick={searchBusRouteInfo} >
            <div className="ms-2" style={{ textAlign: "left" }}>
                <div className="fw-bold" style={{ textAlign: "left", color: color}}>
                    {props.obj.routeno}
                </div>
                {props.obj.origin_BSTOPNM} {arrow} {props.obj.turn_BSTOPNM}
                {props.time && <div style={{color: "red", textAlign: "left"}}>남은 시간: {props.time}분 {props.lowTP && <text style={{color: "blue"}}>{props.lowTP}</text>}</div>}
            </div>
        </li>
    );
}

export default BuildingInfo;