import React, { useState } from 'react';
import InfoCard from './infoCard';

function RandomList(props){
    
    const isMovie = props.movie;
    let test = props.info;
    let object = null;
    let render = null;
    if(test.length !== 0){
        const index = props.index;
        object = test[index];
        render = (<div>
            <ul key={object.id}>
                <li>
                    {isMovie ? <div>Title: {object.original_title}</div> : <div>Title : {object.original_name}</div>}

                    <div>
                        <img src={`https://image.tmdb.org/t/p/original/${object.poster_path}`} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}} alt="poster_icon" height='100px' width='100px' />
                        

                    </div>
                    <InfoCard id={object.id} isMovie={isMovie}/>
                    
                
                </li>

            </ul>


        </div>);
    }
    return(
        render
        
    );
}

export default RandomList;