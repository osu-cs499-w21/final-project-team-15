import MusicItem from './MusicItem';

function MusicList(props) {
  console.log(props.songs[0]);
  return (
    <ul>
      {props.songs.map(song => (
          <MusicItem
            key={song.title}
            title={song.title}
            artist={song.artist}
            rank={song.rank}
            cover={song.cover}
          />
      ))}
    </ul>
  )
}

export default MusicList;
