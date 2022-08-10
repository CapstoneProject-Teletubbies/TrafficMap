import React from 'react';
import axios from "axios";
import '../css/BuildingDetailInfo.css'
import Modal from './Modal';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';

const BuildingDetailInfo = (props) => {
    const [buildingDetailInfo, setBuildingDetailInfo] = useState();
    const [subway, SetSubway] = useState();
    const [subwayUp, SetSubwayUp] = useState([]);
    const [subwayDown, SetSubwayDown] = useState([]);
    const [one, setOne] = useState(false);
    const [url, Seturl] = useState();

    const [modalOpen, setModalOpen] = useState(false);

    const openMadal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const handlesubwaymapbutton = () => {
        const subwayname = (props.props.name.split('역'))[0];
        const subwaymap = axios.create({
            baseURL: 'http://localhost:9000/'
        })
        subwaymap.post('/api/subway/photo', null, {params: {name: subwayname}})
        .then(function(res){
            console.log(res.data);
            var url = '../../지하철입체지도/인천1호선/간석오거리_5번 출입구 근처 엘리베이터_부평삼거리 방면.png'
            Seturl(url);
        }).catch(function(err){
            console.log("지하철 입체지도 정보 못받아옴");
        })
    }

    useEffect(()=>{
        console.log("디테일인포다 ㅆ비ㅏㄹ");
        console.log(props);
        setBuildingDetailInfo(props.props);
        SetSubway(props.subway);

        if(!one && buildingDetailInfo && subway){
            setOne(true);
            var i= 0, j = 0;
            {subway.map((obj)=>{
                if((buildingDetailInfo.name).includes(obj.subwayId)){
                    if(obj.updnLine === "상행" && i<2){
                        console.log("상행ㅇ");
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

    const styleaddress={
        position: "fixed",
        float: "left",
        left: "10px",
        margin: "12px"
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
                <div>
                    <Modal open={modalOpen} close={closeModal}>
                        팝업창임
                    </Modal>
                <footer>
                    
                <div id='Info' className="detailInfo" style={{height: "100%"}}>
                        <div id='headInfo' className="row" style={{top: "10px"}}>
                            <div className="col-5" style={{textAlign: "left", paddingLeft: "5%"}}>
                                <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.bizname}
                            </div><div className="col-4"></div>
                            <div id="subwaymapbutton" className="col-3" style={{float: "right"}}>
                                <i class="bi bi-map" onClick={openMadal}></i>
                            </div>
                        </div>
                        {/* <div id='elivator' style={styleelivator}>
                            {buildingDetailInfo.elivator}</div> */}
                        <div id='realtime' style={{}}>
                            <div className="row" style={{height: "100%"}}>
                            <div className="col-5" style={{top: "20px", textAlign: "left", marginLeft: "15px", fontSize: "0.9em", lineHeight: "1.4em", paddingRight: "0px"}}>
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
                                            <h8>{arv}</h8>
                                        </div>
                                    </div>
                                   );
                                })}
                            </div>
                            
                            <div className="col-5" style={{top: "20px", textAlign: "left", marginLeft: "15px", fontSize: "0.9em", lineHeight: "1.4em", paddingRight: "0px"}}>
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
                    </div>
            );
        }else{
            return(
                <footer>
                <div id='Info' className="detailInfo">
                        <div id='headInfo' style={{}}>
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