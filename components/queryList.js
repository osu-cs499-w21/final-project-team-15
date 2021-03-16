import React from 'react';
import InfoCard from './infoCard';

function DisplayList(props){
    const isMovie = props.movie;
    return(
        <div>
            {props.info.map((list) => (
                <ul key={list.id}>
                    <li>
                        {isMovie ? <div>Title: {list.original_title}</div> : <div>Title : {list.original_name}</div>}

                        <div>
                            <img src={`https://image.tmdb.org/t/p/original/${list.poster_path}`} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}} alt="poster_icon" height='100px' width='100px' />

                        </div>
                        <InfoCard id={list.id} isMovie={isMovie}/>
                        
                    
                    </li>
                </ul>

            ))}


        </div>
    );
}

export default DisplayList;