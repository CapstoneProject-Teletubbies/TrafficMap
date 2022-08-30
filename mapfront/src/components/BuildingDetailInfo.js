import React from 'react';
import axios from "axios";
import '../css/BuildingDetailInfo.css'
import Modal from './Modal';
import { Navigate, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';

const baseurl = 'http://localhost:9000/'         //베이스 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const BuildingDetailInfo = (props) => {
    const [buildingDetailInfo, setBuildingDetailInfo] = useState();
    const [subway, SetSubway] = useState();
    const [subwayUp, SetSubwayUp] = useState([]);
    const [subwayDown, SetSubwayDown] = useState([]);
    const [one, setOne] = useState(false);
    const [url, Seturl] = useState();
    const [line, setLine] = useState();
    const [iselevator, setIsElevator] = useState();

    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const openMadal = () => {
        handlesubwaymapbutton();
        setTimeout(setModalOpen(true), 50);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const handlestartButton = () => {
        console.log("출발 버튼 클릭");
        navigate('/find-way', {
            state:{
                startBuilding: props.whole.props,
                mylocation: props.whole.props.mylocation,
                id: 'start',
            }
        })
    }
    const handleendButton = () => {
        console.log("도착 버튼 클릭");
        navigate('/find-way', {
            state:{
                endBuilding: props.whole.props,
                mylocation: props.whole.props.mylocation,
                id: 'end',
            }
        })
    }

    const handlecheckButton = () => {
        var start = null, end = null;
        if(props.findway === 'start' && props.whole.endBuilding){
            start = props.whole.props;
            end = props.whole.endBuilding;
        }else if(props.findway === 'end' && props.whole.startBuilding){
            start = props.whole.startBuilding;
            end = props.whole.props;
        }else if(props.findway === 'start'){
            console.log("c출발");
            start = props.whole.props;     
        }else if(props.findway === 'end'){
            console.log("도ㅗ착");
            end = props.whole.props;
        }
        console.log(props);
        navigate('/find-way', {
            state: {
                props: props.whole.props,
                mylocation: props.mylocation,
                id: props.findway,
                startBuilding: start,
                endBuilding: end,
            }
        })
    }
    const handlesubwaymapbutton = () => {
        const subwayname = (props.props.name.split('역'))[0];
        const subwaymap = axios.create({                                    //인천지하철 1, 2호선 내부지도
            baseURL: baseurl
        })
        const subwaymap2 = axios.create({                                   //1~9호선 내부지도
            baseURL: baseurl
        })

        var name = (buildingDetailInfo.name).split(/[\[\]]/)
        console.log(line);
        var line = name[1].split('호');

        if((buildingDetailInfo.name).includes('인천지하철')){
        subwaymap.post('/api/subway/photo', null, {params: {name: subwayname}})
        .then(function(res){
            console.log(res.data);
            if((buildingDetailInfo.name).includes('인천지하철1호선')){
                setLine('지하철입체지도/인천1호선/');
                console.log("인천 지하철 1호선임");          
            }else if((buildingDetailInfo.name).includes('인천지하철2호선')){
                setLine('지하철입체지도/인천2호선/');
                console.log("인천 지하철 2호선임");
            }
            Seturl(res.data);
        }).catch(function(err){
            console.log("지하철 입체지도 정보 못받아옴");
        })
        }else{
        subwaymap2.post('api/subway/photo2', null, {params: {line: line[0], name: name[0]}})
        .then(function(res){
            console.log(res.data);
            Seturl(res.data);
        }).catch(function(err){
            console.log("1~9호선 내부지도 못받아옴");
        })
        }
    }

    useEffect(()=>{
        console.log(props);
        setBuildingDetailInfo(props.props);
        SetSubway(props.subway);
        if(props.elevatorState === '운행중'){
            setIsElevator(true);
        }else{
            setIsElevator(false);
        }

        if(!one && buildingDetailInfo && subway){
            console.log(buildingDetailInfo);
            setOne(true);
            var i= 0, j = 0;
            {subway.map((obj)=>{
                if((buildingDetailInfo.name).includes(obj.subwayId)){
                    if(obj.updnLine === "상행" && i<2){
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
                    <Modal open={modalOpen} close={closeModal} url={url} line={line}>
                        팝업창임
                    </Modal>
                <footer>
                    
                <div id='Info' className="detailInfo" style={{height: "100%"}}>
                        <div id='headInfo' className="row" style={{top: "10px"}}>
                            <div className="col-7" style={{textAlign: "left", paddingLeft: "5%"}}>
                                <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.bizname}
                            </div><div className="col-4">
                                <div id="subwaymapbutton" className="col-3" style={{float: "right"}}>
                                    <i class="bi bi-map" onClick={openMadal}></i>
                                </div>
                            </div>  
                        </div>
                        {/* <div id='elivator' style={styleelivator}>
                            {buildingDetailInfo.elivator}</div> */}
                        <div id='realtime' style={{}}>
                            <div className="row" style={{height: "100%"}}>
        {/*상행 */}             <div className="col-6" style={{top: "20px", textAlign: "left", fontSize: "0.9em", paddingLeft: "6%", paddingRight: "1%"}}>
                                {subwayUp && subwayUp.map((obj, index)=>{
                                    var arv = '';
                                    const name =(obj.trainLineNm).split('-');
                                    if((obj.arvlMsg2).includes("도착")){                          
                                        if(obj.arvlMsg3 == (obj.arvlMsg2).split(' 도착')[0]){
                                            arv = '도착';
                                        }else{
                                            arv = obj.arvlMsg2;
                                        }
                                    }else{
                                        arv = (obj.arvlMsg2).split('역')[0];
                                    }
                                   return(
                                    <div className="row" style={{textAlign: "left"}}>
                                        <div className="col-6" style={{padding: "0px"}}>
                                            <h8>{name[0]}</h8>
                                        </div>
                                        <div className="col-6" style={{textAlign: "left", padding: "0px", color: "red"}}>
                                            <h8>{arv}</h8>
                                        </div>
                                    </div>
                                   );
                                })}
                            </div>
                            
       {/*하행 */}          <div className="col-6" style={{top: "20px", textAlign: "left", fontSize: "0.9em", paddingLeft: "1%", paddingRight: "6%"}}>
                                {subwayDown && subwayDown.map((obj, index)=>{
                                    var arv = '';
                                    const name =(obj.trainLineNm).split('-');
                                    if((obj.arvlMsg2).includes("도착")){
                                        if(obj.arvlMsg3 == (obj.arvlMsg2).split(' 도착')[0]){
                                            arv = '도착';
                                        }else{
                                            arv = obj.arvlMsg2;
                                        }    
                                    }else{
                                        arv = (obj.arvlMsg2).split('역')[0];
                                    }
                                   return(
                                    <div className="row" style={{textAlign: "left",}}>
                                        <div className="col-6" style={{padding: "0px"}}>
                                        <h8>{name[0]}</h8>
                                        </div>
                                        <div className="col-6" style={{textAlign: "left", padding: "0px", color: "red"}}>
                                            <h8>{arv}</h8>
                                        </div>
                                    </div>
                                   );
                                })}
                            </div>
                            </div>
                        </div>
                        <div className="" style={stylebutton}>
                        <button type="button" class="btn btn-outline-primary btn-sm col-5" onClick={handlestartButton} style={mybutton}>출발</button>
                        <button type="button" class="btn btn-primary btn-sm col-5" onClick={handleendButton} style={mybutton}>도착</button>
                        </div>
                    </div>
                    </footer>
                    </div>
            );
        }else{
            return(
                <footer style={{boxShadow: "1px 1px 10px 1px gray", }}>
                <div style={{padding: "2%", height: "100%"}}>
                        <div style={{width: "100%", textAlign: "-webkit-left"}}>
                            <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.upperBizName}
                            <b>{buildingDetailInfo.bstopnm}</b>
                        </div>
                        <div style={{textAlign: "-webkit-left"}}>
                            {buildingDetailInfo.fullAddressRoad}
                        </div>
                        {!props.findway &&
                        <div className="" style={stylebutton}>                          
                            <button type="button" class="btn btn-outline-primary btn-sm col-5" onClick={handlestartButton} style={mybutton}>출발</button>
                            <button type="button" class="btn btn-primary btn-sm col-5" onClick={handleendButton} style={mybutton}>도착</button>
                        </div>
                        }
                        {props.findway && 
                        <div id="checkbutton" style={{position: "relative", width: "100%", }}>
                            <button style={{width: "100%", backgroundColor: "white", borderRadius: "5px"}} onClick={handlecheckButton}>확인</button>
                        </div>
                        }
                </div>
                </footer>
            );
        }
    }
}


export default BuildingDetailInfo; 