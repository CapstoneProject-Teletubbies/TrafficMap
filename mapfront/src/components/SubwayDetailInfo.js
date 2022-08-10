import React from 'react';
import '../css/BuildingDetailInfo.css'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import button from 'react-bootstrap/button';
import Button from 'react-bootstrap/Button';

const SubwayDetailInfo = (props) => {

    const [buildingDetailInfo, setBuildingDetailInfo] = useState();

    useEffect(()=>{
        setBuildingDetailInfo(props.props.obj);
        console.log(buildingDetailInfo);
    })


    const startbutton =()=>{
        console.log('startbutton');
    }

    const arrivebutton=()=>{
        console.log('arrivebutton');
    }

    const stylehead={
        float: "left",
        margin:"12px",
        left: "10px",
    
    };
    const styleaddress={
        position: "fixed",
        float: "left",
        left: "10px",
        margin: "12px"
    }
    const stylebutton ={
        position: "fixed",
        float: "right",
        right: "10px",
        bottom: "10px",
        margin: "10px"
    }
    const styleelivator={
        position: "fixed",
        float: "right",
        right: "30px",
        margin: "12px"

    }
    /*function iselivator(props){
        if props ===true
    }
    var text=document.createTextNode("\u00a0");*/

    const setArrive = (props) => {
        let destination = props.address;

    }; //도착지 변수로 주소 넘겨주기

    const setStart = (props) => {
        let departure = props.address;
    };//출발지로 주소 넘기기
    if(buildingDetailInfo){
    return(
        <footer>
        <div id='Info' className="detailInfo">
                <div id='headInfo' style={stylehead}>
                    <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.bizname}</div>
                <div id="mapbutton">
                    <i class="bi bi-map"></i>
                </div>
                <div id='elivator' style={styleelivator}>
                    {buildingDetailInfo.elivator}</div>
                <div id='address' style={styleaddress}>
                    <br></br>{buildingDetailInfo.fullAddressRoad}</div>
                <div id='mybutton' style={stylebutton}>
                {/* <button type="button" class="btn btn-default btn-sm" onClick={setArrive}>도착</button> */}
                <Button variant="outline-success" size="sm" class="startbutton" onClick={setArrive}>도착</Button>
                <Button variant="outline-success" size="sm" class="startbutton" onClick={setStart}>출발</Button></div>
            </div>
            </footer>
    );
    }
}


export default SubwayDetailInfo; 