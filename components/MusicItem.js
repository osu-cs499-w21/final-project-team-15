import styled from '@emotion/styled';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const Cover = styled.img`
  height: 106px;
  width: 106px;
`

function MusicItem(props) {
  return (
    <Card>
      <Cover src={props.cover} />
      <div>
        {props.title} by {props.artist}
      </div>
    </Card>
  )
}

export default MusicItem;
