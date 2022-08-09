import React from 'react';
import '../css/BuildingDetailInfo.css'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import button from 'react-bootstrap/button';
import Button from 'react-bootstrap/Button';

const BuildingDetailInfo = (props) => {
    const [buildingDetailInfo, setBuildingDetailInfo] = useState();
    const [subway, SetSubway] = useState();
    const [subwayUp, SetSubwayUp] = useState([]);
    const [subwayDown, SetSubwayDown] = useState([]);

    useEffect(()=>{
        setBuildingDetailInfo(props.props);
        SetSubway(props.subway);

        if(buildingDetailInfo && subway){
            var i= 0, j = 0;
            {subway.map((obj)=>{
                if((buildingDetailInfo.name).includes(obj.subwayId)){
                    if(obj.updnLine === "상행" && i<2){
                        console.log(obj);
                        SetSubwayUp(subwayUp => [...subwayUp, obj]);
                        i++;
                    }
                    else if(obj.updnLine === "하행" && j<2){
                        SetSubwayDown(subwayDown => [...subwayDown, obj]);
                        j++
                    }
                };
            })}
        }
    }, [props])

    if(subwayUp){
        console.log(subwayDown);
    }

    const startbutton =()=>{
        
        console.log('startbutton');
    }

    const arrivebutton=()=>{
        console.log('arrivebutton');
    }

    const stylehead={
        float: "left",
        margin:"12px",
        left: "5px",
    
    };
    const styleaddress={
        position: "fixed",
        float: "left",
        left: "10px",
        margin: "12px"
    }
    const stylerealtime={
        position: "fixed",
        width: "100%",
    }
    const stylebutton ={
        position: "fixed",
        width: "170px",
        float: "right",
        right: "0px",
        bottom: "5px",
        margin: "10px"
    }
    const styleelivator={
        position: "fixed",
        float: "right",
        right: "30px",
        margin: "12px"

    }
    const mybutton={
        borderRadius: "20px",
        height: "35px",
        marginLeft: "8px",
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
        if(subway){
            return(
                <footer>
                <div id='Info' className="detailInfo">
                        <div id='headInfo' style={stylehead}>
                            <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.bizname}</div>
                        <div id='elivator' style={styleelivator}>
                            {buildingDetailInfo.elivator}</div>
                        <div id='realtime' style={stylerealtime}>
                            <div className="row">
                            <div className="col-5" style={{top: "47px", textAlign: "left", marginLeft: "20px", fontSize: "0.9em", lineHeight: "1.4em", paddingRight: "0px"}}>
                                {subwayUp && subwayUp.map((obj, index)=>{
                                    var arv = '';
                                    const name =(obj.trainLineNm).split('-');
                                    if((obj.arvlMsg2).includes("도착")){
                                        arv = obj.arvlMsg2;
                                    }else{
                                        arv = (obj.arvlMsg2).split('역')[0];
                                    }
                                   return(
                                    <div className="row" style={{textAlign: "left"}}>
                                        <div className="col-6">
                                            <h8>{name[0]}</h8>
                                        </div>
                                        <div className="col-6" style={{textAlign: "left",}}>
                                            <h8>{arv[0]}</h8>
                                        </div>
                                    </div>
                                   );
                                })}
                            </div>
                            
                            <div className="col-5" style={{top: "47px", textAlign: "left", marginLeft: "15px", fontSize: "0.9em", lineHeight: "1.4em", paddingRight: "0px"}}>
                                {subwayDown && subwayDown.map((obj, index)=>{
                                    var arv = '';
                                    const name =(obj.trainLineNm).split('-');
                                    if((obj.arvlMsg2).includes("도착")){
                                        arv = obj.arvlMsg2;
                                        console.log("도착포함" + arv);
                                    }else{
                                        arv = (obj.arvlMsg2).split('역')[0];
                                        console.log("미포함" + arv);
                                    }
                                   return(
                                    <div className="row" style={{textAlign: "left",}}>
                                        <div className="col-6">
                                        <h8>{name[0]}</h8>
                                        </div>
                                        <div className="col-6" style={{textAlign: "left",}}>
                                            <h8>{arv}</h8>
                                        </div>
                                    </div>
                                   );
                                })}
                            </div>
                            </div>
                        </div>
                        <div className="" style={stylebutton}>
                        <button type="button" class="btn btn-outline-primary btn-sm col-5" style={mybutton}>출발</button>
                        <button type="button" class="btn btn-primary btn-sm col-5" style={mybutton}>도착</button>
                        </div>
                    </div>
                    </footer>
            );
        }else{
            return(
                <footer>
                <div id='Info' className="detailInfo">
                        <div id='headInfo' style={stylehead}>
                            <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.bizname}</div>
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
}


export default BuildingDetailInfo; 