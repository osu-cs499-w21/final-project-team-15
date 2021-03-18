import styled from '@emotion/styled';

import MusicItem from './MusicItem';

const StyledList = styled.ul`
  padding-inline-start: 0;
`

function MusicList(props) {
  return (
    <StyledList>
      {props.songs.map(song => (
          <MusicItem
            key={song.title}
            title={song.title}
            artist={song.artist}
            rank={song.rank}
            cover={song.cover}
          />
      ))}
    </StyledList>
  )
}

export default MusicList;
