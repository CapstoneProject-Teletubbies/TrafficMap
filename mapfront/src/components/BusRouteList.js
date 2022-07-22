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
        <div className="BusRoute">
            <div className="busreallocation">
                <p>{num}{test}</p>         
            </div>
            <div className="RouteInfo">
                <p>{props.bstopnm}</p>
                <p>{props.sbstopid}</p>
            </div>
        </div>
    );
}

export default BusRouteList;