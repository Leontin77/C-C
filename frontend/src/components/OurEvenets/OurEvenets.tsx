import "./OurEvenets.scss";
import ukMap from "../../assets/video/UKmap.png";
import { useEffect, useRef, useState } from "react";
import { UpcomingEvents } from "../UpcomingEvents/UpcomingEvents";
import { PiHandTapLight } from "react-icons/pi";

const OurEvenets = () => {
  const [activeTab] = useState("upcoming");
  const [prevTab] = useState("upcoming");
  const [zoomed, setZoomed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [choosenCity, setChoosenCity] = useState("");
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (activeTab) {
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    } else {
      setShowContent(false);
    }
  }, [activeTab]);


  const handleMarkerClick = (name: string) => {
    setChoosenCity(name);
    setZoomed(true);
  };

  const handleMouseLeave = () => {
    if (zoomed) {
      setZoomed(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: TouchEvent | MouseEvent) => {
      if (
        zoomed &&
        mapRef.current &&
        !mapRef.current.contains(event.target as Node)
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

  return (
    <div className="upcomingEvents">
      <h3 className="upcomingEvents-title">UPCOMING EVENTS</h3>
      <div className="tab-content">
        {["passed", "upcoming"].map((tab) => {
          const isActive = activeTab === tab;
          const isFirstRender = activeTab === prevTab && tab === "upcoming";

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
                  ref={mapRef}
                  className={`map-container ${slideClass} ${
                    zoomed ? "zoom-in" : ""
                  } ${isFirstRender ? "visible" : ""}`}
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

                    {activeTab === "upcoming" && (
                      <>
                        <div
                          className="marker marker-stoc upcomingMark"
                          onClick={() => handleMarkerClick("Stockton-on-tees")}
                        >
                          <span
                            className="city-label"
                            onClick={() =>
                              handleMarkerClick("Stockton-on-tees")
                            }
                          >
                            Stockton-on-tees
                          </span>
                        </div>
                        <div
                          className="marker marker-lond upcomingMark"
                          onClick={() => handleMarkerClick("London")}
                        >
                          <span
                            className="city-label"
                            onClick={() => handleMarkerClick("London")}
                          >
                            London
                          </span>
                        </div>
                        <div
                          className="marker marker-newC upcomingMark"
                          onClick={() => handleMarkerClick("Newcastle")}
                        >
                          <span
                            className="city-label"
                            onClick={() => handleMarkerClick("Newcastle")}
                          >
                            Newcastle
                          </span>
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
                  <PiHandTapLight className="hint-finger"/>
                </div>
                <div className="hint-text">Tap a city</div>
              </div>
            )
          ))}
      </div>
    </div>
  );
};

export default OurEvenets;
