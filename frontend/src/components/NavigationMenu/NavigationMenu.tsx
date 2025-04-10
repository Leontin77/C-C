import { Link } from "react-router-dom";
import "./NavigationMenu.scss";
import { ROUTES } from "../../shared/const/router";
import Modal from "../UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/modal/modal.slice";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { Textarea } from "../UI/Textarea/Textarea";
import { useState } from "react";
import emailjs from "emailjs-com";
import { RootState } from "../../store/store";

export const NavigationMenu = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

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

  return (
    <nav className="navigationMenu">
      <ul className="navigationMenu-list">
        <Link to={ROUTES.HOME}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "events" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("events")}
          >
            Events
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "latest-releases" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("latest-releases")}
          >
            Music Albums
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "merchandise" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("merchandise")}
          >
            Merchandise
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "feedbacks" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("feedbacks")}
          >
            Feedbacks
          </li>
        </Link>
        <Link to={ROUTES.ABOUT_US}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("about")}
          >
            About Us
          </li>
        </Link>
        <Link to={ROUTES.BLOG}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("blog")}
          >
            Blog
          </li>
        </Link>
        <li className="navigationMenu-list__item" onClick={handleOpenModal}>
          Contact Us
        </li>

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
      </ul>
    </nav>
  );
};
