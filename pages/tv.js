/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DisplayList from '../components/queryList';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head'

const {NEXT_PUBLIC_API_KEY} = process.env;

function SearchTV(){
    const styles = css`
        text-align: center;
        ul{
            padding: 0;
            list-style-type: none;
        }
        .submit{
            color: snow;
            background-color: indianred;
            border-radius: 3px;
            padding: 5px;
            border: 1px solid indianred;
            margin: 5px;
            cursor: pointer;
            &:hover{
                color: indianred;
                background-color: snow;
            }

        }
    `;
    const router = useRouter();
    let path = router.asPath;
    if(path === "/tv"){
        path = "";
    }
    const [ query, setQuery ] = useState("");
    const [ TVInfo, setTVInfo ] = useState([]);
    const [ inputQuery, setInputQuery ] = useState(path.slice(-4) || "");

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
                <input type="number" value={inputQuery} onChange={e => setInputQuery(e.target.value)} placeholder="2021" max="2021" min="1980"/>
                <button type="submit" className="submit">Search</button>
            </form>
            {(inputQuery.length === 0) ? <h2>Year: 2021</h2> : <h2>Year: {inputQuery}</h2>}
            <DisplayList info={TVInfo} movie={false}/>

        </div>
    );

}

export default SearchTV;