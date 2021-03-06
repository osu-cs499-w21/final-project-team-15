/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const {NEXT_PUBLIC_API_KEY} = process.env;

function InfoCard(props){
    const styles = css`
        width: 70%;
        margin: 0 auto;
        button {
            height: 2em;
            background-color: #F26247;
            border: none;
            border-radius: 5px;
            box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
            outline: none;
            font: 'Century Gothic';
        }
        button:hover {
            background-color: #ED2B38;
            transition: background-color 0.2s;
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
                            <li><b>Description:</b> {info.overview}</li>
                            <li><b>Runtime:</b> {info.runtime} minutes</li>
                            <li><b>Production Company:</b> {info.production_companies[0].name}</li>
                            <li>
                                <img src={`https://image.tmdb.org/t/p/original/${info.production_companies[0].logo_path}`}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}}
                                    alt="production_icon" height='100px'
                                />
                            </li>
                            <li><b>Genres:</b>
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
                            <li><b>Description:</b> {info.overview}</li>
                            <li><b>Episode Runtime:</b> {info.episode_run_time[0]} minutes</li>
                            <li><b>Network:</b> {info.networks[0].name}</li>
                            <li>
                                <img src={`https://image.tmdb.org/t/p/original/${info.networks[0].logo_path}`}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}}
                                    alt="network_icon" height='100px'
                                />
                            </li>
                            <li><b>Number of Seasons:</b> {info.seasons.length}</li>
                            <li><b>Genres:</b>
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