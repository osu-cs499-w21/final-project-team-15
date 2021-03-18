/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InfoCard from './infoCard';

function DisplayList(props){
    const styles = css`
        width: 70%;
        margin: 0 auto;
        .list {
            background-color: #FF9C5A;
            border-radius: 20px;
            margin: 5px;
        }
    `;
    const isMovie = props.movie;
    return(
        <div css={styles}>
            {props.info.map((list) => (
                <div className="list">
                    <ul key={list.id}>
                        <li>
                            {isMovie ? <div><h3>{list.original_title}</h3></div> : <div><h3>{list.original_name}</h3></div>}

                            <div>
                                <img src={`https://image.tmdb.org/t/p/original/${list.poster_path}`} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg"}} alt="poster_icon" width='300px' />

                            </div>
                            <InfoCard id={list.id} isMovie={isMovie}/>
                        </li>
                    </ul>
                </div>

            ))}


        </div>
    );
}

export default DisplayList;