import "./PassedEventsPage.scss";
import PastEvents from "../../components/PastEvents/PastEvents";

export const PassedEventsPage = () => {

  return (
    <section className="pastEvents">
      <h3 className="pastEvents-title">PAST EVENTS</h3>
      <PastEvents/>
    </section>
  );
};
