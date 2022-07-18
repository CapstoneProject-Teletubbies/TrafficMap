import { useNavigate } from "react-router-dom"
import '../css/BuildingInfo.css'

const BuildingInfo = (props) => {
    const navigate = useNavigate();

    const moveAbout = () => {}

    return(
        <div className="buildingInfo">
            <div className="Info">
                <p>{props.name}</p>
                <p>{props.address}</p>
            </div>
        </div>
    );
}

export default BuildingInfo;