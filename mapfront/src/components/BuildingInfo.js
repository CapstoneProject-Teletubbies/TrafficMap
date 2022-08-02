// `import "../css/BuildingInfo.css";`
import React from 'react';
import { useNavigate } from "react-router-dom";


const BuildingInfo = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(props.obj);
        navigate("/location-map", {
            state: {
                props: props,
            },
        });
        window.location.href = "/location-map";
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
