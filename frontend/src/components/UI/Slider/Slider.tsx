import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./Slider.scss";
import AudioPlayerList from "../../AudioPlayerList/AudioPlayerList";

interface SliderProps {
  data: [];
  activeSlide: number;
}

export const Slider: React.FC<SliderProps> = ({
  data,
  activeSlide: initialSlide,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(initialSlide);

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
    <div className="slider-container">
      <div className="slideC">
        {data &&
          data.map((item: any, i: number) => {
            console.log("itemitem", item);
            return (
              <React.Fragment key={item.albumName}>
                <div
                  className="slide"
                  style={{
                    background: item.bgColor,
                    boxShadow: `0 5px 20px ${item.bgColor}30`,
                    ...getStyles(i),
                  }}
                >
                  <SliderContent {...item} />
                </div>
                <div
                  className="reflection"
                  style={{
                    background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                    ...getStyles(i),
                  }}
                />
              </React.Fragment>
            );
          })}
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

interface SlideItem {
  albumName: string;
  coverImageUrl: string;
  audio: { name: string; url: string; albumName: string; }[];
  bgColor: string;
}

const SliderContent: React.FC<SlideItem> = ({
  albumName,
  audio,
  coverImageUrl,
}) => {
  return (
    <div className="sliderContent">
      <h2></h2>
      <AudioPlayerList album={{ albumName, audio, coverImageUrl }} />
    </div>
  );
};

export default SliderContent;
