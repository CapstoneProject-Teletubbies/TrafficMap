import React from 'react';
import { useState, KeyboardEvent, useEffect } from "react";
import axios from 'axios';
import '../css/Main.css'
import '../css/input.css'
import Search from '../pages/Search'
import { Link, useNavigate, useLocation } from "react-router-dom";

const baseurl = 'http://localhost:9000/'         //베이스 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const SearchBar = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isEnter, setIsEnter] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [mylocation, setMylocation] = useState();
    const [buildingList, setBuildingList] = useState([]);
    const [src, setSrc] = useState();
    const [value, setValue] = useState();
    const [startBuilding, setStartBuildingInfo] = useState();
    const [endBuilding, setEndBuildingInfo] = useState();

    const location = useLocation();

    const handleValue = (e) => {        //검색어 입력받는 부분
        setSearchValue(e.target.value);
    }
    const handleKeyPress = (e) => { //enter키 추적용 -> 검색 결과창으로 이동시킴
        if(e.key === 'Enter'){
            if(src == '/search' && (searchValue.includes('번 버스') || searchValue.includes('번버스'))){
                
                searchOnlyBus();
            }
            else{
                searchBusStop();
            }
        }
    }
    useEffect(()=>{
        setMylocation(props.location);
        let where = location.pathname;

        if(where == '/' || where == '/search'){
            setSrc('/search');
        }
        else if(where == '/find-way' || where == '/find-search'){
            setSrc('/find-search');
            if(props.startPlace){
                setStartBuildingInfo(props.startPlace);

            }else if(props.endPlace){
                setEndBuildingInfo(props.endPlace);
            }
            if(props.value){
                setValue(props.value.name);
                
            }
        }
        // console.log(props.location);
    })

    const searchBuilding = (props1, props2) => {
        const building = axios.create({
            baseURL: baseurl
        })
        building.post('/api/find/address', null, {params: {keyword: searchValue, latitude: mylocation.latitude, longitude: mylocation.longitude}})
        .then(function(res){
            console.log(res.data);
            setBuildingList(res.data);
            navigate(src, {
                state: {
                    keyword: searchValue,
                    building: res.data,
                    bus: props1,
                    busstop: props2,
                    mylocation: mylocation,
                    id: props.id,
                    startBuilding: startBuilding,
                    endBuilding: endBuilding,
                }
            });
        }).catch(function(error){
            console.log(`에러`);
        })
    }

    const searchBus = (props) => {
        const bus = axios.create({
            baseURL: baseurl
        })
        bus.post('api/bus/busInfo/', null, {params: {busName: searchValue}})
        .then(function(res){
            searchBuilding(res.data, props);
        }).catch(function(error){
            console.log('에러');
        })
    }

    const searchOnlyBus = () => {           //~번 버스로 서치했을 때
        const bus = axios.create({
            baseURL: baseurl
        })
        bus.post('api/bus/busInfo/', null, {params: {busName: searchValue}})
        .then(function(res){
            console.log(res.data);
            navigate('/search', {
                state: {
                    keyword: searchValue,
                    bus: res.data,
                    mylocation: mylocation,
                }
            });
        }).catch(function(error){
            console.log('에러');
        })
    }

    const searchBusStop = () => {
        const busstop = axios.create({
            baseURL: baseurl
        })
        busstop.post('api/bus/busStop', null, {params: {busStopName: searchValue}})
        .then(function(res){
            searchBus(res.data);
            console.log('버스정륙소');
            console.log(res.data);
        }).catch(function(error){
            console.log('에러');
        })
    }



    return(
        <>       
            <input className="gg" type="text" style={props.style} 
            placeholder={props.placeholder} value={value} 
            onChange={handleValue}
            onKeyDown={handleKeyPress}
            />
        </>
    );
};

export default SearchBar;