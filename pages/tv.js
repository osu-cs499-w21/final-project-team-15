import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DisplayList from '../components/queryList';

const {NEXT_PUBLIC_API_KEY} = process.env;

function SearchTV(query){
    const [ TVInfo, setTVInfo ] = useState([]);
    const [ inputQuery, setInputQuery ] = useState(query || "");
    const router = useRouter();
    let isSubmit = false;

    useEffect(() =>{
        let ignore = false;
        const controller = new AbortController();
        console.log(inputQuery);
        async function fetchTVResults(){
            let responseBody = {};
            try{              
                const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&first_air_date_year=${inputQuery}`, {signal: controller.signal});
                responseBody = await res.json();
            }catch(e){
                if( e instanceof DOMException){
                    console.log("HTTP Request aborted!");
                }
            }
            if(!ignore){
                setTVInfo(responseBody.results || []);
            }
        }
        if(query){
            fetchTVResults();
        }
        return () => {
            controller.abort();
            ignore = true;
        }
    }, [query]);


    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                router.push(`?q=${inputQuery}`);
                isSubmit = true;
            }}>
                <input type="number" value={inputQuery} onChange={e => setInputQuery(e.target.value)} placeholder="2021"/>
                <button type="submit">Search</button>
            </form>
            {(Object.keys(inputQuery).length === 0 && inputQuery.constructor === Object) ? <h2>Year: 2021</h2> : <h2>Year: {inputQuery}</h2>}
            <DisplayList info={TVInfo} movie={false}/>

        </div>
    );

}

export default SearchTV;