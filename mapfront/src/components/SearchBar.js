import { useState, KeyboardEvent } from "react";
import '../css/Main.css'
import '../css/input.css'
import Search from '../pages/Search'
import { Link } from "react-router-dom";
const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const handleValue = (e) => {        //검색어 입력받는 부분
        setSearchValue(e.target.value);
        console.log(e.target.value);

    }
    const handleKeyPress = (e) => { //enter키 추적용 -> 검색 결과창으로 이동시킴
        if(e.key === 'Enter'){
            console.log(searchValue);
            document.location.href = '/search';
        }
    }

    return(
        <>
            <input className="gg" type="text" placeholder={'장소, 버스, 지하철, 주소 검색'} 
            onChange={handleValue}
            onKeyDown={handleKeyPress}
            />
        </>
    );
};

export default SearchBar;