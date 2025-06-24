import { Link } from "react-router-dom";
import "./NavigationMenu.scss";
import { ROUTES } from "../../shared/const/router";
import Modal from "../UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/modal/modal.slice";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { Textarea } from "../UI/Textarea/Textarea";
import emailjs from "emailjs-com";
import { RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const NavigationMenu = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    emailjs.init("OyEJgHok_8Ahju8_J");
    emailjs
      .send("service_wgm6mcn", "template_rn2y9ge", {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      })
      .then(() => {
        toast.success("Email sent successfully");
        handleCloseModal();
        reset(); 
      })
      .catch((error) => {
        console.error("Error sending email", error);
        toast.error("Failed to send email");
      });
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
        <Link to={ROUTES.PASSED_EVENTS}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("events")}
          >
            Highlights 
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "latest-releases" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("latest-releases")}
          >
            Music
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "merchandise" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("merchandise")}
          >
            Store
          </li>
        </Link>
        <Link to={ROUTES.HOME} state={{ scrollTo: "feedbacks" }}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("feedbacks")}
          >
            Quotes
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
        <li
          className="navigationMenu-list__item"
          onClick={() => scrollToSection("blog")}
        >
          <a
            href="https://cattleandcane.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Substack
          </a>
        </li>
        <Link to={ROUTES.BOOK_US}>
          <li
            className="navigationMenu-list__item"
            onClick={() => scrollToSection("about")}
          >
            Bookings
          </li>
        </Link>
        <li className="navigationMenu-list__item" onClick={handleOpenModal}>
          Contact Us
        </li>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Contact Us</h2>
        <form className="modal-input-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <Textarea
            label="Message"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <p className="error">{errors.message.message}</p>}

          <Button className="button" type="submit">
            Send
          </Button>
        </form>
      </Modal>

      </ul>
    </nav>
  );
};
