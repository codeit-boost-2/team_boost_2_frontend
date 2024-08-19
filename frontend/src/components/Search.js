import { useState } from "react";

function Search(){
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return(
        <>
        <input style={{display:'flex', width:'70%', marginLeft:'10px'}} value={search} onChange={handleSearch} placeholder="태그 혹은 제목을 입력 해 주세요."/>
        </>
    );
}
export default Search;