import "./Merchandise.scss";

import img1 from "../../assets/merchImg.jpg";
import img2 from "../../assets/merchImg2.jpg";
import img3 from "../../assets/merchImg3.jpg";
import img4 from "../../assets/merchImg4.jpg";
import { Button } from "../UI/Button/Button";

const merchData = [
  {
    img: img1,
    title: 'Golden – Limited Edition 12" Vinyl',
    link: "https://cattleandcane.bandcamp.com/merch",
  },
  {
    img: img2,
    title: '"You Are Golden" T-shirt',
    link: "https://cattleandcane.bandcamp.com/merch",
  },
  {
    img: img3,
    title: '"Infant Hercules" T-Shirt',
    link: "https://cattleandcane.bandcamp.com/merch",
  },
  {
    img: img4,
    title: "Mirrors - Cream Vinyl",
    link: "https://cattleandcane.bandcamp.com/merch",
  },
];

const Merchandise = () => {
  return (
    <section className="merchandise">
      <h3 className="merchandise-title">STORE</h3>
      <div className="merchandise-content">
        {merchData?.map((item) => {
          return (
            <a href={item.link} className="wrapper">
              <div className="wrapper-title">{item.title}</div>
              <img className="wrapper-img" src={item.img} alt="" />
            </a>
          );
        })}
      </div>
      <div className="merchandise-buttons">
        <Button className="button">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://cattleandcane.bandcamp.com/merch"
          >
            See More
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Merchandise
