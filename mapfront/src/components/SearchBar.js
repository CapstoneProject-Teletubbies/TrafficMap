import { useState, KeyboardEvent, useEffect } from "react";
import axios from 'axios';
import '../css/Main.css'
import '../css/input.css'
import Search from '../pages/Search'
import { Link, useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const test = useNavigate();
    const [name, setName] = useState('');
    const [isEnter, setIsEnter] = useState();
    const [searchValue, setSearchValue] = useState('');
    const handleValue = (e) => {        //검색어 입력받는 부분
        setSearchValue(e.target.value);
        console.log(e.target.value);

    }
    const handleKeyPress = (e) => { //enter키 추적용 -> 검색 결과창으로 이동시킴
        if(e.key === 'Enter'){
            handleSearch();
            // document.location.href = '/search';
        }
    }
    //test
    const handleSearch = () => {  //Axios
        const search = axios.create({
          baseURL: 'http://localhost:8080/',


        })
        search.post('/api/find/address', null, {params:{keyword: searchValue}})
        .then(function (res){
          console.log(res.data.name);
          test("/search", {state: {state: res.data.name, searchValue: searchValue}});
          setName(res.data.name);
          setIsEnter(true);
        }).catch(function (err){
          alert(`에러,, ,  .  . . `);
        })
        
      }

    return(
        <>       
            <input className="gg" type="text" placeholder={'장소, 버스, 지하철, 주소 검색'} 
            onChange={handleValue}
            onKeyDown={handleKeyPress}
            />
            <Link to='/search' ></Link>
        </>
    );
};

export default SearchBar;