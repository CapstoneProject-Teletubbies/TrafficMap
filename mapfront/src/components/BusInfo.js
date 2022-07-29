import '../css/BuildingInfo.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BuildingInfo = (props) => {
    const navigate = useNavigate();

    const searchBusRoute = (detail) => {
        const busroute = axios.create({
         baseURL: 'http://localhost:8080/'
        })
        busroute.post('/api/bus/route', null, {params: {routeId: props.obj.routeid}})
        .then(function(res){
         console.log(res.data);
         navigate('/bus-route', {
            state:{
                busroute: res.data,
                busrouteinfo: detail,
                props: props.obj,
            }
         })
        }).catch(function(err){
         console.log('버스 노선 못받아옴');
        })
     }

     const searchBusRouteInfo = () => {
        console.log(props.obj.routeid);
        const busrouteinfo = axios.create({
            baseURL: 'http://localhost:8080/'
        })
        busrouteinfo.post('/api/bus/route/detail', null, {params: {routeId: props.obj.routeid}})
        .then(function(res){
            searchBusRoute(res.data);
            console.log(res.data);
        }).catch(function(err){
            console.log("버스 노선 정보 못받아옴");
        })
     }

    return(
        <div className="buildingInfo" onClick={searchBusRouteInfo} >
            <div className="Info">
                <p>{props.obj.routeno}</p>
                <p>{props.obj.origin_BSTOPNM} {props.obj.turn_BSTOPNM}</p>
               
            </div>
        </div>
    );
}

export default BuildingInfo;