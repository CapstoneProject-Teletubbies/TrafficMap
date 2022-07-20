import React, { Component } from "react";
import '../css/SideMenu.css';
const SideMenu =(props)=>{
    const formData = [
        {id:1, name:"엘리베이터 표시"},
        {id:2, name:"계단 표시"}
    ];
    return (
        <body>
            <ul>
                <div>
            <input type="checkbox" class="menuBtn"id="menuBtn"/>
            <label for="menuBtn" class="labelBtn" onclick="">돌아가기</label>
            </div>
                {formData.map((item) => (
                        <label key={item.id} className="innerBox">
                            <input type="checkbox" value={item.name} />

                        <div>

                            {item.name}
                        </div>
                        </label>))}
            </ul>
    </body>
)
    }
 export default SideMenu;