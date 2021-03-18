import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useState } from 'react';

import useFetchMusic from '../hooks/useFetchMusic';

import MusicList from '../components/MusicList';
import Spinner from '../components/Spinner';

const StyledMusic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
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
  button:hover {
      background-color: #F26247;
      transition: background-color 0.2s;
  }
`

function Music() {
  const [ inputYear, setInputYear ] = useState('2020');
  const [ submitYear, setSubmitYear ] = useState('2020');
  const [ music, isLoading, error ] = useFetchMusic(submitYear);
    return (
    <StyledMusic>
      <Head>
          <title>Music Rewind</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Music</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        setSubmitYear(inputYear);
      }}>
        <input type="number" value={inputYear} onChange={e => setInputYear(e.target.value)} placeholder="2020" max="2020" min="2006"/>
        <button className="submit">
            <FontAwesomeIcon icon={faSearch} color={"#484848"} />
        </button>
      </form>
      <h2>Year: {submitYear}</h2>
      {isLoading
        ? <Spinner />
        : <>
            {Object.keys(music).length !== 0
            ? <>
                <MusicList songs={music.songs} />
              </>
            : null
            }
          </>
      }
    </StyledMusic>
  )
}

export default Music;
