import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { AboutUs } from "./pages/AboutUs";
import { Blog } from "./pages/Blog/Blog";
import { BlogDetails } from "./pages/BlogDetails";

import { MainLayout } from "./shared/layouts/MainLayout";
import { ROUTES } from "./shared/const/router";
import { PassedEventsPage } from "./pages/PassedEventsPage";

import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.BLOG} element={<Blog />} />
        <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetails />} />
        <Route path={ROUTES.PASSED_EVENTS} element={<PassedEventsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
