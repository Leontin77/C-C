import { Slider } from "../UI/Slider/Slider";
import { useGetSongsQuery } from "../../services/songsApi.ts";
import "react-jinke-music-player/assets/index.css";
import "./LatestReleases.scss";
import { BASE_URL } from "../../shared/const/url.ts";

interface Song {
  name: string;
  url: string;
}

interface Album {
  albumName: string;
  coverImageUrl: string;
  audio: Song[];
}

interface SongsApiResponse {
  data: Array<{
    album: {
      title: string;
      cover: Array<{ url: string }>;
    };
    audio: Array<{ name: string; url: string }>;
  }>;
}

const LatestReleases = () => {
  const { data: songs, isLoading } = useGetSongsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const albumsMap: { [key: string]: Album } = {};

  if (songs && songs?.data) {
    songs?.data.forEach((item) => {
      const albumName = item.album.title;
      const coverImageUrl = `${BASE_URL}${item.album.cover[0].url}`;
      const audio = item.audio.map((song) => ({
        name: song.name,
        url: `${BASE_URL}${song.url}`,
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

export default LatestReleases;