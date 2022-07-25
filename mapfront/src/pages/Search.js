import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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
        setBuildingList(location.state.building);
        setBusList(location.state.bus);
    })

    const handlebackButton = () => {
        window.location.href = "/";
    }
    const handlemapButton = () => {
        navigate('/resultsearch', { state: {
            building: buildingList}});
    }

    const handleClick = () => {
        console.log('이게왜');
    }

    const searchBusRoute = () => {              {/*버스 노선 받아오는 거*/}
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
                <Button onClick={handlemapButton} src={map} />   {/*버스만 받아올때는 안뜨게 해야함 */}
            </div>
        </div>
        <div className="buildingList">
            {}
            {busList && busList.map((obj, index)=>(
                <BusInfo obj={obj}></ BusInfo>
            ))}
            {buildingList && buildingList.map((obj, index)=>(
                <BuildingInfo  obj={obj} name={obj.name} address={obj.fullAddressRoad}></BuildingInfo>
            ))} 
        </div> 
    </div>
    );
 }
 export default Search;