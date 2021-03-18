/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import RandomList from '../components/randomList';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head'
import useFetchMusic from '../hooks/useFetchMusic';
import MusicSingle from '../components/MusicSingle';
import Spinner from '../components/Spinner';

const {NEXT_PUBLIC_API_KEY} = process.env;

function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function randomizer() {
    const styles = css`
        text-align: center;
        .random {
            background-color: #51B4B7;
            border-radius: 5px;
            border: none;
            color: #484848;
            outline: none;
            padding: 40px;
            margin: 5px;
            cursor: pointer;
            &:hover {
                background-color: #ED2B38;
                transition: background-color 0.2s;
            }

        }
        .checkbox {
            background-color: #ccc;
        }
        .number{
            padding: 10px;
            border-radius: 5px;
            border: 1px solid black;
            background-color: #FFD68F;
            &:disabled{
                background-color: lightgray;
                cursor: not-allowed;
            }
        }
        ul {
            padding: 0;
            list-style-type: none;
        }
    `;
    
    const router = useRouter();
    let path = router.asPath;
    if(path === "/randomizer" || path === "/randomizer?q="){
        path = "";
    }
    const [ query, setQuery ] = useState("");
    const [randomIndex, setRandomIndex] = useState(0);
    const [randomIndexTV, setRandomIndexTV] = useState(0);
    const [inputQuery, setInputQuery] = useState(path.slice(-4) || "");
    const [randomMovie, setRandomMovie] = useState([]);
    const [randomTV, setRandomTV] = useState([]);
    const [yearDisabled, setYearDisabled] = useState(false);
    const [initialPress, setInitialPress] = useState(inputQuery || false);
    const [ submitYear, setSubmitYear ] = useState(path.slice(-4) || '2020');
    const [ music, isLoading, error ] = useFetchMusic(submitYear);
    const [randomIndexSong, setRandomIndexSong] = useState(0);
    

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
                }

            }
            if(!ignore){
                setRandomTV(tvResponse.results || []);
                setRandomIndexTV(getRandomNumber(0, randomTV.length));

                setRandomMovie(movieResponse.results || []);
                setRandomIndex(getRandomNumber(0, randomMovie.length));

                
            }

        }
        if(router.query){
            if(inputQuery){
                router.push(`?q=${inputQuery}`);
            }
            
            fetchRandomResults();
            
        }
        return() => {
            controller.abort();
            ignore = true;
            setQuery("");
        }
        
    }, [query, router.query.q]);
    return (
        <div css={styles}>
            <Head>
                <title>Rewind Randomizer</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Randomizer</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                
                if(yearDisabled){
                    setInputQuery(getRandomNumber(2000, 2021));
                }
                if(inputQuery === ""){
                    setInputQuery(2021);
                }
            
                setInitialPress(true);

                if(inputQuery < 2006){
                    setSubmitYear('2006');


                }
                else if(inputQuery > 2020){
                    setSubmitYear(2020);
                }
                else{
                    setSubmitYear(inputQuery);

                }
                setRandomIndexSong(getRandomNumber(0, music.songs.length));
                setQuery("1");
                
            }}>
            <input type="number" className="number" value={inputQuery} onChange={e => setInputQuery(e.target.value)} placeholder="2021" disabled={yearDisabled} max='2021' min='1980'/><br></br>
            <input type="checkbox" name="checkbox" className="checkbox" onChange={() => {
                setYearDisabled(!yearDisabled);

            }}/>
            <label htmlFor="checkbox">Randomize Year</label>
            <br></br><br></br>
            <button type="submit" className="random">Randomize</button>

            </form>
            {path ? <div>{(inputQuery.length === 0) ? <h2>Year: 2021</h2> : <h2>Year: {inputQuery}</h2>}</div> : <div><h2>Press Randomize to get random movies, TV shows, and songs</h2></div>}
            {initialPress
                ? <div>
                    <RandomList info={randomMovie} movie={true} index={randomIndex}/>
                    <RandomList info={randomTV} movie={false} index={randomIndexTV}/>
                    {music.songs ? <div>
                        {isLoading ? <div><Spinner /></div> : <div><b>Music:</b> <MusicSingle song={music.songs[randomIndexSong]} /></div>}
                         </div> : <div></div>}
                </div>
                : null
            }
        </div>
    );
}

export default randomizer;