// `import "../css/BuildingInfo.css";`
import React from 'react';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const baseurl = 'http://localhost:9000/'


const BusStopInfo = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectBusStop, SetSelectBusStop] = useState();
    const [preUrl, setPreUrl] = useState();

    const searchbusstopinfo = () => {
        const busstopinfo = axios.create({
            baseURL: baseurl
        })
        busstopinfo.post('/api/bus/busArrival', null, {params: {busStopId: props.obj.bstopid}})
        .then(function(res){
            console.log(res.data);

            navigate("/location-map", {
                state: {
                    props: props,
                    subway: null,
                    busstop: res.data,
                }
            });
            window.location.href = "/location-map";
        }).catch(function(err){
            console.log("버스정류장 실시간 도착정보 못받아옴");
        })
    };

    const handleClick = (evt) => {
        var start = null, end = null;
        console.log("props");
        console.log(props);
        if(preUrl){
            if(evt.target.className !== 'bi bi-map'){
                if(props.id == 'start' && props.endBuilding){
                    console.log("이건 진짜 다입력한거임 ");
                    start = props;
                    end = props.endBuilding;
                }else if(props.id == 'end' && props.startBuilding){
                    console.log("이것도 다 입력한거임");
                    start = props.startBuilding;
                    end = props;
                }else if(props.id == 'start'){
                    start = props;
                }else if(props.id == 'end'){
                    end = props;
                }
                navigate('/find-way', {
                    state: {
                        props: props,
                        mylocation: props.mylocation,
                        id: props.id,
                        startBuilding: start,
                        endBuilding: end,
                    }
                });
            }
        }else{
            searchbusstopinfo();
        }
    };

    const handleButtonClick = () => {
        var start = null, end = null;
        if(props.startBuilding){
            start = props.startBuilding;
            end = null;
        }else if(props.endBuilding){
            start = null;
            end = props.endBuilding;
        }
        console.log("지도 아이콘 클릭");
        navigate('/location-map', {
            state: {
                props: props,
                mylocation: props.mylocation,
                id: props.id,
                startBuilding: start,
                endBuilding: end,
            }
        })
        window.location.href = "/location-map";
    }

    useEffect(()=>{
        console.log(props);
        if(location.pathname == '/find-search'){
            setPreUrl(true);
        }else if(location.pathname == '/search'){
            setPreUrl(false);
        }
    }, [])


    return (
        <li className="list-group-item" onClick={handleClick}>
            <div className="row">
                <div className="col-10" style={{ textAlign: "left" }}>
                    <div className="fw-bold" style={{ textAlign: "left" }}>
                        {props.name}
                    </div>
                    {props.address}
                </div>
                <div className="col-2">
                    {preUrl && <button type="button" class="btn btn-outline-secondary btn-circle" onClick={handleButtonClick} style={{borderRadius: "50%", }}>
                        <i class="bi bi-map"></i></button>  
                    }
                </div>
            </div>
        </li>
    );
};

export default BusStopInfo;
