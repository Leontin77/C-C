import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { AboutUs } from "./pages/AboutUs";
import { Blog } from "./pages/Blog/Blog";
import { BlogDetails } from "./pages/BlogDetails";
import { BookUs } from "./pages/BookUs/BookUs";

import { MainLayout } from "./shared/layouts/MainLayout";
import { ROUTES } from "./shared/const/router";
import { PassedEventsPage } from "./pages/PassedEventsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { useLayoutEffect } from "react";

const App: React.FC = () => {
  useLayoutEffect(() => {
    if (window.location.hostname === "cattleandcane.co.uk") {
      window.location.replace("https://www.cattleandcane.co.uk");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetails />} />
          <Route path={ROUTES.PASSED_EVENTS} element={<PassedEventsPage />} />
          <Route path={ROUTES.BOOK_US} element={<BookUs />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
