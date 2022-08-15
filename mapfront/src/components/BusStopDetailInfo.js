import React from 'react';
import $ from 'jquery';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';



const BusStopDetailInfo = (props)=>{
    const [startXY, setStartXY] = useState();
    const [top, setTop] = useState();
    const [bottom, setBottom] = useState(13);

    const [bustop, setBustop] = useState();

    var bustopinfobar;

    useEffect(()=>{
        setBustop(props.obj);
        setTimeout((bustopinfobar = document.getElementById('bustopinfobar')), 100);
        var height = -(bustopinfobar.offsetHeight*0.9);
        setTop(height);
    }, [])


    const handleDragStart = (evt) => {          //드래그 시작 이벤트
        setStartXY(evt);    
    }

    const handleDrag = (evt) => {               //드래그 중 이벤트
        console.log("드래그중~")
    }

    const handleDragStop = (evt) => {                           //드래그 끝났을 때 이벤트
        var element = document.getElementById('bustopinfobar');
        var posy;
        posy = startXY.y - evt.y ;
        if(posy > 0){
            posy = evt.lastY;
            var height = (element.offsetHeight)*0.87 + evt.lastY;
            $('#bustopinfobar').stop(true).animate({bottom: posy}, 300);
            setTop(evt.lastY);
            setBottom(height);
        }
        else if(posy < 0){   
            var height = -(element.offsetHeight)*0.87 + evt.lastY;
            setTop(height);
            setBottom(evt.lastY + 13);
            $('#bustopinfobar').stop(true).animate({bottom: height}, 300);
        }
    }

 
    return(
        <Draggable onStart={(e, data) => handleDragStart(data)} onDrag={(e, data) => handleDrag(data)} onStop={(e, data) => handleDragStop(data)} axis='y' bounds={{top: top, bottom: bottom}}>
        <div id="bustopinfobar" style={{position: "fixed", backgroundColor: "white", width: "100%", height: "100%", bottom: "-87%", borderRadius: "7px"}}>
                {bustop &&
                    <div style={{position: "relative"}}>
                        <div style={{height: "13%"}}>
                            <div style={{fontSize: "1.2rem", float: "left", padding: "10px"}}>{bustop.bstopnm}</div>
                        </div>

                    </div>
                }
        </div>
        </Draggable>
    );
}

export default BusStopDetailInfo;
