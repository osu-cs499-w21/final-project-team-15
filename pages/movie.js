import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DisplayList from './components/queryList';

const {NEXT_PUBLIC_API_KEY} = process.env;

function SearchMovie(query){
    const [ movieInfo, setMovieInfo ] = useState([]);
    const [ inputQuery, setInputQuery ] = useState(query || "");
    const router = useRouter();

    useEffect(() =>{
        let ignore = false;
        const controller = new AbortController();
        async function fetchMovieResults(){
            let responseBody = {};
            try{              
                const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${inputQuery}`, {signal: controller.signal});
                responseBody = await res.json();
            }catch(e){
                if( e instanceof DOMException){
                    console.log("HTTP Request aborted!");
                }
            }
            if(!ignore){
                setMovieInfo(responseBody.results || []);
            }
        }
        if(query){
            fetchMovieResults();
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
            }}>
                <input type="number" value={inputQuery} onChange={e => setInputQuery(e.target.value)} placeholder="2021"/>
                <button type="submit">Search</button>
            </form>
            <DisplayList info={movieInfo} />

        </div>
    );

}

export default SearchMovie;