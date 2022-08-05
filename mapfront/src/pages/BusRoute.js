import React, {useState, useEffect} from 'react';

import axios from "axios";

import Button from '../components/Button';
import BusRouteList from '../components/BusRouteList';
import '../css/BusRoute.css'

import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";
import refresh from "../images/refresh.png"
import { ModalBody } from 'react-bootstrap';

function BusRoute(){
    const location = useLocation();
    const [busRoute, setBusRoute] = useState(); 
    const [busInfo, setBusInfo] = useState();
    const [reallocation, setRealLocation] = useState();
    const [isitbus, setIsItBus] = useState();

    const navigate = useNavigate();

    const handlebackButton = () => {
        console.log("back");
        navigate(-1);
    }

    useEffect(() => {                               //받아온 버스 정보 버스 노선 정보, 버스 실시간 위치 정보
        setBusRoute(location.state.busroute);
        setBusInfo(location.state.props);
    })
    useEffect(()=>{             
        if(busInfo){
            realtimeBus();
        }
    }, [busInfo]);

    const handlefbutton = () => {
        var sec = document.querySelector('#test');
        var test1 = sec.offsetTop;
        console.log(test1);
        console.log("fbutotn");
    }
    const handlebbutton = () => {

    }

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
            <div className="busname" style={{position: "relative"}}>  
            <div className="container row" style={{height: "100%"}}>  
                <div className="col-2 align-middle" style={{position: "absolute", margin: "10px", padding: "0px"}}>
                    <i
                    class="bi bi-arrow-left-circle"
                    style={{ fontSize: "2.2rem", }}
                    onClick={handlebackButton}
                    ></i>
                </div> 
            </div>
                <div className="col" style={{position: "absolute", width: "100%" ,top: "34%"}}>
                    <h2>{busInfo.routeno}</h2>
                </div>   
            </div>
            <div className="busdirection" style={{position: "relative", width: "100%"}}>
                <div className="row" style={{position: "absolute" , width: "100%", height:"100%", margin: "0px", padding: "1px"}}>
                    <div className="col-6" style={{ position: "relative", padding: "0px", overflow: "hidden", textOverflow: "ellipsis"}}>
                        <button type="button" class="btn btn-outline-dark" style={{width: "100%", height: "100%", borderRadius: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} onClick={handlefbutton}>{busInfo.turn_BSTOPNM} 방면</button>                     
                    </div>                 
                    <div className="col-6" style={{ position: "relative", padding: "0px", textOverflow: "ellipsis"}}>
                    <button type="button" class="btn btn-outline-dark" style={{width: "100%", height: "100%", whiteSpace: "nowrap", overflow: "hidden", borderRadius: "1px", overflow: "hidden", textOverflow: "ellipsis"}} onClick={handlebbutton}>{busInfo.origin_BSTOPNM} 방면</button>    
                    </div>
                </div>
            </div>
            <div id="test" className="body" style={{position: "relative", top: "1px"}}>
                <div className="row" style={{margin: "0px", padding: "0px"}}>
                    {/* <div className="col-3" style={{backgroundColor: "white", borderRadius: "3px"}}>

                    </div> */}
                    <div className="list-group " style={{padding: "0px"}}>
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
                                <BusRouteList businfo={reallocation[bus]} isit={isit} bstopnm={obj.bstopnm} bstopid={obj.bstopid} sbstopid={obj.short_BSTOPID} turn={busInfo.turn_BSTOPID}></BusRouteList>
                            )
                        })}
              
                    </div>
                </div>
                <div className="reload-bus">
                    <button type="button" class="btn btn-large btn-outline-dark" style={{ width: "50px", height: "50px", textAlign: "center", padding: "0px" }} onClick={realtimeBus}><i class="bi bi-arrow-repeat" style={{ fontSize: "30px",}}></i></button>
                </div>
            </div>
        </main>

    );
                }

}


export default BusRoute;