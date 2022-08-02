import React from 'react';
import SideMenu from "./SideMenu"
import '../css/SideBar.css'


const SideMenuData =(props)=>{

    return(
        <body>
            <div>
                <input type="checkbox" class="menuBtn"id="menuBtn"/>
                <label for="menuBtn" class="labelBtn" onclick="">선택</label>

                <ul class="left-side-bar">
                <SideMenu></SideMenu>
                </ul>
            </div>
        </body>
            );
}
            export default SideMenuData; 
