import { Link } from "react-router-dom";
import "./Footer.scss";
import { ROUTES } from "../../shared/const/router";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSpotify,
  FaTiktok,
} from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { JSX, useEffect, useState } from "react";
import { useGetSocailsQuery } from "../../services/socailApi";
import Modal from "../UI/Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../../store/modal/modal.slice";
import emailjs from "emailjs-com";
import { Textarea } from "../UI/Textarea/Textarea";
import { toast } from 'react-toastify';

export const Footer = () => {
  const [email, setEmail] = useState("");
  const { data } = useGetSocailsQuery(undefined);
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", email: "", message: "" };

    if (!name) {
      errors.name = "Name is required.";
      valid = false;
    }
    if (!email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
      valid = false;
    }
    if (!message) {
      errors.message = "Message is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = { name, email, message };

    try {
      emailjs.init("OyEJgHok_8Ahju8_J");
      emailjs
        .send("service_wgm6mcn", "template_rn2y9ge", {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        })
        .then((response) => {
          console.log("Email sent successfully", response);
          toast.success('Email sent successfully');
        })
        .catch((error) => {
          console.error("Error sending email", error);
        });
      handleCloseModal();

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const ICON_MAP: Record<string, JSX.Element> = {
    facebook: <FaFacebook className="social-list-item" size="2em" />,
    instagram: <FaInstagram className="social-list-item" size="2em" />,
    youtube: <FaYoutube className="social-list-item" size="2em" />,
    spotify: <FaSpotify className="social-list-item" size="2em" />,
    applemusic: <SiApplemusic className="social-list-item" size="2em" />,
    tiktok: <FaTiktok className="social-list-item" size="2em" />,
  };

  return (
    <footer className="footer">
      <div className="footer-container">
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
                  onClick={() => handleOpenModal()}
                >
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>

          <div className="container" style={isMobile ? { width: "100%" } : {}}>
            <h5 className="container-title">Subscribe</h5>
            <div className="container-input">
              <Input
                label="Email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Link
                to={generateSubscribeUrl()}
                style={isMobile ? { width: "100%" } : {}}
              >
                <Button className="button">Subscribe</Button>
              </Link>
            </div>
          </div>

          <div className="container" style={isMobile ? { width: "100%" } : {}}>
            <h5 className="container-title">Contacts</h5>
            <ul className="container-list">
              <li style={isMobile ? { fontSize: "14px" } : {}}>
                <HiOutlineMail size="1.5em" />
                <span>band@cattleandcane.co.uk</span>
              </li>
              <li style={isMobile ? { fontSize: "14px" } : {}}>
                <CiPhone size="1.5em" />
                <span>+447449323212</span>
              </li>
              <li style={isMobile ? { fontSize: "14px" } : {}}>
                <IoLocationOutline size="1.5em" />
                <span>England, London</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="social">
        <ul className="social-list">
          {data?.data?.map((item) => {
            const name = item.name?.toLowerCase();
            const icon = ICON_MAP[name];
            const link = item.link;

            return (
              <li key={item.id}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {icon}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="allRights">
        Copyright © 2025 Cattle & Cane - All Rights Reserved.
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Contact Us</h2>
        <form className="modal-input-form" onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <Textarea
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <Button className="button" type="submit">
            Send
          </Button>
        </form>
      </Modal>
    </footer>
  );
};
