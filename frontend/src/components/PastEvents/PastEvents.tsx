import "./PastEvents.scss";
import ukMap from "../../assets/video/UKmap.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import data from "../../api/data.json";
import { UpcomingEvents } from "../UpcomingEvents/UpcomingEvents";

const PastEvents = () => {
  const [activeTab, ] = useState("passed");
  const [prevTab, ] = useState("passed");
  const [zoomed, setZoomed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [choosenCity, setChoosenCity] = useState("");
  const cityDataPast = data?.result?.pastEvents?.cities;

  useEffect(() => {
    if (activeTab) {
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    } else {
      setShowContent(false);
    }
  }, [activeTab]);

  const animatedText = (text: string) => {
    return (
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.02 } },
        }}
      >
        {text.split("").map((letter, i) => (
          <motion.span key={i} variants={letterAnimation} custom={i}>
            {letter}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.01, duration: 0.2 },
    }),
  };

  const handleMarkerClick = (name: string) => {
    setChoosenCity(name);
    setZoomed(true);
  };

  const handleMouseLeave = () => {
    if (zoomed) {
      setZoomed(false);
    }
  };

  return (
    <div className="upcomingEvents">
      <div className="tab-content">
        {["passed", "upcoming"].map((tab) => {
          const isActive = activeTab === tab;
          const isFirstRender = activeTab === prevTab && tab === "passed";

          const slideClass =
            activeTab === "passed" && prevTab === "upcoming"
              ? "slide-in-right"
              : activeTab === "upcoming" && prevTab === "passed"
              ? "slide-in-left"
              : "";

          return (
            isActive && (
              <>
                <div
                  key={tab}
                  className={`map-container ${slideClass} ${
                    zoomed ? "zoom-in" : ""
                  } ${isFirstRender ? "visible" : ""}`}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="map-wrapper">
                    <img src={ukMap} alt="UK Map" />
                    {activeTab === "passed" && (
                      <>
                        <div
                          className="marker marker-mid"
                          onClick={() => handleMarkerClick("Middlesbrough")}
                        >
                          <span className="city-label">Middlesbrough</span>
                        </div>
                        <div
                          className="marker marker-stoc"
                          onClick={() => handleMarkerClick("Stockton-on-tees")}
                        >
                          <span className="city-label">Stockton-on-tees</span>
                        </div>
                        <div
                          className="marker marker-lond"
                          onClick={() => handleMarkerClick("London")}
                        >
                          <span className="city-label">London</span>
                        </div>
                        <div
                          className="marker marker-newC"
                          onClick={() => handleMarkerClick("Newcastle")}
                        >
                          <span className="city-label">Newcastle</span>
                        </div>
                        <div
                          className="marker marker-manch"
                          onClick={() => handleMarkerClick("Manchester")}
                        >
                          <span className="city-label">Manchester</span>
                        </div>
                        <div
                          className="marker marker-gains"
                          onClick={() => handleMarkerClick("Gainsborough")}
                        >
                          <span className="city-label"> Gainsborough</span>
                        </div>
                        <div
                          className="marker marker-birm"
                          onClick={() => handleMarkerClick("Birmingham")}
                        >
                          <span className="city-label"> Birmingham</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )
          );
        })}
        {activeTab === "upcoming" &&
          showContent &&
          (choosenCity ? (
            <div className="desc-container">
              <UpcomingEvents choosenCity={choosenCity} />
            </div>
          ) : (
            <div className="selectCity">
              <div className="arrows"></div>
              <div className="text">Please select city on the map</div>
            </div>
          ))}
        {activeTab === "passed" &&
          showContent &&
          cityDataPast?.length &&
          (choosenCity ? (
            cityDataPast
              ?.filter((city) => city.name === choosenCity)
              ?.map((city) => {
                return (
                  <div className="desc-container">
                    <div className="wrapper">
                      <img
                        className="desc-container__img"
                        src={city.image1}
                        alt=""
                      />
                      <div>{animatedText(city.description1)}</div>
                    </div>

                    <div className="wrapper">
                      <div>{animatedText(city.description2)}</div>
                      <img
                        className="desc-container__img"
                        src={city.image2}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="selectCity">
              <div className="arrows"></div>
              <div className="text">Please select city on the map</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PastEvents
