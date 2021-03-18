/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const {NEXT_PUBLIC_API_KEY} = process.env;

function InfoCard(props){
    const styles = css`
        width: 70%;
        margin: 0 auto;
        .list{
            background-color: IndianRed;
            border-radius: 20px;
            margin: 5px;
        }

    `;
    const [ info, setInfo ] = useState({});
    const [ showInfo, setShowInfo ] = useState(false);
    const id = props.id;
    const isMovie = props.isMovie;

    useEffect(() =>{
        let ignore = false;
        const controller = new AbortController();
        async function fetchInfo(){
            let infoBody = {};
            try{           
                if(props.isMovie){
                    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`, {signal: controller.signal});
                    infoBody = await res.json();

                }
                else{
                    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`, {signal: controller.signal});
                    infoBody = await res.json();

                }   
                
            }catch(e){
                if(e instanceof DOMException){
                    console.log("HTTP Request aborted!");
                }
            }
            if(!ignore){
                setInfo(infoBody || {});
            }
        }
        if( props.id ){
            fetchInfo();
        }
        return () => {
            controller.abort();
            ignore = true;
        }
    }, [ props.id ]);
    return (
        <div css={styles}>
            <button id={props.id} onClick={() => {
                            setShowInfo(!showInfo);
                        }}>Show Info</button>
            {showInfo ? 
                <div>
                    {isMovie ? 
                    <div>
                        <ul id={props.id}>
                            <li>Description: {info.overview}</li>
                            <li>Runtime: {info.runtime} minutes</li>
                            <li>Production Company: {info.production_companies[0].name}</li>
                            <li>
                                <img src={`https://image.tmdb.org/t/p/original/${info.production_companies[0].logo_path}`} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}} alt="production_icon" height='100px' width='100px' />
                            </li>
                            <li>Genres:
                                <ul>
                                    {info["genres"].map(genre => (
                                        <li key={genre.id}>{genre.name}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div> 
                    : 
                    <div>
                        <ul>
                            <li>Description: {info.overview}</li>
                            <li>Episode Runtime: {info.episode_run_time[0]} minutes</li>
                            <li>Network: {info.networks[0].name}</li>
                            <li>
                                <img src={`https://image.tmdb.org/t/p/original/${info.networks[0].logo_path}`} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}} alt="network_icon" height='100px' width='100px' />
                            </li>
                            <li>Number of Seasons: {info.seasons.length}</li>
                            <li>Genres:
                                <ul>
                                    {info["genres"].map(genre => (
                                        <li key={genre.id}>{genre.name}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    }
                </div>
                
                :
                <div></div>
                
        
            }

        </div>
    );
}

export default InfoCard;