import styled from '@emotion/styled';

const AlbumArt = styled.img`
  height: 80px;
  width: 80px;
`

function MusicItem(props) {
  return (
    <div>
      <div>
        {props.rank}
      </div>
      <AlbumArt src={props.cover} />
      <div>
        {props.title} by {props.artist}
      </div>
    </div>
  )
}

export default MusicItem;
