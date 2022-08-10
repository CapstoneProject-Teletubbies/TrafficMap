// `import "../css/BuildingInfo.css";`
import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


const BuildingInfo = (props) => {
    const navigate = useNavigate();
    const [selectSubway, SetSelectSubway] = useState();

    console.log("빌딩인포시봘")
    console.log(props.obj.upperBizName);

    const searchsubwayinfo = (subwaynm) => {
        const subwayinfo = axios.create({
            baseURL: 'http://localhost:9000/'
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

export default BuildingInfo;
