import React from 'react';

function DisplayList(props){
    return(
        <div>
            {props.info.map((list) => (
                <ul key={list.id}>
                    <li>
                        <div>
                            Title: {list.original_title}

                        </div>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original/${list.poster_path}`} alt="poster_icon" height='100px' width='100px' />

                        </div>
                        
                    
                    </li>
                </ul>

            ))}


        </div>
    );
}

export default DisplayList;