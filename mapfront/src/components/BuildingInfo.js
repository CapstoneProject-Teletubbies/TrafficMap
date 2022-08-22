// `import "../css/BuildingInfo.css";`
import React from 'react';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

import elevator from '../images/elevator.png'

const baseurl = 'http://localhost:9000/'


const BuildingInfo = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectSubway, SetSelectSubway] = useState();
    const [iselevator, setIsElevator] = useState();
    const [fun, setFun] = useState();

    

    useEffect(()=>{
        console.log(props);
        if(props.obj.elevatorState === '운행중'){
            setIsElevator(true);
        }else{
            setIsElevator(false);
        }
        if(location.pathname == '/find-search'){
            setFun(true);
        }else if(location.pathname == '/search'){
            setFun(false);
        }
    }, [props])

    const searchsubwayinfo = (subwaynm) => {
        const subwayinfo = axios.create({
            baseURL: baseurl
        })
        subwayinfo.post('/api/subway', null, {params: {name: subwaynm}})
        .then(function(res){
            console.log(res.data);
            SetSelectSubway(res.data);
  
            navigate("/location-map", {
                state: {
                    props: props,
                    subway: res.data,
                }
            });
            window.location.href = "/location-map";
        }).catch(function(err){
            console.log("지하철 정보 못받아옴");
        })
    };

    const handleClick = () => {
        console.log(props);
        if(location.pathname == '/search'){
        if(props.obj.upperBizName === "교통편의"){
            var subwayname = (props.obj.name).split('역');
            console.log(subwayname[0]);
            searchsubwayinfo(subwayname[0]);       
        }
        else{
            navigate("/location-map", {
                state: {
                    props: props,
                },
            });
            window.location.href = "/location-map";
        }
        }else if(location.pathname == '/find-search') {
            navigate('/find-way', {
                state: {
                    props: props,
                }
            });
        }
    };

    const handleButtonClick = () => {
        console.log(props);
        if(props.obj.upperBizName === "교통편의"){
            var subwayname = (props.obj.name).split('역');
            console.log(subwayname[0]);
            searchsubwayinfo(subwayname[0]);       
        }
        else{
            navigate("/location-map", {
                state: {
                    props: props,
                },
            });
            window.location.href = "/location-map";
        }
    };


    return (
        <li className="list-group-item" onClick={handleClick} style={{}}>
            <div className="row">
            <div className="col-9" style={{ textAlign: "left" }}>
                <div className="fw-bold" style={{ textAlign: "left" }}>
                    {props.name}
                </div>
                {props.address}
            </div>
            <div className= "col-3"style= {{alignSelf: "center", padding: "0px", paddingRight: "10px"}}>
                {iselevator && 
                <img src={elevator} style={{width: "30px", height: "30px"}}></img>}         
            {fun &&
                <button type="button" class="btn btn-outline-secondary btn-circle" onClick={handleButtonClick} style={{borderRadius: "50%", float: "right", width: "50%", height: "50%"}}>
                <i class="bi bi-map"></i></button>  
            }
            </div>
            </div>
        </li>
    );
};

export default BuildingInfo;
