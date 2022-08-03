import React, {useState, useEffect} from 'react';

import axios from "axios";

import Button from '../components/Button';
import BusRouteList from '../components/BusRouteList';
import '../css/BusRoute.css'

import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";
import refresh from "../images/refresh.png"

function BusRoute(){
    const location = useLocation();
    const [busRoute, setBusRoute] = useState(); 
    const [busInfo, setBusInfo] = useState();
    const [reallocation, setRealLocation] = useState();
    const [isitbus, setIsItBus] = useState();

    const navigate = useNavigate();

    const handlebackButton = () => {
        navigate(-1);
    }

    useEffect(() => {                               //받아온 버스 정보 버스 노선 정보, 버스 실시간 위치 정보
        setBusRoute(location.state.busroute);
        setBusInfo(location.state.props);
        console.log(busInfo);
    })

    useEffect(()=>{             
        if(busInfo){
            realtimeBus();
        }
    }, [busInfo]);

    const realtimeBus = () => {
        const buslocation = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        buslocation.post('/api/bus/location', null, {params: {routeId: busInfo.routeid}})
            .then(function(res){
            if(res){
                setRealLocation(res.data);
                setIsItBus(true);
            }
            else{
                setIsItBus(false);
            }

        }).catch(function(err){
            console.log('error');
        })
    }

    if(busInfo && busRoute){

    return(
        <main>
            <div className="busname">
                <i
                        class="bi bi-arrow-left-circle"
                        style={{ fontSize: "2rem" }}
                        onClick={handlebackButton}
                    ></i>
                <h2>{busInfo.routeno}</h2>
            </div>
            <div className="busdirection">
                <h5>{busInfo.origin_BSTOPNM}</h5>
            </div>
            <div className="body">
                <div className="list-group">
                    {isitbus && busInfo && busRoute && busRoute.map((obj, index)=>{
                        var isit;
                        var bus = undefined;
                        for(var i = 0; i < reallocation.length; i++){
                            if(reallocation[i].latest_STOP_ID === obj.bstopid && reallocation[i].dircd === obj.dircd){
                                isit = true;  
                                bus = i;
                                break;
                            }
                            else{
                                isit = false;
                            }     
                        }
                        return(
                            <BusRouteList businfo={reallocation[bus]} isit={isit} bstopnm={obj.bstopnm} sbstopid={obj.short_BSTOPID}></BusRouteList>
                        )
                    })}

                    
                </div>
                <div className="reload-bus">
                    <button type="button" class="btn btn-large btn-primary" style={{ width: "50px", height: "50px", textAlign: "center", }} onClick={realtimeBus}><i class="bi bi-arrow-repeat" style={{ fontSize: "40px", verticalAlign: "middle" }}></i></button>
                </div>
            </div>
        </main>

    );
                }

}


export default BusRoute;