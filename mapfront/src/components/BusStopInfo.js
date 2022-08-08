// `import "../css/BuildingInfo.css";`
import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


const BusStopInfo = (props) => {
    const navigate = useNavigate();
    const [selectBusStop, SetSelectBusStop] = useState();

    const searchbusstopinfo = () => {
        const busstopinfo = axios.create({
            baseURL: 'http://localhost:9000/'
        })
        busstopinfo.post('/api/bus/busArrival', null, {params: {busStopId: props.obj.bstopid}})
        .then(function(res){
            console.log(res.data);

            // navigate("/location-map", {
            //     state: {
            //         props: props,
            //         subway: res.data,
            //     }
            // });
            // window.location.href = "/location-map";
        }).catch(function(err){
            console.log("버스정류장 실시간 도착정보 못받아옴");
        })
    };





    const handleClick = () => {
        console.log(props);
        searchbusstopinfo();
    };


    return (
        <li className="list-group-item" onClick={handleClick}>
            <div className="ms-2" style={{ textAlign: "left" }}>
                <div className="fw-bold" style={{ textAlign: "left" }}>
                    {props.name}
                </div>
                {props.address}
            </div>
        </li>
    );
};

export default BusStopInfo;
