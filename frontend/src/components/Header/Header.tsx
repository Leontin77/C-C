import { useGetHeaderVideoQuery } from "../../services/headerApi";  // Імпортуємо хук RTK Query
import { motion } from "framer-motion";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";
import { Button } from "../UI/Button/Button";

import song from "../../assets/songs/dovi.mp3";

import "./Header.scss";
import { BASE_URL } from "../../shared/const/url";

export const Header = () => {
  const text = "CATTLE & CANE".split("");

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  const { data } = useGetHeaderVideoQuery(undefined);
  const videoUrl = data?.data?.[0]?.video?.[0]?.url;
  const fullVideoUrl = videoUrl ? `${BASE_URL}${videoUrl}` : null;

  return (
    <header className="header">
      <div className="header-auth">
        <Button className="header-auth__login">Log in</Button>
        <Button className="header-auth__login">Sign Up</Button>
      </div>

      {fullVideoUrl ? (
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={fullVideoUrl} />
        </video>
      ) : (
        <p>Sorry, video not found.</p>
      )}

      <h1 className="header-title">
        {text.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterAnimation}
            initial="hidden"
            animate="visible"
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      <NavigationMenu />
      <MusicPlayer className="header-player" src={song} />
    </header>
  );
};
