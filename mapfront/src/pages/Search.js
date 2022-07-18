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
    const onChange = (e) => {
        setText(e.target.value);
    }

    const searchBuilding = () => {
        const building = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        building.post('/api/find/address', null, {params: {keyword: "스타벅스"}})
        .then(function(res){
            console.log(res.data);
            setBuildingList(res.data);
        }).catch(function(error){
            console.log(`에러`);
        })
    }

    return (
    <div className="main"> 
        <div className="searchbar">
            <div className="line">
                <SearchBar onChange = {onChange} placeholder={'test'}/>
                <Button onClick ={searchBuilding} src={map}>지도</Button>
            </div>
        </div>
        <div className="buildingList">
            {}
            {/* {buildingList && buildingList.map((obj)=>(
                <BuildingInfo name={buildingList.name} address={buildingList.fullAddressRoad}></BuildingInfo>
            ))} */}
            <BuildingInfo name={buildingList.name} address={buildingList.fullAddressRoad}></BuildingInfo>
            <BuildingInfo name={buildingList.name} address={buildingList.fullAddressRoad}></BuildingInfo>
            <BuildingInfo name={buildingList.name} address={buildingList.fullAddressRoad}></BuildingInfo>
            <BuildingInfo name={buildingList.name} address={buildingList.fullAddressRoad}></BuildingInfo>
            <BuildingInfo name={buildingList.name} address={buildingList.fullAddressRoad}></BuildingInfo>
            <BuildingInfo name="test" address="인천.."></BuildingInfo>
        </div>
    </div>
    );
 }
 export default Search;