import { memo, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import { Header } from "../../../components/Header/Header";
import { Footer } from "../../../components/Footer/Footer";

import "./MainLayout.scss";

const Start = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    setTimeout(() => onFinish(), 1000);
  }, [onFinish]);

  const text = "CATTLE & CANE".split("");

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.2 },
    }),
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black flex items-center justify-center z-50 w-full h-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h1 className="header-title center-title text-center max-w-screen-md w-full px-4">
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
    </motion.div>
  );
};

export const MainLayout = memo(() => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent ? (
        <Start onFinish={() => setShowContent(true)} />
      ) : (
        <motion.main
          className="main-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Header />
          <div>
            <Outlet />
          </div>
          <Footer />
        </motion.main>
      )}
    </>
  );
});
