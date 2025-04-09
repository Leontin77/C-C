import { Button } from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";

import "./UpcomingEventItem.scss";

export const UpcomingEventItem = ({ data }) => {
  return (
    <>
      <div className="upcomingEventItem">
        <div className="upcomingEventItem-date">{data.date}</div>
        <div className="upcomingEventItem-location">{data.location}</div>
        <Link to={data.link} className="upcomingEventItem-button">
          <Button className="upcomingEventItem-button">Buy ticket</Button>
        </Link>
      </div>

      <div className="upcomingEventItemDescr">
        <div className="upcomingEventItemDescr-descr">
          <CiLocationOn size="2em" />
          <div className="text">{data.longDate}</div>
        </div>
        <div className="upcomingEventItemDescr-descr">
          <CiCalendarDate size="2em" />
          <div className="text">{data.fullLocation}</div>
        </div>
        <div className="upcomingEventItemDescr-description">
          <div className="text">{data.description}</div>
        </div>
      </div>
    </>
  );
};
