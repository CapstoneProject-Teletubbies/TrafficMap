import React from 'react';
import '../css/Button.css'

const Button = (props)=>{
    return(
        <>
        <button className="mybtn1 hover1" onClick={props.onClick} style={{background: "none"}}><img src={props.src}></img></button>
        </>
    );
}

export default Button;