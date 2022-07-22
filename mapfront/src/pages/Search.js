import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../css/search.css';
import '../css/input.css'
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import BuildingInfo from '../components/BuildingInfo';
import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import map from "../images/map.png";
import back from "../images/backicon.png"
import axios from "axios";

 function Search() {
    const [text, setText] = useState(' ');
    const [buildingList, setBuildingList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const keyword = location.state.keyword;
    const onChange = (e) => {
        setText(e.target.value);
    }

    useEffect(()=>{
        setBuildingList(location.state.building);
    })

    const handlebackButton = () => {
        window.location.href = "/";
    }
    const handlemapButton = () => {
        navigate('/resultsearch', { state: {
            building: buildingList}});
    }

    const searchBusRoute = () => {
        const busroute = axios.create({
         baseURL: 'http://localhost:8080/'
        })
        busroute.post('/api/bus/route', null, {params: {routeId: 165000110}})
        .then(function(res){
         console.log(res.data);
         navigate('/bus-route', {
            state:{
                busroute: res.data,
            }
         })
        }).catch(function(err){
         console.log('버스 노선 못받아옴');
        })
     }

    return (
    <div className="main"> 
        <div className="searchbar">
            <div className="button">
                <Button onClick={handlebackButton} src={back} />     
            </div>
            <div className="searchtest">
                <SearchBar onChange = {onChange} placeholder={keyword}/>
            </div>
            <div className="mapbutton">
                <Button onClick={handlemapButton} src={map} />   
            </div>
        </div>
        <div className="buildingList">
            {}
            {buildingList && buildingList.map((obj)=>(
                <BuildingInfo name={obj.name} address={obj.fullAddressRoad}></BuildingInfo>
            ))} 
        </div>
        <button onClick={searchBusRoute}>Test</button>
        
    </div>
    );
 }
 export default Search;