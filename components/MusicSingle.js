import styled from '@emotion/styled';

import MusicItem from './MusicItem';

const StyledList = styled.ul`
  padding-inline-start: 0;
`

function MusicSingle(props) {
  return (
    <StyledList>
        <MusicItem
        key={props.song.title}
        title={props.song.title}
        artist={props.song.artist}
        rank={props.song.rank}
        cover={props.song.cover}
        />
    </StyledList>
  )
}

export default MusicSingle;