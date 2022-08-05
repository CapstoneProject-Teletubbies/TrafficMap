import React from 'react';
import '../css/BusRouteList.css'
import bus from '../images/bus.png'


const BusRouteList = (props) => {
    var test;
    var imnum;
    var num;
    var arrow;
    var low;
    if(props.isit === true){
        imnum = (props.businfo.busid)%10000;
        num = <h8>{imnum}</h8>
        test = <img src={bus} style={{width: "30px", height: "30px"}}></img>
        arrow = null;
        if(props.businfo.low_TP_CD === 1){
            low = <h9>저상</h9>
        }
    }
    else{
        num = null;
        test = null;
        arrow = <i class="bi bi-arrow-down-circle"></i>
    }

    if(props.businfo){
        console.log(props.businfo);
    }


    return(
        <li className="list-group-item">
            <div className="container">
                <div className="row" style={{padding: "0px"}}>
                    <div className="col-3" style={{position: "absolute", marginLeft: "-100px", top: "15px"}}>
                        {num}
                        {low}            
                    </div>
                    <div className="col-1" style={{position: "absolute", textAlign: "left", marginLeft: "-37px", top: "24px"}}>
                        {arrow}
                    </div>
                    <div className="col-1" style={{ textAlign: "left", marginLeft: "-44px", top: "24px" }}>
                        <p>{test}</p>         
                    </div>
                    <div className="col-11" style={{ textAlign: "left", marginLeft: "20px" }}>
                        <p>{props.bstopnm}</p>
                        <p>{props.sbstopid}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default BusRouteList;