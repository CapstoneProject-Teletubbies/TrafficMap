import '../css/BuildingInfo.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BuildingInfo = (props) => {
    const navigate = useNavigate();

    // const handleClick = () => {
    //     console.log(props.obj);
    //     navigate('/location-map', {
    //         state: {
    //             props: props,
    //         }
    //     });
    // }

    const searchBusRoute = () => {
        const busroute = axios.create({
         baseURL: 'http://localhost:8080/'
        })
        busroute.post('/api/bus/route', null, {params: {routeId: props.obj.ROUTEID}})
        .then(function(res){
         console.log(res.data);
         navigate('/bus-route', {
            state:{
                busroute: res.data,
                props: props.obj,
            }
         })
        }).catch(function(err){
         console.log('버스 노선 못받아옴');
        })
     }

    return(
        <div className="buildingInfo" onClick={searchBusRoute} >
            <div className="Info">
                <p>{props.obj.routeno}</p>
                <p>{props.obj.origin_BSTOPNM} {props.obj.turn_BSTOPNM}</p>
               
            </div>
        </div>
    );
}

export default BuildingInfo;