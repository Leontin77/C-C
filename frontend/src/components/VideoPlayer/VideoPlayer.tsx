import "./VideoPlayer.scss";

interface VideoPlayerProps {
  src?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div className="video-container">
      <iframe src={src} allow="autoplay; fullscreen" allowFullScreen></iframe>
    </div>
  );
};
