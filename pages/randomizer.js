import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import RandomList from '../components/randomList';
import fetch from 'isomorphic-unfetch';

const {NEXT_PUBLIC_API_KEY} = process.env;

function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function randomizer() {
    const [ query, setQuery ] = useState("");
    const [randomNumber, setRandomNumber] = useState(0);
    const [randomIndex, setRandomIndex] = useState(0);
    const [inputQuery, setInputQuery] = useState(query || "");
    const [randomMovie, setRandomMovie] = useState([]);
    const [randomTV, setRandomTV] = useState([]);
    const [yearDisabled, setYearDisabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        
        let ignore = false;
        const controller = new AbortController();
        async function fetchRandomResults(){
            let movieResponse = {};
            let tvResponse = {};
            try{

                const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&first_air_date_year=${inputQuery}`, {signal: controller.signal});
                tvResponse = await res.json();

                const res_movie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${inputQuery}`, {signal: controller.signal});
                movieResponse = await res_movie.json();

            }catch(e){
                if( e instanceof DOMException){
                    console.log("HTTP Request aborted!");
                }

            }
            if(!ignore){
                setRandomTV(tvResponse.results || []);
                setRandomIndex(getRandomNumber(0, randomTV.length));

                setRandomMovie(movieResponse.results || []);
                setRandomIndex(getRandomNumber(0, randomMovie.length));
                // console.log(randomTV);
                // console.log(randomIndex);
                setQuery("");

            }

        }
        if(query){
            fetchRandomResults();
            
        }
        return() => {
            controller.abort();
            ignore = true;
        }
        
    }, [query]);
    return (
        <div>
            <h1>{inputQuery}</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                
                if(yearDisabled){
                    setInputQuery(getRandomNumber(2000, 2021));
                }
                router.push(`?q=${inputQuery}`);
                setQuery("1");
            }}>
            <input type="number" value={inputQuery} onChange={e => setInputQuery(e.target.value)} placeholder="2021" disabled={yearDisabled}/>
            <input type="checkbox" onChange={() => {
                setYearDisabled(!yearDisabled);

            }} />
            <input type="submit" />
            
            
            
            
            </form>
            <div>
                <RandomList info={randomTV} movie={false} index={randomIndex}/>
                <RandomList info={randomMovie} movie={true} index={randomIndex}/>
            </div>
            
            

        </div>
    );
}

export default randomizer;