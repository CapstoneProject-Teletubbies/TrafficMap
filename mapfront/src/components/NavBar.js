import React from 'react';
import SearchBar from '../components/SearchBar';

const NavBar = (props)=>{
    return(
        <nav class="navbar bg-light">
            <i
                class="bi bi-arrow-left-circle"
                style={{ fontSize: "2rem", marginLeft: "10px", }}
                // onClick={handlebackButton}
            ></i>
            <SearchBar /*onChange={handleKeyword}*/ placeholder={'장소, 버스, 지하철, 주소 검색'}/>
        </nav>
    );
}

export default NavBar;