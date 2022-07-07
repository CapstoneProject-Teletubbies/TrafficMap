import plus from "../images/plus.png";
import minus from "../images/minus.png"
import '../css/Button.css'

const Button = ()=>{
    return(
        <>
        <button style={{background: "none"}}><img src={plus}></img></button>
        <button style={{background: "none"}}><img src={minus}></img></button>
        </>
    );
}

export default Button;