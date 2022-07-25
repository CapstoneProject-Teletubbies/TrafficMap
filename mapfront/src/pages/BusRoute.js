import React, {useState, useEffect} from 'react';

import axios from "axios";

import Button from '../components/Button';
import BusRouteList from '../components/BusRouteList';
import '../css/BusRoute.css'

import {useLocation} from 'react-router';
import { queryByTitle } from '@testing-library/react';

function BusRoute(){
    const location = useLocation();
    const [busRoute, setBusRoute] = useState(); 
    const [busInfo, setBusInfo] = useState();
    const [reallocation, setRealLocation] = useState();

    useEffect(() => {
        setBusRoute(location.state.busroute);
        setBusInfo(location.state.props);
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
        buslocation.post('/api/bus/location', null, {params: {routeId: busInfo.ROUTEID}})
            .then(function(res){
            setRealLocation(res.data);
        }).catch(function(err){
            console.log('error');
        })
    }

    return(
        <main>
            <div className="busname">
                <button onClick={realtimeBus}>새로고침</button>
            </div>
            <div className="busdirection">

            </div>
            <div className="body">
                <div className="rightbar">
                    {reallocation && busInfo && busRoute && busRoute.map((obj, index)=>{
                        var isit;
                        var bus = undefined;
                        for(var i = 0; i < reallocation.length; i++){
                            if(reallocation[i].latest_STOP_ID === obj.BSTOPID && reallocation[i].dircd === obj.DIRCD){
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
            </div>
        </main>

    );

}


export default BusRoute;