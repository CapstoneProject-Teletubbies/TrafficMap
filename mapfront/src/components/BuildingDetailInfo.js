import React from 'react';
import axios from "axios";
import $ from 'jquery';
import '../css/BuildingDetailInfo.css'
import Modal from './Modal';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Navigate, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import arrowsrefresh from "../images/arrows-refresh.png";
import elevator from "../images/elevator.png";
import toileticon from "../images/toilet.png"
import lift from "../images/lift.png";
import spinner from "../images/spinner.gif";


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
    const [iswheelchairlift, setIsWheelChairLift] = useState(false);
    const [isToilet, setIsToilet] = useState(false);
    const [iswheelchairliftClick, setIsWheelChairLiftClick] = useState(false);
    const [wheelchairLocation, setWCLocation] = useState();
    const [isToiletClick, setIsToiletClick] = useState(false);
    const [toiletLocation, setToiletLocation] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const el = useRef();

    const navigate = useNavigate();

    const openMadal = () => {
        handlesubwaymapbutton();
        setTimeout(setModalOpen(true), 50);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    SwiperCore.use([Navigation, Pagination]);

    var element = document.getElementById("arrowrefresh");

    if(element){
        
        element.addEventListener("click", function(e){

        element.classList.remove("bounce");

        console.log(element.offsetWidth);

        element.classList.add("bounce");

        }, false);
    }

  const swiperParams = {
    // navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',},
    // slidesPerView: 1,
    scrollbar: {draggable: true},
  }

  const swiperStyle = {
    position: "absolute",
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    top: "-20%"
    // width: "100%",
    // height: "100%"
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

        var name = (buildingDetailInfo.name).split(/[\[\]]/);
        var subname = name[0];
        console.log(name);
        var line = name[1].split('호');

        switch (subname){
            case '총신대입구역/이수역': name = '총신대입구(이수)역'; break;
            case '신정역': name = '신정역(은행정)'; break;
            case '오목교역': name = '오목교역(목동운동장앞)'; break;
            case '충정로역' : name = '충정로역(경기대입구)'; break;
            case '광화문역' : name = '광화문역(세종문화회관)'; break;
            case '종로3가역' : if(line[0]==5){name = '종로3가역(탑골공원)'}else{name=subname}; break;
            case '군자역': name = '군자(능동)'; break;
            case '아차산역': name ='아차산역(어린이대공원후문)'; break;
            case '광나루역': name = '광나루역(장신대)'; break;
            case '천호역': name ='천호역(풍납토성)'; break;
            case '올림픽공원역': name = '올림픽공원역(한국체대)'; break;
            case '굽은다리역': name = '굽은다리역(강동구민회관앞)'; break;  
            case '새절역': name = '새절역(신사)'; break;
            case '증산역': name = '증산역(명지대앞)'; break;
            case '월드컵경기장역': name = '월드컵경기장역(성산)'; break;
            case '광흥창역' : name = '광흥창역(서강)'; break;       
            case '대흥역': name = '대흥역(서강대앞)'; break;
            case '효창공원앞역' : name = '효창공원앞역(용산구청)'; break; 
            case '안암역': name = '안암역(고대병원앞)'; break;
            case '고려대역' : name = '고려대역(종암)'; break;    
            case '월곡역': name = '월곡역(동덕여대)'; break;
            case '상월곡역': name = '상월곡역(한국과학기술연구원)'; break;
            case '화랑대역': name = '화랑대역(서울여대입구)'; break;
            case '공릉역': name = '공릉역(서울산업대입구)'; break;
            default : name=subname; break;
        }


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
            var line;
            
            if(line[0] == '지하철경의중앙선'){
                line = '경의중앙선';
            }else{
                line = line[0]
            }
            console.log(name);
            console.log(line);
        subwaymap2.post('api/subway/photo2', null, {params: {line: line, name: name}})
        .then(function(res){
            console.log(res.data);
            Seturl(res.data);
        }).catch(function(err){
            console.log("1~9호선 내부지도 못받아옴");
        })
        }
    }

    const searchsubwaytime = () => {        //새로고침 눌렀을때 지하철 실시간 정보 받아옴


        const subwayinfo = axios.create({
            baseURL: baseurl
        })
        var subwayname = (buildingDetailInfo.name).split('역')[0];
        switch (subwayname){
            case '쌍용': subwayname='쌍용(나사렛대)'; break;
            case '총신대입구': subwayname = '총신대입구(이수)'; break;
            case '신정': subwayname = '신정(은행정)'; break;
            case '오목교': subwayname = '오목교(목동운동장앞)'; break;
            case '군자': subwayname = '군자(능동)'; break;
            case '아차산': subwayname ='아차산(어린이대공원후문)'; break;
            case '광나루': subwayname = '광나루(장신대)'; break;
            case '천호': subwayname ='천호(풍납토성)'; break;
            case '올림픽공원': subwayname = '올림픽공원(한국체대)'; break;
            case '굽은다리': subwayname = '굽은다리(강동구민회관앞)'; break;
            case '응암순환': subwayname = '응암순환(상선)'; break;
            case '새절': subwayname = '새절(신사)'; break;
            case '증산': subwayname = '증산(명지대앞)'; break;
            case '월드컵경기장': subwayname = '월드컵경기장(성산)'; break;
            case '대흥': subwayname = '대흥(서강대앞)'; break;
            case '안암': subwayname = '안암(고대병원앞)'; break;
            case '월곡': subwayname = '월곡(동덕여대)'; break;
            case '상월곡': subwayname = '상월곡(한국과학기술연구원)'; break;
            case '화랑대': subwayname = '화랑대(서울여대입구)'; break;
            case '공릉': subwayname = '공릉(서울산업대입구)'; break;
            case '어린이대공원': subwayname = '어린이대공원(세종대)'; break;
            case '숭실대입구': subwayname = '숭실대입구(살피재)'; break;
            case '상도': subwayname = '상도(중앙대앞)'; break;
            case '몽촌토성': subwayname = '몽촌토성(평화의문)'; break;
            case '남한산성입구': subwayname = '남한산성입구(성남법원, 검찰청)'; break;
            case '신촌': subwayname = '신촌(경의.중앙선)'; break;
        }
        subwayinfo.post('/api/subway', null, {params: {name: subwayname}})
        .then(function(res){
            console.log(res.data);    
            var i= 0, j = 0;
            var tmp1 = [];
            var tmp2 = [];
            {(res.data).map((obj)=>{
                if((buildingDetailInfo.name).includes(obj.subwayId)){
                    if(obj.updnLine === "상행" && i<2){
                        tmp1.push(obj);
                        // SetSubwayUp(subwayUp => [...subwayUp, obj]);
                        i++;
                    }
                    else if(obj.updnLine === "하행" && j<2){
                        tmp2.push(obj);
                        // SetSubwayDown(subwayDown => [...subwayDown, obj]);
                        j++;
                    }
                    if(obj.updnLine === "외선" && i<2){
                        tmp1.push(obj);
                        // SetSubwayUp(subwayUp => [...subwayUp, obj]);
                        i++;
                    }
                    else if(obj.updnLine === "내선" && j<2){
                        tmp2.push(obj);
                        // SetSubwayDown(subwayDown => [...subwayDown, obj]);
                        j++;
                    }
                };
            })}
            SetSubwayUp(tmp1);
            SetSubwayDown(tmp2);
        }).catch(function(err){
            console.log("지하철 정보 못받아옴");
        })
        
    };

    const findWheelchair = (subwayname) => {        //휠체어 리프트
        const wheelchairlift = axios.create({
            baseURL: baseurl
        })
        wheelchairlift.post('/api/subway/wheelchair', null, {params: {subwayName: subwayname}})
        .then(function(res){
            console.log(res.data);
            if(res.data){
                setIsWheelChairLift(true);
                setWCLocation(res.data);
            }else{
                setIsWheelChairLift(false);
            }
        }).catch(function(err){
            console.log("휠체어리프트 정보 못받아옴");
        })
    }
    const findToilet = (subwayname) => {            //장애인 화장실
        const toilet = axios.create({
            baseURL: baseurl
        })
        toilet.post('/api/subway/toilet', null, {params: {subwayName: subwayname}})
        .then(function(res){
            console.log(res.data);
            if(res.data){
                setIsToilet(true);
                setToiletLocation(res.data);
            }else{
                setIsToilet(false);
            }     
        }).catch(function(err){
            console.log("장애인 화장실 정보 못받아옴");
        })

    };

    const handleWCButton = () => {  //화장실 아이콘 버튼 클릭
        console.log("클릭했구려");
        
        if(isToiletClick){
            setIsToiletClick(false);
        }else{
            setIsToiletClick(true);
        }
    };
    const handleWLButton = () => {
        if(iswheelchairliftClick){
            setIsWheelChairLiftClick(false);
        }else{
            setIsWheelChairLiftClick(true);
        }
    }
    const handleCloseInfo = (e) => {
        if(el.current){
            console.log(el);
            console.log(el.current.contains(e.target));
            console.log(isToiletClick);
        }
        if(isToiletClick && (!el.current || !el.current.contains(e.target))){
            console.log("다른곳 클릭");
            console.log(el);
            
        }
    };

    
    useEffect(()=>{
        
        window.addEventListener('touchstart', handleCloseInfo);
        return()=>{
            window.removeEventListener('touchstart', handleCloseInfo);
        }
    }, []);

    useEffect(()=>{
        var tmp;
        console.log(props);
        console.log(props.props.name);
        if((props.props.upperBizName) == '교통편의' && (props.props.name).includes('역')){
        var sname1 = (props.props.name).split(/[\[\]'역']/);
        console.log(sname1);
        console.log(sname);
        if(sname1[2] === '지하철경의중앙선'){
            tmp = '경의중앙선';
        }else if(sname1[2].includes('부산지하철')){
            tmp = sname1[2].split('부산지하철')[1];
        }else{
            tmp = sname1[2];
        }
        var subwayname = sname1[0];
        switch (subwayname) {
            case '서울': subwayname = '서울역'; break;
            case '대구': subwayname = '대구역'; break;
            case '동대구': subwayname = '동대구역'; break;
            case '광주송정': subwayname = '광주송정역'; break;
        };
        var sname = tmp + " " + subwayname;
        console.log(sname);
        findToilet(sname);
        findWheelchair(sname);
        }
        setBuildingDetailInfo(props.props);
        SetSubway(props.subway);
        if(props.props.elevatorState === '운행중'){
            setIsElevator(true);
        }else{
            setIsElevator(false);
        }

        // if(!one && buildingDetailInfo && subway){
        //     setOne(true);
        //     searchsubwaytime();
        // }

        if(!one && buildingDetailInfo && subway){       //이거 뭐더라..?
            console.log(buildingDetailInfo);
            setOne(true);
            searchsubwaytime();
            // var i= 0, j = 0;
            // {subway.map((obj)=>{
            //     if((buildingDetailInfo.name).includes(obj.subwayId)){
            //         if(obj.updnLine === "상행" && i<2){
            //             SetSubwayUp(subwayUp => [...subwayUp, obj]);
            //             i++;
            //         }
            //         else if(obj.updnLine === "하행" && j<2){
            //             SetSubwayDown(subwayDown => [...subwayDown, obj]);
            //             j++
            //         }
            //     };
            // })}
        }
    }, [props, buildingDetailInfo, subway])

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


    if(buildingDetailInfo){
        if(subway){
            return(
                <div>
                    <Modal open={modalOpen} close={closeModal} url={url} line={line}>
                        팝업창임
                    </Modal>
                <footer>
                    {toiletLocation && isToiletClick && 
                        <Swiper style={swiperStyle}>
                        <div ref={el} style={{position: "absolute", backgroundColor: "white", height: "20%", top: "-21%", right: "0px"}}>
                            {/* <Swiper > */}
                            {toiletLocation.map((obj, index)=>{
                                console.log(obj.dtlLoc);
                                return(
                                    <SwiperSlide>
                                    <div style={{boxShadow: "0px 0px 2px 1px gray", borderRadius: "3px"}}>
                                        <text style={{fontFamily: 'Nanum Gothic Coding', fontSize: "1rem"}}>{obj.dtlLoc}</text>
                                    </div>  
                                    </SwiperSlide>
                                );
                            })}
                            {/* </Swiper> */}
                        </div></Swiper>}
                        {wheelchairLocation && iswheelchairliftClick && 
                        <Swiper style={swiperStyle}>
                        <div style={{position: "absolute", backgroundColor: "white", height: "20%", top: "-21%", right: "0px"}}>
                            {/* <Swiper > */}
                            {wheelchairLocation.map((obj, index)=>{
                                console.log(obj.dtlLoc);
                                return(
                                    <SwiperSlide>
                                    <div style={{boxShadow: "0px 0px 2px 1px gray", borderRadius: "3px"}}>
                                        <text style={{fontFamily: 'Nanum Gothic Coding', fontSize: "1rem"}}>{obj.dtlLoc}</text>
                                    </div>  
                                    </SwiperSlide>
                                );
                            })}
                            {/* </Swiper> */}
                        </div></Swiper>}
                <div id='Info' className="detailInfo" style={{height: "100%"}}>
                        <div id='headInfo' className="row" style={{position: "relative", paddingTop: "10px"}}>
                            <div className="col-7" style={{textAlign: "left", paddingLeft: "5%", paddingRight: "0px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden",}}>
                                <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.bizname} 
                            </div><div className="col-5" style={{paddingLeft: "0px"}}>
                                <div id="subwaymapbutton" className="" style={{paddingRight: "5%"}}>
                                    
                                    {iselevator && <img src={elevator} style={{width: "24px", height: "24px", marginRight: "7px", float: "left"}}></img>}
                                    
                                    <button id='arrowbutton' onClick={searchsubwaytime} style={{backgroundColor: "white", border: "none", padding: "0px", width: "26px", height: "26px", float: "right"}}>
                                        <img id='arrowrefresh' src={arrowsrefresh} style={{padding: "0px", left : "-1px", top: "-2px"}}></img>
                                    </button>
                                    <div style={{top: "-2px"}}>
                                    <i class="bi bi-map" onClick={openMadal} style={{float: "right", paddingRight: "10px", fontSize: "20px", height: "24px"}}></i></div>
                                    {isToilet && <img id="toileticon" src={toileticon} onClick={handleWCButton} style={{width: "25px", height: "25px", top: "-3px", marginRight: "4px",}}></img>}
                                    {iswheelchairlift && <img src={lift} onClick={handleWLButton} style={{width: "25px", height: "25px", top: "-2px", marginRight: "4px"}}></img>}
                                </div>
                            </div>  
                        </div>
                        {/* <div id='elivator' style={styleelivator}>
                            {buildingDetailInfo.elivator}</div> */}
                        <div id='realtime' style={{position: "relative", paddingTop: "5px"}}>
                            <div className="row" style={{height: "100%"}}>
        {/*상행 */}             <div className="col-6" style={{textAlign: "left", fontSize: "0.9em", paddingLeft: "6%", paddingRight: "1%"}}>
                                {subwayUp && subwayUp.map((obj, index)=>{
                                    var arv = '';
                                    const name =(obj.trainLineNm).split('-');
                                    if((obj.arvlMsg2).includes("도착")){                        
                                        if(obj.arvlMsg3 == (obj.arvlMsg2).split(' 도착')[0]){
                                            arv = '도착';
                                        }else{
                                            arv = obj.arvlMsg2;
                                        }
                                    }else if((obj.arvlMsg2).includes("진입")){
                                        arv = obj.arvlMsg2;
                                    }else if((obj.arvlMsg2).includes("전역 출발")){
                                        arv = "전역 출발";
                                    }else{  
                                        var tmp;                
                                        if((obj.arvlMsg2).includes('(')){
                                            tmp = (obj.arvlMsg2).split('(')[0];
                                        }else{
                                            tmp = (obj.arvlMsg2).split('역')[0];
                                        }
                                        if(tmp.includes('[')){
                                            arv = tmp.split(/[\[\]'역']/);
                                        }else{
                                            arv = tmp;
                                        }
                                    }
                                    if(arv.includes('초 후')){
                                        arv = (obj.arvlMsg2).split('후')[0];
                                    }
                                   return(
                                    <div className="row" style={{textAlign: "left",}}>
                                        <div className="col-6" style={{padding: "0px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden",}}>
                                            <text style={{}}><h8>{name[0]}</h8></text>
                                        </div>
                                        <div className="col-6" style={{textAlign: "left", padding: "0px", color: "red", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden",}}>
                                            <h8>{arv}</h8>
                                        </div>
                                    </div>
                                   );
                                })}
                            </div>
                            
       {/*하행 */}          <div className="col-6" style={{ textAlign: "left", fontSize: "0.9em", paddingLeft: "1%", paddingRight: "6%"}}>
                                {subwayDown && subwayDown.map((obj, index)=>{
                                    var arv = '';
                                    const name =(obj.trainLineNm).split('-');
                                    if((obj.arvlMsg2).includes("도착")){
                                        if(obj.arvlMsg3 == (obj.arvlMsg2).split(' 도착')[0]){
                                            arv = '도착';
                                        }else{
                                            arv = obj.arvlMsg2;
                                        }    
                                    }else if((obj.arvlMsg2).includes("진입")){
                                        arv = obj.arvlMsg2;
                                    }else if((obj.arvlMsg2).includes("전역 출발")){
                                        arv = "전역 출발";
                                    }else{
                                        var tmp;
                                        if((obj.arvlMsg2).includes('(')){
                                            tmp = (obj.arvlMsg2).split('(')[0];
                                        }else{
                                            tmp = (obj.arvlMsg2).split('역')[0];
                                        }
                                        if(tmp.includes('[')){
                                            arv = tmp.split(/[\[\]'역']/);
                                        }else{
                                            arv = tmp;
                                        }
                                    }
                                    if(arv.includes('초 후')){
                                        arv = (obj.arvlMsg2).split('후')[0];
                                    }
                                   return(
                                    <div className="row" style={{textAlign: "left",}}>
                                        <div className="col-6" style={{padding: "0px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden",}}>
                                        <h8>{name[0]}</h8>
                                        </div>
                                        <div className="col-6" style={{textAlign: "left", padding: "0px", color: "red", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden",}}>
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
                <div style={{padding: "2%", paddingTop: "10px", height: "100%"}}>
                        <div style={{width: "100%", textAlign: "-webkit-left"}}>
                            <b>{buildingDetailInfo.name}</b> {buildingDetailInfo.upperBizName} {iselevator && <img src={elevator} style={{width: "25px", height: "25px", top: "-3px"}}></img>}
                            {iswheelchairlift && <img src={lift} style={{width: "25px", height: "25px", top: "-3px"}}></img>}
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
                            <button style={{position: "absolute", width: "100%", backgroundColor: "white", borderRadius: "5px", left: "0px", bottom: "-60px"}} onClick={handlecheckButton}>확인</button>
                        </div>
                        }
                </div>
                </footer>
            );
        }
    }
}


export default BuildingDetailInfo; 