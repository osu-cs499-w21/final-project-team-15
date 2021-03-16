import { useState } from 'react';
import useFetchMusic from '../hooks/useFetchMusic';

import Spinner from '../components/Spinner';

function Test() {
  const [ inputYear, setInputYear ] = useState('2020');
  const [ music, isLoading, error ] = useFetchMusic(inputYear);
  return (
    <>
      <h1>Year End Hot 100 Songs for {inputYear}</h1>
      <select value={inputYear} onChange={e => setInputYear(e.target.value)}>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
      </select>
      {isLoading
        ? <Spinner />
        : <>
            {Object.keys(music).length !== 0
            ? <>
                <ul>
                  {music.songs.map(song => (
                      <p>{song.rank} {song.title} by {song.artist}</p>
                  ))}
                </ul>
              </>
            : null
            }
          </>
      }
    </>
  )
}

export default Test
