import React from 'react';
import '../css/BuildingInfo.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseurl = 'http://localhost:9000/'


const BuildingInfo = (props) => {
    const navigate = useNavigate();
    const arrow = "<->";

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
        console.log(props.obj.routeid);
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

    return(
        <li className="list-group-item" onClick={searchBusRouteInfo} >
            <div className="ms-2" style={{ textAlign: "left" }}>
                <div className="fw-bold" style={{ textAlign: "left"}}>
                    {props.obj.routeno}
                </div>
                {props.obj.origin_BSTOPNM} {arrow} {props.obj.turn_BSTOPNM}
            </div>
        </li>
    );
}

export default BuildingInfo;