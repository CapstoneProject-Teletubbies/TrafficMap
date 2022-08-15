import React from 'react';
import $ from 'jquery';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



const BusStopDetailInfo = (props)=>{
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);

    const [swipeUp, setSwipeUp] = useState();

    var xDown = null;
    var yDown = null;

    var bustopinfobar = document.getElementById('bustopinfobar');
    

    function getTouches(evt){
        return evt.touches
    }    

    function handleTouchStart(evt){
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt){                          //스와이프 감지
        if( !xDown || !yDown){
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if( Math.abs( xDiff ) < Math.abs( yDiff ) ){
            if( yDiff > 0 ){ //위로 스와이프
                setSwipeUp(true);
           
            } else{         //아래로 스와이프
                $('#bustopinfobar').stop(true).animate({bottom: "-400px"}, 300);
            } 
        }

        xDown = null;
        yDown = null;
    }

    useEffect(()=>{
        if(swipeUp){
            console.log("스와이프 업!");
            // $('bustopinfobar').slideDown();
            $('#bustopinfobar').toggleClass('open');
            $('#bustopinfobar').stop(true).animate({bottom: "0px"}, 300);
            setSwipeUp(false);
        }

    }, [swipeUp])

 
    return(
        <div id="bustopinfobar" style={{position: "fixed", backgroundColor: "white", width: "100%", height: "500px", bottom: "-400px"}}>
                <h2>test</h2>
        </div>
    );
}

export default BusStopDetailInfo;
