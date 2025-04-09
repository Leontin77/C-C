import { Link } from "react-router-dom";
import "./NavigationMenu.scss";
import { ROUTES } from "../../shared/const/router";

export const NavigationMenu = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
        <li
          className="navigationMenu-list__item"
          onClick={() => scrollToSection("contact")}
        >
          Contact Us
        </li>
      </ul>
    </nav>
  );
};
