import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useGetFeedbacksQuery } from "../../services/feedbackApi";
import { BASE_URL } from "../../shared/const/url";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

import "./Feedbacks.scss";

interface Feedback {
  id: string;
  text: string;
  name: string;
  age: number;
  img: {
    formats?: {
      medium?: { url: string };
    };
    url: string;
  }[];
}

interface FeedbacksProps {
  autoplay?: boolean;
  id?: string;
}

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

  return (
    <div className="whatPeaopleSay">
      <h3 className="feedbacksHeader"></h3>
      <div className="feedbacks">
        <Slider {...settings} className="feedbacks-slider">
          {data?.data?.map((item: Feedback) => {
            return (
              <div className="feedbacks-carousel">
                <img
                  className="feedbacks-carousel__img"
                  src={`${BASE_URL}${
                    item.img[0]?.formats?.medium?.url || item.img[0]?.url
                  }`}
                />
                <div className="feedbacks-carousel__content">
                  <div className="text">
                    <RiDoubleQuotesL size="1em" />{" "}
                    {item.text} {" "}
                    <RiDoubleQuotesR size="1em" />
                  </div>
                  <div className="name">
                    <span>{item.name} </span>
                    <span>{item.age}</span>
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

export default Feedbacks;
