/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const styles = css`
    text-align: center;
    .second{
      opacity: 0.8;
      &:hover{
        opacity: 1;
      }
    }
    .third{
      opacity: 0.6;
      &:hover{
        opacity: 1;
      }
    }
    .fourth{
      opacity: 0.4;
      &:hover{
        opacity: 1;
      }
    }
    .fifth{
      opacity: 0.2;
      &:hover{
        opacity: 1;
      }
    }
  `;
  const urlArray = [
    {
      year: 2021,
      movie: "https://image.tmdb.org/t/p/original//lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg",
      tv: "https://image.tmdb.org/t/p/original//glKDfE6btIRcVB5zrjspRIs4r52.jpg"
    },
    {
      year: 2020,
      movie: "https://image.tmdb.org/t/p/original//1UCOF11QCw8kcqvce8LKOO6pimh.jpg",
      tv: "https://image.tmdb.org/t/p/original//trfHliK2hhw2xOJVztHqKylyzrD.jpg"
    },
    {
      year: 2019,
      movie: "https://image.tmdb.org/t/p/original//ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
      tv: "https://image.tmdb.org/t/p/original//sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg"
    },
    {
      year: 2018,
      movie: "https://image.tmdb.org/t/p/original//7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      tv: "https://image.tmdb.org/t/p/original//qTZIgXrBKURBK1KrsT7fe3qwtl9.jpg"
    },
    {
      year: 2017,
      movie: "https://image.tmdb.org/t/p/original//eifGNCSDuxJeS1loAXil5bIGgvC.jpg",
      tv: "https://image.tmdb.org/t/p/original//6tfT03sGp9k4c0J3dypjrI8TSAI.jpg"
    }
  ];

  const [ showDiv, setShowDiv ] = useState(false);
  const [ movieIndex, setMovieIndex ] = useState(0);
  return (
    <div className={styles.container}>
      <Head>
        <title>Rewind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div css={styles}>
      <h1>Rewind</h1>
        <h1 onMouseEnter={() => {setShowDiv(true); setMovieIndex(0)}} onMouseLeave={() => {setShowDiv(false)}}>2021</h1><br></br>
        <h1 className="second" onMouseEnter={() => {setShowDiv(true); setMovieIndex(1)}} onMouseLeave={() => {setShowDiv(false)}}>2020</h1><br></br>
        <h1 className="third" onMouseEnter={() => {setShowDiv(true); setMovieIndex(2)}} onMouseLeave={() => {setShowDiv(false)}}>2019</h1><br></br>
        <h1 className="fourth" onMouseEnter={() => {setShowDiv(true); setMovieIndex(3)}} onMouseLeave={() => {setShowDiv(false)}}>2018</h1><br></br>
        <h1 className="fifth" onMouseEnter={() => {setShowDiv(true); setMovieIndex(4)}} onMouseLeave={() => {setShowDiv(false)}}>2017</h1>
      </div>
      {showDiv ? <div>
        <img src={urlArray[movieIndex].movie} alt="2021 movie" width="100px" height="150px" />
        <img src={urlArray[movieIndex].tv} alt="2021 tv" width="100px" height="150px" />
      </div> : <div></div>}

      
    </div>
  )
}
