import React from 'react';
import '../css/BusRouteList.css'
import bus from '../images/bus.png'


const BusRouteList = (props) => {
    var test;
    var num;
    if(props.isit === true){
        num = <h8>{props.businfo.busid}</h8>
        test = <img src={bus}></img>
    }
    else{
        num = null;
        test = null;
    }

    if(props.businfo){
        console.log(props.businfo);
    }


    return(
        <li className="list-group-item">
            <div className="container">
                <div className="row">
                    <div className="col-2" style={{ textAlign: "left" }}>
                        <p>{num}{test}</p>         
                    </div>
                    <div className="col-10" style={{ textAlign: "left" }}>
                        <p>{props.bstopnm}</p>
                        <p>{props.sbstopid}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default BusRouteList;