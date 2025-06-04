import { useGetHeaderVideoQuery } from "../../services/headerApi";
import { useGetMainSongsQuery } from "../../services/mainSongApi";
import { motion } from "framer-motion";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import "./Header.scss";
import { BASE_URL } from "../../shared/const/url";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { useEffect, useRef, useState } from "react";

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

  const { data: headerData } = useGetHeaderVideoQuery(undefined);
  const { data: mainSongsData } = useGetMainSongsQuery(undefined);

  const videoUrl = headerData?.data?.[0]?.video?.[0]?.url;
  const songUrl = mainSongsData?.data?.[0]?.song?.[0]?.url;
  const fullVideoUrl = videoUrl ? `${BASE_URL}${videoUrl}` : null;
  const fullSongUrl = songUrl ? `${BASE_URL}${songUrl}` : undefined;

  const [openMenu, setOpenMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("✅ video playing");
          })
          .catch((error) => {
            console.warn("⚠️ autoplay failed:", error);
          });
      }
    };

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplaythrough", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
    };
  }, [fullVideoUrl]);

  return (
    <header className="header">
      <div className="header-burger" onClick={() => setOpenMenu(!openMenu)}>
        {isMobile ? <GiHamburgerMenu size="1.7em" /> : <IoMdClose />}
      </div>

      {fullVideoUrl ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="video-bg"
          controls={false}
          disablePictureInPicture
        >
          <source src={fullVideoUrl} type="video/mp4" />
        </video>
      ) : (
        <p></p>
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
      {isMobile ? (
        <BurgerMenu isOpen={openMenu} setOpenMenu={setOpenMenu} />
      ) : (
        <NavigationMenu />
      )}
      <MusicPlayer className="header-player" src={fullSongUrl} />
    </header>
  );
};
