import { useGetTicketsQuery } from "../../services/ticketApi";
import { UpcomingEventItem } from "./UpcomingEventItem/UpcomingEventItem";
import "./UpcomingEvents.scss";

export const UpcomingEvents = ({choosenCity}) => {
  const { data } = useGetTicketsQuery(undefined);

  console.log('choosenCity', choosenCity);

  return (
    <div className="upcomingEvent">
      {data?.data
      ?.filter((city) => city.location.toLowerCase() === choosenCity.toLowerCase())
      ?.map((item) => {
        return <UpcomingEventItem data={item} />;
      })}
    </div>
  );
};
