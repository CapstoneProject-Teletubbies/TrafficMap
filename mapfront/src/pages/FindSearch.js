import React, {useState, useEffect } from 'react';
import '../css/search.css';
import '../css/input.css'
import SearchBar from "../components/SearchBar";
import BuildingInfo from '../components/BuildingInfo';
import BusInfo from '../components/BusInfo';
import BusStopInfo from '../components/BusStopInfo';
import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";


 function FindSearch() {
    const [text, setText] = useState(' ');
    const [buildingList, setBuildingList] = useState([]);
    const [busList, setBusList] = useState([]);
    const [busStopList, setBusStopList] = useState([]);
    const [mylocation, setMylocation] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const [startName, setStartName] = useState();
    const [endName, setEndName] = useState();

    const keyword = location.state.keyword;
    const onChange = (e) => {
        setText(e.target.value);
    }

    useEffect(()=>{
        setStartName(location.state);
        setBusList(location.state.bus);
        setBuildingList(location.state.building);
        setBusStopList(location.state.busstop);
        
        setMylocation(location.state.mylocation);
    })

    const handlebackButton = () => {            //뒤로가기 버튼 클릭
        window.location.href = "/";
    }


    return (
        <div className="searchjs">
            <div
                style={{
                    justifyContent: "center",
                    display: "flex",
                    padding: "10px 0px",
                }}>
                <nav
                    class="navbar navbar-default"
                    style={{
                        width: "95%",
                        display: "flex",
                        padding: "0px 10px",
                        border: "1px solid",
                        borderRadius: "20px",
                    }}
                >
                    <i
                        class="bi bi-arrow-left-circle"
                        style={{ fontSize: "2rem" }}
                        onClick={handlebackButton}
                    ></i>

                    <div className="" style={{ flex: 1, textAlign: "left" }}>
                        <SearchBar keyword={keyword} onChange={onChange} placeholder={keyword} location={mylocation} id={location.state.id}/>
                    </div>

                </nav>
            </div>

            <div className="searchlist" style={{ overflowY: "scroll", paddingBottom: "15px"}}>
                {}
                <ol className="list-group">
                    
                    {busStopList && busStopList.map((obj, index)=><BusStopInfo obj={obj} name={obj.bstopnm} id={location.state.id} mylocation={mylocation} startBuilding={startName.startBuilding} endBuilding={startName.endBuilding} address='버스정류장' />)}
                    {buildingList &&
                        buildingList.map((obj, index) => {
                            if(obj.upperBizName === "교통편의"){
                                if(!(obj.name).includes("출구") && !(obj.name).includes("방향") && !(obj.name).includes("방면")
                                    && !(obj.name).includes("버스정류장")){
                                    return(
                                        <BuildingInfo
                                        obj={obj}
                                        name={obj.name}
                                        address={obj.fullAddressRoad}
                                        id={location.state.id}
                                        mylocation={mylocation}
                                        startBuilding={startName.startBuilding}
                                        endBuilding={startName.endBuilding}
                                    ></BuildingInfo>);
                                }
                            }
                            else{
                                return(
                                    <BuildingInfo
                                        obj={obj}
                                        name={obj.name}
                                        address={obj.fullAddressRoad}
                                        id={location.state.id}
                                        mylocation={mylocation}
                                        startBuilding={startName.startBuilding}
                                        endBuilding={startName.endBuilding}
                                    ></BuildingInfo>
                                    );
                            }
                            
                    })}
                </ol>
            </div>
        </div>
    );
 }
 export default FindSearch;