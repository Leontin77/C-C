import { useEffect, useState } from "react";

interface SlideItem {
  albumName: string;
  coverImageUrl: string;
  embedUrl: string;
  bgColor: string;
}

export const SliderContent: React.FC<SlideItem> = ({ albumName, embedUrl }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div className="sliderContent">
      <h2>{albumName}</h2>
      <iframe
        style={{ borderRadius: "12px" }}
        src={embedUrl}
        width={isMobile ? '100%' : '900px'}
        height={isMobile ? '352px' : '500px'}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};
