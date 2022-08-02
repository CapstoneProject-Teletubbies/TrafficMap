import React from 'react';
import { useState, KeyboardEvent, useEffect } from "react";
import axios from 'axios';
import '../css/Main.css'
import '../css/input.css'
import Search from '../pages/Search'
import { Link, useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isEnter, setIsEnter] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [buildingList, setBuildingList] = useState([]);
    const handleValue = (e) => {        //검색어 입력받는 부분
        setSearchValue(e.target.value);
        console.log(e.target.value);

    }
    const handleKeyPress = (e) => { //enter키 추적용 -> 검색 결과창으로 이동시킴
        if(e.key === 'Enter'){
            if(searchValue.includes('번 버스') || searchValue.includes('번버스')){
                searchOnlyBus();
            }
            else{
                searchBusStop();
            }
        }
    }
    const searchBuilding = (props1, props2) => {
        const building = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        building.post('/api/find/address', null, {params: {keyword: searchValue}})
        .then(function(res){
            setBuildingList(res.data);
            navigate('/search', {
                state: {
                    keyword: searchValue,
                    building: res.data,
                    bus: props1,
                    busstop: props2,
                }
            });
        }).catch(function(error){
            console.log(`에러`);
        })
    }

    const searchBus = (props) => {
        const bus = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        bus.post('api/bus/busInfo/', null, {params: {busName: searchValue}})
        .then(function(res){
            searchBuilding(res.data, props);
        }).catch(function(error){
            console.log('에러');
        })
    }

    const searchOnlyBus = () => {
        const bus = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        bus.post('api/bus/busInfo/', null, {params: {busName: searchValue}})
        .then(function(res){
            console.log(res.data);
            navigate('/search', {
                state: {
                    keyword: searchValue,
                    bus: res.data,
                }
            });
        }).catch(function(error){
            console.log('에러');
        })
    }

    const searchBusStop = () => {
        const busstop = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        busstop.post('api/bus/busStop', null, {params: {busStopName: searchValue}})
        .then(function(res){
            searchBus(res.data);
        }).catch(function(error){
            console.log('에러');
        })
    }

    return(
        <>       
            <input className="gg" type="text" placeholder={props.placeholder} 
            onChange={handleValue}
            onKeyDown={handleKeyPress}
            />
        </>
    );
};

export default SearchBar;