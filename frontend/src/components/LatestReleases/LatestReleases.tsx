import { Slider } from "../UI/Slider/Slider";
import { useGetSongsQuery } from "../../services/songsApi.ts";
import "react-jinke-music-player/assets/index.css";
import "./LatestReleases.scss";

const BACKEND_URL = "http://localhost:1337";

 const LatestReleases = () => {
  const { data: songs, error, isLoading } = useGetSongsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const albumsMap: { [key: string]: Album } = {};

  if (songs && songs?.data) {
    songs?.data.forEach((item: any) => {
      const albumName = item.album.title;
      const coverImageUrl = `${BACKEND_URL}${item.album.cover[0].url}`;
      const audio = item.audio.map((song: any) => ({
        name: song.name,
        url: `${BACKEND_URL}${song.url}`,
      }));

      if (albumsMap[albumName]) {
        albumsMap[albumName].audio.push(...audio);
      } else {
        albumsMap[albumName] = {
          albumName,
          coverImageUrl,
          audio,
        };
      }
    });
  }

  const albums = Object.values(albumsMap);

  return (
    <section className="latestReleases">
      <h3 className="latestReleases-title">MUSIC ALBUMS</h3>
      <div className="latestReleases-content">
        <Slider data={albums} activeSlide={0} />
      </div>
    </section>
  );
};

export default LatestReleases
