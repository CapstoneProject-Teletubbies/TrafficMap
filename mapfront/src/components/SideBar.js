import React from 'react';
import styles from '../css/SideBar.css'
import { useState, useEffect, useRef } from 'react';
import traffic from "../images/trafficlight.png";
import walk from "../images/walkp.png";
import right from "../images/turnright.png";
import left from "../images/turnleft.png";


const SideBar =({width=350, children, totalDistance, totalTime})=>{
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

    useEffect(()=>{
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
                className="sidebarbutton" style={{backgroundColor:"yellowgreen"}}>
                도보 경로
                </button>
                <div style={{width: "100%", height: "10%", top: "-70px", textAlign: "left", }}>
                    <div style={{position: "relative",textAlign: "left", marginLeft: "15px", top: "35%"}}>       
                    <text style={{fontSize: "20px", fontWeight: "1000"}}> {time} </text>
                    <div class="vr" style={{fontWeight: "100"}}></div>
                    <text style={{fontSize: "18px", fontWeight: "600"}}>  {distance}</text>
                    </div>
                </div>
                <div className="sidebarcontent" style={{position: "relative", height: "85%", overflowY: "scroll", top: "-70px"}}>
                    <div className='list-group' style={{overflowY: "scroll"}}>
                    {children && children.map((obj, index)=>{
                        var Img;
                        if (obj.includes("횡단보도")){
                            // setImg(traffic);
                            Img=traffic;
                            
                        }
                        else if (obj.includes("우회전")){
                            // setImg(right);
                            Img=right;
                        }
                        else if (obj.includes("좌회전")){
                            // setImg(left);
                            Img=left;
                        }
                        else{
                            // setImg(walk);
                            Img=walk; 
                        }

                        
                        return(
                            <li className='list-group-item'>
                                <img src={Img} style={{width:"30px", height: "30px" }}/>{obj}
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
