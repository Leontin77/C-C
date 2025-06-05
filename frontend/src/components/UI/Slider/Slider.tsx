import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./Slider.scss";
import { SliderContent } from "../SliderContent/SliderContent";

interface SlideItem {
  albumName: string;
  coverImageUrl: string;
  embedUrl: string;
  bgColor: string;
}

interface SliderProps {
  data: SlideItem[];
  activeSlide: number;
  onAllIframesLoaded: any;
}

export const Slider: React.FC<SliderProps> = ({
  data,
  activeSlide: initialSlide,
  onAllIframesLoaded,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(initialSlide);
  const loadCount = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleIframeLoad = () => {
    loadCount.current += 1;
    if (loadCount.current === data.length) {
      onAllIframesLoaded?.();
    }
  };

  const next = () => {
    if (activeSlide < data.length - 1) setActiveSlide((prev) => prev + 1);
  };

  const prev = () => {
    if (activeSlide > 0) setActiveSlide((prev) => prev - 1);
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const delta = touchStartX.current - touchEndX.current;
        if (delta > 20) next();
        else if (delta < -20) prev();
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSlide]);

  const getStyles = (index: number) => {
    const isActive = activeSlide === index;
    const common = {
      opacity:
        isActive || activeSlide - 1 === index || activeSlide + 1 === index
          ? 1
          : 0,
      zIndex: isActive ? 10 : 7,
    };

    if (isActive) {
      return {
        ...common,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
      };
    } else if (activeSlide - 1 === index) {
      return {
        ...common,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
      };
    } else if (activeSlide + 1 === index) {
      return {
        ...common,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
      };
    } else {
      return {
        ...common,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
      };
    }
  };

  return (
    <div className="slider-container">
      <div className="slideC">
        {data.map((item, i) => (
          <React.Fragment key={item.albumName}>
            <div
              className="slide"
              style={{
                background: item.bgColor,
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i),
              }}
            >
              <SliderContent {...item} onIframeLoad={handleIframeLoad} />
            </div>
            <div
              className="reflection"
              style={{
                background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                ...getStyles(i),
              }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="btns">
        <FontAwesomeIcon
          className="btn"
          onClick={prev}
          icon={faChevronLeft}
          color="#fff"
          size="2x"
        />
        <FontAwesomeIcon
          className="btn"
          onClick={next}
          icon={faChevronRight}
          color="#fff"
          size="2x"
        />
      </div>
    </div>
  );
};
