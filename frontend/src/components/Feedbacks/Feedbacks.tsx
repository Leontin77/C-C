import "./Feedbacks.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useGetFeedbacksQuery } from "../../services/feedbackApi";

interface FeedbacksProps {
  autoplay?: boolean;
  id?: string;
}

const BASE_URL = "http://localhost:1337";

export const Feedbacks = ({ autoplay }: FeedbacksProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed: 3000,
  };
  const { data } = useGetFeedbacksQuery(undefined);

  console.log("dataasdasd", data);
  return (
    <div className="whatPeaopleSay">
      <h3 className="feedbacksHeader">WHAT PEOPLE SAY</h3>
      <div className="feedbacks">
        <Slider {...settings} className="feedbacks-slider">
          {data?.data?.map((item) => {
            return (
              <div className="feedbacks-carousel">
                <img
                  className="feedbacks-carousel__img"
                  src={`${BASE_URL}${
                    item.img[0]?.formats?.medium?.url || item.img[0]?.url
                  }`}
                />
                <div className="feedbacks-carousel__content">
                  <div className="text">{item.text}</div>
                  <div className="name">
                    <span>{item.name} </span>
                    <span>{item.age} years</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Feedbacks
