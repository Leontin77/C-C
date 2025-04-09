import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";

import './MusicPlayer.scss'

interface MusicPlayerProps {
  src?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src,
  autoPlay = false,
  loop = false,
  className
}) => {
  return (
    <AudioPlayer
      className={className}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      onPlay={() => console.log("Playing")}
    />
  );
};
