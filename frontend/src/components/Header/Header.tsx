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
import { useState } from "react";

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

  return (
    <header className="header">
      <div className="header-burger" onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? <IoMdClose /> : <GiHamburgerMenu />}
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

      {/* <NavigationMenu /> */}
      <BurgerMenu isOpen={openMenu} />
      <MusicPlayer className="header-player" src={fullSongUrl} />
    </header>
  );
};
