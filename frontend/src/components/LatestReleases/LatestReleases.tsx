import { Slider } from "../UI/Slider/Slider";
import './LatestReleases.scss'

const LatestReleases = () => {
  const spotifyPlaylists = [
    {
      albumName: "Covers",
      embedUrl:
        "https://open.spotify.com/embed/album/6y5HsiDyAI8t9r2sWiSFtK?utm_source=generator",
      coverImageUrl:
        "https://i.scdn.co/image/ab67706f00000002c4e2e0baf9827a1a58cf26b8",
      bgColor: "",
    },
    {
      albumName: "Golden",
      embedUrl:
        "https://open.spotify.com/embed/album/7zurB06wtPLmlI59VTPVyk?utm_source=generator",
      coverImageUrl:
        "https://i.scdn.co/image/ab67706f000000028e8a76d73c8b0e9f13dc9e91",
      bgColor: "",
    },
    {
      albumName: "Navigator",
      embedUrl:
        "https://open.spotify.com/embed/album/6HToWW1UVOJGaaYdKMrK75?utm_source=generator",
      coverImageUrl:
        "https://i.scdn.co/image/ab67706f00000002a6e1c5e67985e1362dc98e4b",
      bgColor: "",
    },
  ];

  return (
    <section className="latestReleases">
      <h3 className="latestReleases-title">MUSIC</h3>
      <Slider data={spotifyPlaylists} activeSlide={0} />
    </section>
  );
};

export default LatestReleases;

