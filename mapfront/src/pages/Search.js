import React, {useState, useEffect } from 'react';
import '../css/search.css';
import '../css/input.css'
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import BuildingInfo from '../components/BuildingInfo';
import BusInfo from '../components/BusInfo';
import BusStopInfo from '../components/BusStopInfo';
import {useLocation} from 'react-router';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import map from "../images/map.png";
import back from "../images/backicon.png"
import axios from "axios";

 function Search() {
    const [text, setText] = useState(' ');
    const [buildingList, setBuildingList] = useState([]);
    const [busList, setBusList] = useState([]);
    const [busStopList, setBusStopList] = useState([]);
    const [mylocation, setMylocation] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const keyword = location.state.keyword;
    const onChange = (e) => {
        setText(e.target.value);
    }

    useEffect(()=>{
        setBusList(location.state.bus);
        setBuildingList(location.state.building);
        setBusStopList(location.state.busstop);
        
        setMylocation(location.state.mylocation);
    })

    const handlebackButton = () => {            //뒤로가기 버튼 클릭
        window.location.href = "/";
    }
    const handlemapButton = () => {             //지도 버튼 클릭
        navigate('/resultsearch', { state: {
            building: buildingList,
            keyword: keyword,
        }});
        window.location.href = "/resultsearch";  
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
                        <SearchBar keyword={keyword} onChange={onChange} placeholder={keyword} location={mylocation} />
                    </div>

                    <div className="">
                        {buildingList && (
                            <i
                                class="bi bi-pin-map-fill"
                                style={{ fontSize: "2rem" }}
                                onClick={handlemapButton}
                            ></i>
                        )}{" "}
                        {/*버스만 받아올때는 안뜸 */}
                    </div>
                </nav>
            </div>

            <div className="searchlist" style={{ overflowY: "scroll", paddingBottom: "15px"}}>
                {}
                <ol className="list-group">
                    {busList && busList.map((obj, index) => <BusInfo obj={obj}></BusInfo>)}
                    {busStopList && busStopList.map((obj, index)=><BusStopInfo obj={obj} name={obj.bstopnm} address='버스정류장' />)}
                    {buildingList &&
                        buildingList.map((obj, index) => {
                            if(obj.upperBizName === "교통편의"){
                                if(!(obj.name).includes("출구") && !(obj.name).includes("방향") && !(obj.name).includes("방면")
                                    && !(obj.name).includes("버스정류장")){
                                    return(<BuildingInfo
                                        obj={obj}
                                        name={obj.name}
                                        address={obj.fullAddressRoad}
                                        mylocation={mylocation}
                                    ></BuildingInfo>);
                                }
                            }
                            else{
                                return(
                                    <BuildingInfo
                                        obj={obj}
                                        name={obj.name}
                                        address={obj.fullAddressRoad}
                                        mylocation={mylocation}
                                    ></BuildingInfo>
                                    );
                            }
                            
                    })}
                </ol>
            </div>
        </div>
    );
 }
 export default Search;