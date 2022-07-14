import React, {useState, useEffect } from 'react';
import '../css/search.css';
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import {useLocation} from 'react-router';

 function Search(props) {
    const [text, setText] = useState(' ');
    const state = useLocation();

    console.log(state.state.state);

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onReset = () => {
        setText( );
    };

    return (
    <div className="main"> 
        <div className="searchbar">
            <input onChange = {onChange} value ={text} placeholder={state.state.state} />
            <button onClick ={onReset}>검색</button>
        </div>
        <div className="search">
            
        </div>
    </div>
    );
 }
 export default Search;