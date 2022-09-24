import React from 'react';
import styles from '../css/SideBar.css'
import { useState, useEffect, useRef } from 'react';
import traffic from "../images/trafficlight.png";
import walk from "../images/walkp.png";
import right from "../images/turnright.png";
import left from "../images/turnleft.png";
import point from "../images/placeholder.png";
// import styled from "styled-components";


const SideBar =({width=330, children, totalDistance, totalTime, start, end})=>{
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const [boxShadow, setBoxShadow] = useState();
    const side = useRef();
    // const [img, setImg] = useState();

    
    const [distance, setDistance] = useState();
    const [time, setTime] = useState();
    var Img;

    const toggleMenu = () => {
        if(xPosition > 0){
            setX(0);
            setBoxShadow('1px 3px 15px 1px gray');
            setOpen(true);
        }else{
            setX(width);
            setBoxShadow('none');
            setOpen(false);
        }
    }
    const handleClose = async e => {
        console.log("클릭");
        console.log(isOpen);
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(width); 
            await setOpen(false);
        }
    }

    
    // const Nav = styled.nav`
    //     dispaly: flex;
    //     overflow: auto;
    //     height: 45px;
    //     &::-webkit-scrollbar{
    //         width: 8px;
    //         height: 8px;
    //         border-radius: 6px;
    //         background: rgba(255,255,255,0.4);
    //     }
    //     &::-webkit-scrollbar-thumb {
    //         background: rgba(0,0,0, 0.3);
    //         border-radius: 6px;
    //     }
    //     `;

    useEffect(()=>{
        console.log(start);
        console.log(end);
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        };
    })

    useEffect(()=>{
        console.log(totalDistance);
        console.log(totalTime);
        var n;
        if(totalDistance > 1000){                   //총 거리
            totalDistance = totalDistance / 1000;
            console.log(totalDistance); 
            setDistance(totalDistance+"km");       
        }else{
            setDistance(totalDistance+"m");
        }
        totalTime = totalTime / 60;
        if(totalTime > 60){                         //총 시간
            n = parseInt(totalTime%60);
            totalTime = parseInt(totalTime / 60);
            console.log(n);
            console.log(totalTime);
            setTime("약 "+totalTime+"시간 "+n+"분");
        }else{
            totalTime = parseInt(totalTime);
            setTime("약 "+totalTime+"분")
        }
    }, [children])

    return(
        <div className="sidebarmain">
            
            <div ref={side}  className="innersidbar" style={{ width: `${width}px`, height: window.innerHeight,  transform: `translatex(${-xPosition}px)`, backgroundColor: "yellowgreen", boxShadow: boxShadow}}>
                <button  onClick={() => toggleMenu()}
                className="sidebarbutton" style={{backgroundColor:"yellowgreen", fontSize: "smaller"}}>
                도보 경로
                </button>
                <div style={{width: "100%", height: "10%", top: "-70px", textAlign: "left", }}>
                    <div style={{top: "-10px"}}>
                    <text>출발지: {start.name}</text> <br></br>
                    <i class="bi bi-arrow-down-up"></i> <br></br>
                    <text>도착지: {end.name}</text>
                    </div>
                    <div style={{position: "relative",textAlign: "left", marginLeft: "15px"}}>       
                    <text style={{fontSize: "20px", fontWeight: "1000"}}> {time} </text>
                    <div class="vr" style={{fontWeight: "100"}}></div>
                    <text style={{fontSize: "18px", fontWeight: "600"}}>  {distance}</text>
                    </div>
                </div>
                <div className="sidebarcontent" style={{position: "relative", height: "85%", overflowY: "scroll", top: "-55px"}}>
                    <div className='list-group' style={{overflowY: "scroll"}}>
                    {children && children.map((obj, index)=>{
                        var Img;
                        if (obj.includes("횡단보도")){
                            Img=traffic;
                            
                        }
                        else if (obj.includes("우회전")){
                            Img=right;
                        }
                        else if (obj.includes("좌회전")){
                            Img=left;
                        }
                        else if (obj.includes("도착")){
                            Img=point;
                        }
                        else{
                            Img=walk; 
                        }               
                        return(
                            <li className='list-group-item'>
                                <img src={Img} style={{float:"left",width:"23px", height: "25px", marginRight:"10px"}}/>{obj}
                            </li>
                            
                        );
                    })}  
                    </div>  
                </div> 
            </div>
      </div>
    );
}

export default SideBar; 
