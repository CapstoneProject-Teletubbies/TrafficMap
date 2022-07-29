import '../css/BuildingInfo.css'
import { useNavigate } from "react-router-dom";

const BuildingInfo = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(props.obj);
        navigate('/location-map', {
            state: {
                props: props,
            }
        });
        window.location.href = "/location-map"; 
    }

    return(
        <div className="buildingInfo" onClick={handleClick}>
            <div className="Info">
                <p>{props.name}</p>
                <p>{props.address}</p>
            </div>
        </div>
    );
}

export default BuildingInfo;