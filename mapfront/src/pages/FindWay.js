import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

import SearchBar from '../components/SearchBar';

function FindWay(props){
    const [startplaceholder, setStartPlaceHolder] = useState('출발지 입력');
    const [endplaceholder, setEndPlaceHolder] = useState('도착지 입력');

    const [startPlace, setStartPlace] = useState();
    const [endPlace, setEndPlace] = useState();

    const [findway, setFindway] = useState();

    const location = useLocation();

    const mylocation = location.state.mylocation;

    console.log(mylocation);

    useEffect(()=>{
        console.log(props); 
        console.log(location);
        setFindway(location.state);
        if(location.state){
            console.log(location.state);
            if(location.state.startBuilding){
                console.log("출발지 정보 왔어요");
                setStartPlace(location.state.startBuilding);            //출발지 정보
                setStartPlaceHolder(location.state.startBuilding.name);  //출발지 이름
            }
            if(location.state.endBuilding){    
                console.log("도착지 정보 왔어요");
                setEndPlace(location.state.endBuilding);              //도착지 정보
                setEndPlaceHolder(location.state.endBuilding.name);   //도착지 이름
            }  

            if(location.state.startBuilding && location.state.endBuilding){
                console.log("출발지, 도착지 둘 다 입력 완료");
            }
        }
    }, [findway])
///////////////////////////////////////////
    useEffect(()=>{
        console.log(startPlace);
        console.log(endPlace);
    }, [startPlace, endPlace])
//////////////////////////////////////////
    const handleXButton =   () => {
        console.log("클릭");
        window.location.href = "/";
    }

    const searchbarstyle={
        border: "1px solid gray",
        borderRadius: "6px",
        margin: "5px",
        width: "100%",       
    }

    return(
        <div style={{position: "fixed", width: "100%", height: "100%", backgroundColor: "#D5D5D5"}}>
            <div className= "row align-items-center" id="findwayheader" style={{position: "relative", width: "100%", margin: "0px", display: "flex"
                , backgroundColor: "white", boxShadow: "1px 1px 10px 0.8px gray"}}>
                <div className='col-11' style={{position: "relative", textAlign: "-webkit-left"}}>
                    <SearchBar style={{border: "1px solid gray", borderRadius: "6px", margin: "5px", marginTop: "12px", width: "100%", }} placeholder={startplaceholder} location={mylocation} src={'/find-search'} id={'start'} endPlace={endPlace}></SearchBar>
                    <SearchBar style={{border: "1px solid gray", borderRadius: "6px", margin: "5px", marginBottom: "12px",  width: "100%", }} placeholder={endplaceholder} location={mylocation} src={'/find-search'} id={'end'} startPlace={startPlace}></SearchBar>
                </div>
                <div className="col-1" style={{alignSelf: "flex-start", marginTop: "5px", padding: "0px"}}>
                    <div style={{display: "flex", left: "-3px"}}>
                        <i class="bi bi-x" onClick={handleXButton} style={{fontSize: "2rem"}}></i>
                    </div>                               
                </div>
            </div>
            <div>
            </div>
        </div>     
    );
}
export default FindWay;