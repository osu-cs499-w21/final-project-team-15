/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DisplayList from '../components/queryList';
import Spinner from '../components/Spinner';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const {NEXT_PUBLIC_API_KEY} = process.env;

function SearchTV(){
    const styles = css`
        text-align: center;
        ul{
            padding: 0;
            list-style-type: none;
        }
        .number{
            padding: 5px;
            border-radius: 5px;
            border: 1px solid black;
            background-color: #FFD68F;
        }
        .submit {
            height: 2em;
            width: 2em;
            margin-left: 5px;
            background-color: #FF9C5A;
            border: none;
            border-radius: 5px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            color: #484848;
            cursor: pointer;
            outline: none;
        }
        .submit:hover {
            background-color: #F26247;
            transition: background-color 0.2s;
        }
    `;
    const router = useRouter();
    let path = router.asPath;
    if(path === "/tv"){
        path = "";
    }
    const [ query, setQuery ] = useState("");
    const [ TVInfo, setTVInfo ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ inputQuery, setInputQuery ] = useState(path.slice(-4) || "");

    useEffect(() =>{
        let ignore = false;
        const controller = new AbortController();
        console.log(inputQuery);
        async function fetchTVResults(){
            let responseBody = {};
            setIsLoading(true);
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
                setIsLoading(false);
            }
        }
        if(router.query){
            fetchTVResults();
        }
        return () => {
            controller.abort();
            ignore = true;
            setQuery("0");
        }
    }, [query, router.query.q]);


    return(
        <div css={styles}>
            <Head>
                <title>TV Show Rewind</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>TV Shows</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                router.push(`?q=${inputQuery}`);
                setQuery("1");
            }}>
                <input type="number" className="number" value={inputQuery} onChange={e => setInputQuery(e.target.value)} placeholder="2021" max="2021" min="1980"/>
                <button type="submit" className="submit">
                    <FontAwesomeIcon icon={faSearch} color={"#484848"} />
                </button>
            </form>
            {(inputQuery.length === 0) ? <h2>Year: 2021</h2> : <h2>Year: {inputQuery}</h2>}
            {isLoading
                ? <Spinner />
                : <DisplayList info={TVInfo} movie={false}/>
            }

        </div>
    );

}

export default SearchTV;