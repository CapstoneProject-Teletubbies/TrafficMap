import { useState, KeyboardEvent } from "react";
import Input from "./Input";
const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleValue = (e) => {
        setSearchValue(e.target.value);
        console.log(e.target.value);

    }
    const handleKeyPress = (e) => {
        console.log("test")
    }

    return(
        <>
            <Input class="gg" type="text" placeholder={'장소, 버스, 지하철, 주소 검색'} 
            onChange={handleValue}
            onKeyDown={handleKeyPress}
            />
        </>
    );
};

export default Search;