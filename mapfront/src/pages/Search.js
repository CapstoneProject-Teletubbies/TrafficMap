import React, {useState, useEffect } from 'react';
import '../css/search.css';
import '../css/input.css'
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import BuildingInfo from '../components/BuildingInfo';
import BusInfo from '../components/BusInfo';
import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import map from "../images/map.png";
import back from "../images/backicon.png"
import axios from "axios";

 function Search() {
    const [text, setText] = useState(' ');
    const [buildingList, setBuildingList] = useState([]);
    const [busList, setBusList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const keyword = location.state.keyword;
    const onChange = (e) => {
        setText(e.target.value);
    }

    useEffect(()=>{
        setBusList(location.state.bus);
        setBuildingList(location.state.building);
    })

    const handlebackButton = () => {   //키워드 문제가 있다
        window.location.href = "/";
    }
    const handlemapButton = () => {
        navigate('/resultsearch', { state: {
            building: buildingList}});
            window.location.href = "/resultsearch";  
    }

    return (
        <div className="searchjs">
            <div
                style={{
                    justifyContent: "center",
                    display: "flex",
                    padding: "10px 0px",
                }}
            >
                <nav
                    class="navbar navbar-default"
                    style={{
                        width: "95%",
                        display: "flex",
                        padding: "0px 10px",
                        border: "1px solid",
                        borderRadius: "20px",
                    }}
                >
                    <i
                        class="bi bi-arrow-left-circle"
                        style={{ fontSize: "2rem" }}
                        onClick={handlebackButton}
                    ></i>

                    <div className="" style={{ flex: 1, textAlign: "left" }}>
                        <SearchBar onChange={onChange} placeholder={keyword} />
                    </div>

                    <div className="">
                        {buildingList && (
                            <i
                                class="bi bi-pin-map-fill"
                                style={{ fontSize: "2rem" }}
                                onClick={handlemapButton}
                            ></i>
                        )}{" "}
                        {/*버스만 받아올때는 안뜸 */}
                    </div>
                </nav>
            </div>

            <div className="searchlist">
                {}

                <ol className="list-group">
                    {busList && busList.map((obj, index) => <BusInfo obj={obj}></BusInfo>)}
                    {buildingList &&
                        buildingList.map((obj, index) => (
                            <BuildingInfo
                                obj={obj}
                                name={obj.name}
                                address={obj.fullAddressRoad}
                            ></BuildingInfo>
                        ))}
                </ol>
            </div>
        </div>
    );
 }
 export default Search;