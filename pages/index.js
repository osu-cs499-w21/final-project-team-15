/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Head from 'next/head'

export default function Home() {
  const styles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin-block-start: 0.4em;
      margin-block-end: 0.4em;
    }
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

  const logo = css`
    font-family: 'BulettoKilla';
    font-size: 75px;
    color: papayawhip;
    -webkit-text-stroke: 1px #FF9C5A;
    letter-spacing: 5px;
    text-shadow: 3px 3px 0px #f26247, 6px 6px 0px #ed2b38, 9px 9px 0px #51b4b7;
  `

  const images = css`
    .movie, .tv {
      height: 700px;
      position: absolute;
      top: 50px;
      padding: 20px;
      animation: slide-up 1s ease;
      @media (max-width: 1000px){
        height: 400px;
      }
      @media (max-width: 768px){
        height: 200px;
      }
    }
    .movie {
      left: 50px;
    }
    .tv {
      right: 50px;
    }
    .music {
      width: 106px;
      height: 106px;
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: 100px;
      animation: slide-up 1s ease;
    }
    
    @keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
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
      tv: "https://image.tmdb.org/t/p/original//trfHliK2hhw2xOJVztHqKylyzrD.jpg",
      music: "https://charts-static.billboard.com/img/2019/12/the-weeknd-nsd-blinding-lights-gfd-106x106.jpg?1"
    },
    {
      year: 2019,
      movie: "https://image.tmdb.org/t/p/original//ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
      tv: "https://image.tmdb.org/t/p/original//sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
      music: "https://charts-static.billboard.com/img/2019/03/lil-nas-x-zl6-old-town-road-4gg-106x106.jpg?1"
    },
    {
      year: 2018,
      movie: "https://image.tmdb.org/t/p/original//7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      tv: "https://image.tmdb.org/t/p/original//qTZIgXrBKURBK1KrsT7fe3qwtl9.jpg",
      music: "https://charts-static.billboard.com/img/2018/01/drake-hq6-106x106.jpg?1"
    },
    {
      year: 2017,
      movie: "https://image.tmdb.org/t/p/original//eifGNCSDuxJeS1loAXil5bIGgvC.jpg",
      tv: "https://image.tmdb.org/t/p/original//6tfT03sGp9k4c0J3dypjrI8TSAI.jpg",
      music: "https://charts-static.billboard.com/img/2017/01/ed-sheeran-buv-106x106.jpg?1"
    }
  ];

  const [ showDiv, setShowDiv ] = useState(false);
  const [ movieIndex, setMovieIndex ] = useState(0);
  return (
    <div>
      <Head>
        <title>Rewind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div css={styles}>
      <h1 css={logo}>Rewind</h1>
        <h1>2021</h1><br></br>
        <h1 className="second" onMouseEnter={() => {setShowDiv(true); setMovieIndex(1)}} onMouseLeave={() => {setShowDiv(false)}}>2020</h1><br></br>
        <h1 className="third" onMouseEnter={() => {setShowDiv(true); setMovieIndex(2)}} onMouseLeave={() => {setShowDiv(false)}}>2019</h1><br></br>
        <h1 className="fourth" onMouseEnter={() => {setShowDiv(true); setMovieIndex(3)}} onMouseLeave={() => {setShowDiv(false)}}>2018</h1><br></br>
        <h1 className="fifth" onMouseEnter={() => {setShowDiv(true); setMovieIndex(4)}} onMouseLeave={() => {setShowDiv(false)}}>2017</h1>
      </div>
      {showDiv
        ? <div css={images}>
            <img className="movie" src={urlArray[movieIndex].movie} alt="movie" />
            <img className="tv" src={urlArray[movieIndex].tv} alt="tv" />
            <img className="music" src={urlArray[movieIndex].music} alt="music" />
          </div>
        : <div />
      }
    </div>
  )
}
