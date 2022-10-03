import React, {useState, useEffect} from 'react';

import axios from "axios";
import bus from "../images/bus.png";
import bus1 from "../images/bus1_white.png";
import bus2 from "../images/bus2_white.png";
import bus3 from "../images/bus3_white.png";
import bus4 from "../images/bus4_white.png";
import bus5 from "../images/bus5_white.png";

import Button from '../components/Button';
import BusRouteList from '../components/BusRouteList';
import '../css/BusRoute.css'

import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";
import refresh from "../images/refresh.png"
import { ModalBody } from 'react-bootstrap';

const baseurl = 'http://localhost:9000/'

function BusRoute(){
    const location = useLocation();
    const [busRoute, setBusRoute] = useState(); 
    const [busInfo, setBusInfo] = useState();
    const [reallocation, setRealLocation] = useState();
    const [isitbus, setIsItBus] = useState();

    const [color, setColor] = useState(); //버스 분류 색깔
    const [img, setImg ] = useState(bus);

    const navigate = useNavigate();

    const handlebackButton = () => {
        var url = location.state.url;
        console.log("back");   
        if(url == 'https://localhost:3002/location-map'){
            navigate(-1);  
        }else{
            navigate(-1); 
        }
    }

    useEffect(() => {                               //받아온 버스 정보 버스 노선 정보, 버스 실시간 위치 정보
        console.log(location.state.url);
        setBusRoute(location.state.busroute);
        setBusInfo(location.state.props);
        var id = location.state.props.routetpcd;
        switch (id) {
            case 1: setColor('#009300'); setImg(bus1); break;       //지선,초록색
            case 2: setColor('#0054FF'); setImg(bus2); break;        //간선,파란색
            case 4: setColor('#DB0000'); setImg(bus3); break;         //광역,빨간색
            case 6: setColor('#87CE00'); setImg(bus4); break;   //마을버스,연두색
            case 7: setColor('#FFE400'); setImg(bus5); break;      //순환, 노란색
        }
    })
    useEffect(()=>{             
        if(busInfo){
            realtimeBus();
        }
    }, [busInfo]);

    const handlefbutton = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    const handlebbutton = () => {
        var sec = document.querySelector("#turnaround").offsetTop;
        // document.querySelector("#turnaround").scrollIntoView({top: "100px", behavior: "smooth"}); //특정 element 위치로
        window.scrollTo(0, sec);
    }

    const realtimeBus = () => {
        const buslocation = axios.create({
            baseURL: baseurl
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
        <div className="" >        
            <nav className="navbar navbar-default" style={{position: "fixed", width: "100%", zIndex: 5, backgroundColor: "white", boxShadow: "0px 1px 5px gray"}}>
            
                <div style={{width: "20%"}}>
                
                    <i
                    class="bi bi-arrow-left-circle"
                    style={{ fontSize: "2.2rem", }}
                    onClick={handlebackButton}
                    ></i>
                </div>
                <div className="" style={{width: "60%", fontSize: "2.0em", color: color}}>
                <img src={img} style={{width:"25px",height:"25px" , marginRight:"13px", marginBottom: "3px"}}/><text style={{fontSize: "25px"}}>{busInfo.routeno}</text>     
                </div>
                <div style={{width: "20%"}}>     
                </div>
                <div className="busdirec" style={{width: "100%", height: "40px", marginTop: "3%"}}>
                    <button type="button" id="busdirbutton" className="busdirbutton" onClick={handlefbutton}>{busInfo.turn_BSTOPNM} 방면</button>
                    <button type="button" id="busdirbutton" className="busdirbutton" onClick={handlebbutton}>{busInfo.origin_BSTOPNM} 방면</button>
                </div>
            </nav>

            <div className="d-lg-none" style={{height: "125px"}} ></div> {/*더미div*/}

            <div className="brl" style={{overflow: "hidden"}}> {/*버스 루트 리스트*/}
                <div className="list-group" style={{}}>
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
                            <BusRouteList businfo={reallocation[bus]} isit={isit} img={img} bstopnm={obj.bstopnm} bstopid={obj.bstopid} sbstopid={obj.short_BSTOPID} turn={busInfo.turn_BSTOPID}></BusRouteList>
                        )
                    })}
                </div>
            </div>
            <div className="reload-bus"> {/*새로고침 버튼*/}
                    <button type="button" id="reloadbutton" className="" onClick={realtimeBus}><i class="bi bi-arrow-repeat" style={{ fontSize: "30px",}}></i></button>
            </div>
        </div>
    );}
}


export default BusRoute;