import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';

import stair from "../images/stairs.png"
import charging from "../images/charging_station_icon.png"

const SideBar =({width=200, children, onCheck, onCheckWheel})=>{
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const [boxShadow, setBoxShadow] = useState();
    const [chevron, setChevron] = useState("bi bi-chevron-double-left");
    const side = useRef();

    const toggleMenu = () => {
        if(xPosition < 0){
            setChevron("bi bi-chevron-double-right");
            setX(0);
            setBoxShadow('1px 3px 15px 1px gray');
            setOpen(true);
        }else{
            setChevron("bi bi-chevron-double-left");
            setX(-width);
            setBoxShadow('none');
            setOpen(false);
        }
    }
    const handleClose = async e => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(-width); 
            await setOpen(false);
        }
    }
    const handleCheckBox = (id) => {
        console.log(id);
        console.log("머임");
    }

    useEffect(()=>{
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        };
    })

    useEffect(()=>{
    }, [children])


    return(
        <div className="sidebarmain" style={{zIndex: "3"}}>
            <div ref={side}  className="innersidbare" style={{ width: `${width}px`, height: "100px", top:"60%", right: "0px", transform: `translatex(${-xPosition}px)`, boxShadow: boxShadow, zIndex: "3"}}>
                <button  onClick={() => toggleMenu()}
                className="sidebarbuttone" style={{left: "-120px", zIndex: "0"}} >
                <i class={chevron} style={{border: ""}}></i>
                </button>
                <div className="" style={{position: "relative", top: "-95px", height: "100%", zIndex: "3"}}>
                    <div className='list-group' style={{}}>

                        <div className="row">
                            <div className="" style={{marginTop: "7%",}}>
                                <label for="chk">
                                    <input type="checkbox" id="chk" onChange={e => {onCheck(e.target.checked, e.target.value)}} style={{width: "35px", float: "left", marginTop: "10px", marginLeft: "10px"}}></input>
                                    <i class="circle"></i>
                                    <img src={stair} style={{width: "17px", height: "17px", top: "-2px", marginLeft: "5px", marginRight: "5px"}}></img>
                                    <text style={{fontSize:"17px"}}>계단</text>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="" style={{marginTop: "1%",}}>
                                <label for="chk1">
                                    <input type="checkbox" id="chk1" onChange={e => {onCheckWheel(e.target.checked, e.target.value)}} style={{width: "35px", float: "left", marginTop: "10px", marginLeft: "10px"}}></input>
                                    <i class="circle1"></i>
                                    <img src={charging} style={{width: "26px", height: "26px", top: "-2px", marginLeft: "5px", marginRight: "5px"}}></img>
                                    <text style={{fontSize:"17px"}}>휠체어 급속충전기</text>
                                </label>
                            </div>
                        </div>

                    </div>  
                </div> 
            </div>
      </div>
    );
}

export default SideBar; 
