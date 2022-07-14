import plus from "../images/plus.png";
import minus from "../images/minus.png"
import '../css/Button.css'

const Button = (props)=>{
    return(
        <>
        <button onClick={props.onClick} style={{background: "none"}}><img src={props.src}></img></button>
        </>
    );
}

export default Button;