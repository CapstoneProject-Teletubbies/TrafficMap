import React from 'react';
import '../css/BusRouteList.css'

const BusRouteList = (props) => {
    var ibus, imnum, num, arrow, low, mtop, turnaround;

    if(props.isit === true){                    //현재 위치에 버스가 있나?
        
        imnum = (props.businfo.busid)%10000;
        num = <h8>{imnum}</h8>
        ibus = <img src={props.img} style={{width: "29px", height: "29px"}}></img>;
        arrow = null;
        if(props.businfo.low_TP_CD === 1){
            low = <h9>저상</h9>
            mtop = "15%";
        }
        else{
            mtop = "33%";
        }
    }
    else{
        num = null;
        ibus = null;
        arrow = <i class="bi bi-arrow-down-circle"></i>;
    }

    if(props.turn === props.bstopid){     //회차지인 경우
        console.log("회차지");
        turnaround = true;
    }
    else{
        turnaround = false;
    }

    return(
        <div id={turnaround ? "turnaround" : ""} className={turnaround ? "row me" : "row"}>
            {turnaround ? <div className="row" style={{margin: "0px", padding: "0px"}}>
                <div className="col-3"/>
                <div className="col-9" style={{backgroundColor: "#BDBDBD"}}>회차지</div>
                </div> : null}
            <div className = "col-3" style={{backgroundColor: "white", borderRadius: "3px", textAlign: "center"}}>
                <div className = "" style={{top: mtop}}>   
                    <div style={{zIndex: "1"}}>
                    {num}<br></br>
                    {low}
                    </div>
                    {num && <div className="pull"></div>}
                </div> 
            </div>
            <li className="list-group-item col-9">        
                <div className="container">
                    <div className="row inner" style={{padding: "0px"}}>
                        <div className="col-1" style={{position: "absolute", textAlign: "left", marginLeft: "-37px", top: "10px"}}>
                            {arrow}
                        </div>
                        <div className="col-1" style={{ textAlign: "left", marginLeft: "-44px", top: "10px" }}>
                            <p>{ibus}</p>         
                        </div>
                        <div className="col-11" style={{ textAlign: "left", marginLeft: "20px" }}>
                            {props.bstopnm}<br></br>
                            {props.sbstopid}
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
}

export default BusRouteList;