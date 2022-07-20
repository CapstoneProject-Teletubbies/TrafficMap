import React, {useState, useEffect } from 'react';
import '../css/search.css';
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import {useLocation} from 'react-router';


function Building(){
    return(
        <div className="buildingInfo">
            <h3>name</h3> bizName
            <div>address</div>
            <button >출발</button><button >도착</button>
        </div>
    )
}

export default Building;
