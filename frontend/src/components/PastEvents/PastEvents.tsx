import "./PastEvents.scss";
import ukMap from "../../assets/video/UKmap.png";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGetPastEventsQuery } from "../../services/pastEventApi";
import { BASE_URL } from "../../shared/const/url";
import { PiHandTapLight } from "react-icons/pi";

const PastEvents = () => {
  const [activeTab] = useState("passed");
  const [prevTab] = useState("passed");
  const [zoomed, setZoomed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [choosenCity, setChoosenCity] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showHint, setShowHint] = useState(true);
  const mapRefPast = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);


  const handleMouseLeave = () => {
    if (zoomed) {
      setZoomed(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: TouchEvent | MouseEvent) => {
      if (
        zoomed &&
        mapRefPast.current &&
        !mapRefPast.current.contains(event.target as Node)
      ) {
        handleMouseLeave();
      }
    };

    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [zoomed]);

  const { data: cityDataPast } = useGetPastEventsQuery(undefined);

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
                  ref={mapRefPast}
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
                          {<span className="city-label">Middlesbrough</span>}
                        </div>
                        <div
                          className="marker marker-stoc"
                          onClick={() => handleMarkerClick("Stockton-on-tees")}
                        >
                          {<span className="city-label">Stockton-on-tees</span>}
                        </div>
                        <div
                          className="marker marker-lond"
                          onClick={() => handleMarkerClick("London")}
                        >
                          {<span className="city-label">London</span>}
                        </div>
                        <div
                          className="marker marker-newC"
                          onClick={() => handleMarkerClick("Newcastle")}
                        >
                          {<span className="city-label">Newcastle</span>}
                        </div>
                        <div
                          className="marker marker-manch"
                          onClick={() => handleMarkerClick("Manchester")}
                        >
                          {<span className="city-label">Manchester</span>}
                        </div>
                        <div
                          className="marker marker-gains"
                          onClick={() => handleMarkerClick("Gainsborough")}
                        >
                          {<span className="city-label"> Gainsborough</span>}
                        </div>
                        <div
                          className="marker marker-birm"
                          onClick={() => handleMarkerClick("Birmingham")}
                        >
                          {<span className="city-label"> Birmingham</span>}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )
          );
        })}
        {activeTab === "passed" &&
          showContent &&
          cityDataPast?.data?.length &&
          (choosenCity ? (
            cityDataPast?.data
              ?.filter((city) => city.name === choosenCity)
              ?.map((city) => {
                return (
                  <div className="desc-container">
                    <div className="wrapper">
                      <img
                        className="desc-container__img"
                        src={`${BASE_URL}${
                          city.image1[0]?.formats?.medium?.url ||
                          city.image1[0]?.url
                        }`}
                        alt=""
                      />
                      <div>{animatedText(city.description1)}</div>
                    </div>

                    <div className="wrapper">
                      <div>{animatedText(city.description2)}</div>
                      <img
                        className="desc-container__img"
                        src={`${BASE_URL}${
                          city.image2[0]?.formats?.medium?.url ||
                          city.image2[0]?.url
                        }`}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })
          ) : !isMobile ? (
            <div className="selectCity">
              <div className="arrows"></div>
              <div className="text">Please select city on the map</div>
            </div>
          ) : (
            showHint && (
              <div
                className="hint-overlay"
                onClick={() => {
                  setZoomed(true);
                  setShowHint(false);
                }}
              >
                <div className="hint-finger">
                  <PiHandTapLight className="hint-finger" />
                </div>
                <div className="hint-text">Tap a city</div>
              </div>
            )
          ))}
      </div>
    </div>
  );
};

export default PastEvents;
