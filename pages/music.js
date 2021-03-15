import { useState } from 'react';
import useFetchMusic from '../hooks/useFetchMusic';

import MusicList from '../components/MusicList';
import Spinner from '../components/Spinner';

function Music() {
  const [ inputYear, setInputYear ] = useState('2020');
  const [ submitYear, setSubmitYear ] = useState('2020');
  const [ music, isLoading, error ] = useFetchMusic(submitYear);
  return (
    <>
      <h1>Year End Hot 100 Songs for {submitYear}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        setSubmitYear(inputYear);
      }}>
        <input value={inputYear} onChange={e => setInputYear(e.target.value)} placeholder="2020"/>
      </form>
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
    </>
  )
}

export default Music;
