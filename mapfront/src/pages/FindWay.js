import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

import SearchBar from '../components/SearchBar';

function FindWay(){

    const location = useLocation();

    const mylocation = location.state.mylocation;

    console.log(mylocation);

    const onChange={}

    const searchbarstyle={
        border: "1px solid",
        
    }

    
    return(
        <div style={{position: "fixed", width: "100%", height: "100%", backgroundColor: "#D5D5D5"}}>
            <div id="findwayheader" style={{position: "relative", width: "100%", height: "13%", backgroundColor: "white", boxShadow: "1px 1px 10px 0.8px gray"}}>
                <SearchBar style={searchbarstyle} placeholder={'출발지'} location={mylocation}></SearchBar>
            </div>
            <div>

            </div>
        </div>     
    );
}
export default FindWay;