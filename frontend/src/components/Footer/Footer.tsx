import { Link } from "react-router-dom";
import "./Footer.scss";
import { ROUTES } from "../../shared/const/router";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSpotify,
  FaTiktok
} from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const generateSubscribeUrl = () => {
    const encodedEmail = email.replace("@", "%40");
    return `https://cattleandcane.substack.com/subscribe?next=https%3A%2F%2Fcattleandcane.substack.com%2F&later=true&just_signed_up=true&subscription_id=774165930&referral_token=5hdqur&requires_confirmation=&utm_source=cover_page&email=${encodedEmail}&skip_redirect_check=true`;
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <h4 className="footer-title">CATTLE AND CANE</h4>
      <div className="footer-wrapper">
        <div className="container">
          <h5 className="container-title">Menu</h5>
          <ul className="container-list">
            <Link to={ROUTES.HOME}>
              <li
                className="container-list__item"
                onClick={() => scrollToSection("home")}
              >
                Home
              </li>
            </Link>
            <Link to={ROUTES.HOME} state={{ scrollTo: "events" }}>
              <li
                className="container-list__item"
                onClick={() => scrollToSection("events")}
              >
                Events
              </li>
            </Link>
            <Link to={ROUTES.HOME} state={{ scrollTo: "latest-releases" }}>
              <li
                className="container-list__item"
                onClick={() => scrollToSection("latest-releases")}
              >
                Music
              </li>
            </Link>
            <Link to={ROUTES.HOME} state={{ scrollTo: "merchandise" }}>
              <li
                className="container-list__item"
                onClick={() => scrollToSection("merchandise")}
              >
                Store
              </li>
            </Link>
          </ul>
        </div>

        <div className="container">
          <h5 className="container-title">About Us</h5>
          <ul className="container-list">
            <Link to={ROUTES.ABOUT_US}>
              <li
                className="container-list__item"
                onClick={() => scrollToSection("about")}
              >
                About Us
              </li>
            </Link>
            <Link to="">
              <li
                className="container-list__item"
                onClick={() => scrollToSection("contact")}
              >
                Contact Us
              </li>
            </Link>
          </ul>
        </div>

        <div className="container">
          <h5 className="container-title">Subscribe</h5>
          <div className="container-input">
            <Input
              label="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Link to={generateSubscribeUrl()} style={{ width: "100%" }}>
              <Button className="button">Subscribe</Button>
            </Link>
          </div>
        </div>

        <div className="container">
          <h5 className="container-title">Contacts</h5>
          <ul className="container-list">
            <li>
              <HiOutlineMail size="1.5em" />
              <span>cattleandcane@gmail.com</span>
            </li>
            <li>
              <CiPhone size="1.5em" />
              <span>+4411231231231</span>
            </li>
            <li>
              <IoLocationOutline size="1.5em" />
              <span>England, London</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="social">
        <ul className="social-list">
          <li>
            <a href="https://www.facebook.com/share/16MLJp3Y13/">
              <FaFacebook className="social-list-item" size="2em" />
            </a>
          </li>
          <li>
            <FaInstagram className="social-list-item" size="2em" />
          </li>
          <li>
            <FaYoutube className="social-list-item" size="2em" />
          </li>
          <li>
            <FaSpotify className="social-list-item" size="2em" />
          </li>
          <li>
            <SiApplemusic className="social-list-item" size="2em" />
          </li>
          <li>
            <FaTiktok className="social-list-item" size="2em" />
          </li>
        </ul>
      </div>
      <div className="allRights">
        Copyright © 2025 Cattle & Cane - All Rights Reserved.
      </div>
    </footer>
  );
};
