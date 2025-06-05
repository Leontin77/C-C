import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./Slider.scss";
import { SliderContent } from "../SliderContent/SliderContent";
import { useRef } from "react";

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
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const handleIframeLoad = () => {
    loadCount.current += 1;
    if (loadCount.current === data.length) {
      onAllIframesLoaded?.();
    }
  };

  useEffect(() => {
    const container = slideContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 20;
        if (diff > threshold) next();
        else if (diff < -threshold) prev();
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSlide]);

  const next = () =>
    activeSlide < data.length - 1 && setActiveSlide(activeSlide + 1);
  const prev = () => activeSlide > 0 && setActiveSlide(activeSlide - 1);

  const getStyles = (index: number) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <div className="slider-container" ref={slideContainerRef}>
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
