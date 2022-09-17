import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const NavBar = (props)=>{
    const navigate = useNavigate();
    const handlebackButton= () => {
        navigate(-1);
    }

    return(
        <nav class="navbar bg-light" style={{height: "80px", boxShadow: "1px 1px 10px 1px gray", zIndex: "1", justifyContent: "left"}}>
            <i
                class="bi bi-arrow-left-circle"
                style={{ fontSize: "2rem", marginLeft: "10px", }}
                onClick={handlebackButton}
            ></i>
            <div style={{padding: "5%"}}>
                {props.keyword}
            </div>
        </nav>
    );
}

export default NavBar;