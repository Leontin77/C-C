import "./BlogItem.scss";
import { Button } from "../UI/Button/Button";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:1337";

export const BlogItem = ({ data, setOpenComments }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setOpenComments(isOpen);
  }, [isOpen, setOpenComments]);

  return (
    <div className="blogItem">
      <div className="blogItem-content">
        <div className="blogItem-content__img">
          <img
            src={`${BASE_URL}${
              data.smallImg[0]?.formats?.medium?.url || data.img[0]?.url
            }`}
            alt=""
          />
        </div>
        <div className="blogItem-content__wrapper">
          <h4 className="title">{data.title}</h4>
          <div className="date">{data.date}</div>
          <div className="text">{data.shortDescr + "..."}</div>
          <div
          className="blogItem-content__comment"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaRegComment size="1.2em" />
          <span className="quantity">0</span>
        </div>
        </div>
        <Link className="blogItem-content__button" to={`/blog/${data.id}`}>
          <Button className="blogItem-content__button">+Read more</Button>
        </Link>
      </div>
    </div>
  );
};
