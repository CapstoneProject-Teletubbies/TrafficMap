import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';

import stair from "../images/stairs.png"

const SideBar =({width=200, children, onCheck})=>{
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
            <div ref={side}  className="innersidbare" style={{ width: `${width}px`, height: "100px", top:"60%", right: "0px", transform: `translatex(${-xPosition}px)`, boxShadow: boxShadow}}>
                <button  onClick={() => toggleMenu()}
                className="sidebarbuttone" style={{left: "-120px", zIndex: "0"}} >
                <i class={chevron} style={{border: ""}}></i>
                </button>
                <div className="" style={{position: "relative", top: "-95px", height: "100%", zIndex: "10"}}>
                    <div className='list-group' style={{}}>

                        <div className="row">
                            <div className="" style={{marginTop: "12%",}}>
                                <label for="chk">
                                    <input type="checkbox" id="chk" onChange={e => {onCheck(e.target.checked, e.target.value)}} style={{width: "35px", float: "left", marginTop: "10px", marginLeft: "10px"}}></input>
                                    <i class="circle"></i>
                                    <img src={stair} style={{width: "17px", height: "17px", top: "-2px", marginLeft: "5px", marginRight: "5px"}}></img>
                                    <text style={{fontSize:"17px"}}>계단</text>
                                </label>
                            </div>
                            {/* <div className="col-9" style={{alignSelf: "center", marginTop: "10px"}}>
                                <img src={obj.src} style={{width: "20px", height: "20px"}}></img>
                                {obj.data}
                            </div> */}
                        </div>

                    </div>  
                </div> 
            </div>
      </div>
    );
}

export default SideBar; 
