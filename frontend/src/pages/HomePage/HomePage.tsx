import { useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
// import { Loader } from "../../components/Loader/Loader"; // або свій кастомний

import "./HomePage.scss";

const LatestReleases = lazy(() => import("../../components/LatestReleases/LatestReleases"));
const Merchandise = lazy(() => import("../../components/Merchandise/Merchandise"));
const OurEvenets = lazy(() => import("../../components/OurEvenets/OurEvenets"));
const Feedbacks = lazy(() => import("../../components/Feedbacks/Feedbacks"));

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;

    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <section>
      <div className="wrapperBlock" id="events">
        <Suspense fallback={'Loading'}>
          <OurEvenets />
        </Suspense>
      </div>

      <div className="wrapperBlock" id="latest-releases">
        <Suspense fallback={'Loading'}>
          <LatestReleases />
        </Suspense>
      </div>

      <div className="wrapperBlock" id="merchandise">
        <Suspense fallback={'Loading'}>
          <Merchandise />
        </Suspense>
      </div>

      <div className="wrapperBlock" id="feedbacks">
        <Suspense fallback={'Loading'}>
          <Feedbacks autoplay />
        </Suspense>
      </div>
    </section>
  );
};
