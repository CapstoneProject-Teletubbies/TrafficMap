import React, {useState, useEffect } from 'react';
import '../css/search.css';
import '../css/input.css'
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import BuildingInfo from '../components/BuildingInfo';
import {useLocation} from 'react-router';
import Button from "../components/Button";
import map from "../images/map.png";
import axios from "axios";

 function Search() {
    const [text, setText] = useState(' ');
    const [buildingList, setBuildingList] = useState([]);
    const location = useLocation();
    const keyword = location.state.keyword;
    const onChange = (e) => {
        setText(e.target.value);
    }

    useEffect(()=>{
        setBuildingList(location.state.building);
    })


    return (
    <div className="main"> 
        <div className="searchbar">
            <div className="line">
                <SearchBar onChange = {onChange} placeholder={keyword}/>
                {/* <Button src={map}>지도</Button> */}
            </div>
        </div>
        <div className="buildingList">
            {}
            {buildingList && buildingList.map((obj)=>(
                <BuildingInfo name={obj.name} address={obj.fullAddressRoad}></BuildingInfo>
            ))} 
        </div>
    </div>
    );
 }
 export default Search;