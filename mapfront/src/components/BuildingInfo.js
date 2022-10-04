// `import "../css/BuildingInfo.css";`
import React from 'react';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';


import elevator from '../images/elevator.png'

const baseurl = 'http://localhost:9000/'


const BuildingInfo = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectSubway, SetSelectSubway] = useState();
    const [iselevator, setIsElevator] = useState();
    const [fun, setFun] = useState();
    const [distance, setDistance] = useState(); // 내위치와 건물 사이의 거리
    

    useEffect(()=>{    
        console.log(props);  
        var mylat = props.mylocation.latitude;
        var mylng = props.mylocation.longitude;
        var lat = props.obj.latitude;
        var lng = props.obj.longitude;

        function deg2rad(deg){
            return deg * (Math.PI/180);
        }

        var r = 6371;
        var dLat = deg2rad(lat-mylat);
        var dLon = deg2rad(lng-mylng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(mylat)) * Math.cos(deg2rad(lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = r* c;

        var dis = Math.round(d*1000);

        if(dis > 1000){
            dis = d.toFixed(2);
            setDistance(dis+'km');
        }else{
            setDistance(Math.round(d*1000)+'m');
        }

        if(props.obj.elevatorState === '운행중'){
            setIsElevator(true);
        }else{
            setIsElevator(false);
        }
        if(location.pathname == '/find-search'){
            setFun(true);
        }else if(location.pathname == '/search'){
            setFun(false);
        }
    }, [props])

    const searchsubwayinfo = (subwaynm) => {
        const subwayinfo = axios.create({
            baseURL: baseurl
        })
        subwayinfo.post('/api/subway', null, {params: {name: subwaynm}})
        .then(function(res){
            console.log(res.data);
            SetSelectSubway(res.data);
  
            navigate("/location-map", {
                state: {
                    props: props,
                    subway: res.data,
                }
            });
            window.location.href = "/location-map";
        }).catch(function(err){
            console.log("지하철 정보 못받아옴");
        })
    };

    const handleClick = (evt) => {
        console.log(props);
        if(location.pathname == '/search'){
            if(props.obj.upperBizName === "교통편의"){
                var subwayname = ((props.obj.name).split('역'))[0];
                console.log(subwayname);
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
                searchsubwayinfo(subwayname);       
            }
            else{
                navigate("/location-map", {
                    state: {
                        props: props,
                        subway: null,
                    },
            });
            window.location.href = "/location-map";
            }
        }else if(location.pathname == '/find-search') {
            if(evt.target.className !== 'bi bi-map'){
            var start = null, end = null;
            if(props.id == 'start' && props.endBuilding){
                console.log("이건 진짜 다입력한거임 ");
                start = props;
                end = props.endBuilding;
            }else if(props.id == 'end' && props.startBuilding){
                console.log("이것도 다 입력한거임");
                start = props.startBuilding;
                end = props;
            }else if(props.id == 'start'){
                start = props;
            }else if(props.id == 'end'){
                end = props;
            }
            navigate('/find-way', {
                state: {
                    props: props,
                    mylocation: props.mylocation,
                    id: props.id,
                    startBuilding: start,
                    endBuilding: end,
                }
            });
            window.location.href = "/find-way";
        }
    }
    };

    const handleButtonClick = () => {
        console.log(props);
        if(props.obj.upperBizName === "교통편의"){
            var subwayname = (props.obj.name).split('역');
            console.log(subwayname[0]);
            searchsubwayinfo(subwayname[0]);       
        }
        else{
            var start = null, end = null;
            if(props.id == 'start' && props.endBuilding){
                console.log("이건 진짜 다입력한거임 ");
                start = props;
                end = props.endBuilding;
            }else if(props.id == 'end' && props.startBuilding){
                console.log("이것도 다 입력한거임");
                start = props.startBuilding;
                end = props;
            }else if(props.id == 'start'){
                start = props;
            }else if(props.id == 'end'){
                end = props;
            }
            navigate("/location-map", {
                state: {
                    props: props,
                    subway: null,    
                    id: props.id,
                    startBuilding: start,
                    endBuilding: end,           
                },
            });
            window.location.href = "/location-map";
        }
    }

    return (
        <li className="list-group-item" onClick={handleClick} style={{}}>
            <div className="row">
            <div className="col-9" style={{ textAlign: "left", paddingRight: "0px" }}>
                <div style={{ textAlign: "left", display: "flex" }}>
                    <div className="fw-bold" style={{ textAlign: "left", display: "flex", }}>
                            {props.name}
                    </div>
                </div>
                <div style={{ textAlign: "-webkit-left" }}>
                        {distance}
                </div>
                {props.address}
            </div>
            <div className= "col-3"style= {{alignSelf: "center", padding: "0px", paddingRight: "10px"}}>
                {iselevator && 
                <img src={elevator} style={{width: "30px", height: "30px"}}></img>}         
            {fun &&
                <button type="button" class="btn btn-outline-secondary btn-circle" onClick={handleButtonClick} style={{borderRadius: "100%", float: "right", }}>
                <i class="bi bi-map"></i></button>  
            }
            </div>
            </div>
        </li>
    );
};

export default BuildingInfo;
