// `import "../css/BuildingInfo.css";`
import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BuildingInfo = (props) => {
    const navigate = useNavigate();

    const searchsubwayinfo = () => {
        const subwayinfo = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        subwayinfo.post('/api/subway', null, {params: {start: 0, end: 10, name: '부평'}})
        .then(function(res){
            console.log(res.data);
        }).catch(function(err){
            console.log("지하철 정보 못받아옴");
        })
    };




    const handleClick = () => {
        console.log(props);
        searchsubwayinfo();
        if(props.obj.upperBizName === "교통편의"){
            // searchsubwayinfo();       
        }
        else{
            // navigate("/location-map", {
            //     state: {
            //         props: props,
            //     },
            // });
            // window.location.href = "/location-map";
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
