import { useForm } from "react-hook-form";
import { Input } from "../../components/UI/Input/Input";
import { Textarea } from "../../components/UI/Textarea/Textarea";
import "./BookUs.scss";
import { CustomSelect } from "../../components/UI/ CustomSelect/CustomSelect";
import emailjs from "emailjs-com";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface BookingFormData {
  fullName: string;
  eventType: string;
  eventDate: string;
  location: string;
  phone: string;
  email: string;
  time: string;
  notes: string;
}

// const eventOptions = [
//   { label: "Wedding", value: "wedding" },
//   { label: "Birthday", value: "birthday" },
//   { label: "Corporate", value: "corporate" },
//   { label: "Festival", value: "festival" },
//   { label: "Other", value: "other" },
// ];

const timeOptions = Array.from({ length: 21 }, (_, i) => {
  const hours = 10 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  const label = `${hours.toString().padStart(2, "0")}:${minutes}`;
  return { label, value: label };
});

export const BookUs = () => {
  const today = new Date().toISOString().split("T")[0];
  const { register, handleSubmit, reset, control } = useForm<BookingFormData>({
    defaultValues: {
      eventDate: today,
    },
  });

  useEffect(() => {
    emailjs.init("Evp7gabuR6nPtX26U");
  }, []);

  const onSubmit = (data: BookingFormData) => {
    const templateParams = {
      full_name: data.fullName,
      // event_type: data.eventType,
      event_date: data.eventDate,
      time: data.time,
      location: data.location,
      phone: data.phone,
      email: data.email,
      notes: data.notes || "-",
    };

    emailjs
      .send(
        "service_qu45ot8",
        "template_yxu648s",
        templateParams,
        "Evp7gabuR6nPtX26U"
      )
      .then(() => {
        toast.success("Email sent successfully");
        reset();
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        alert("Failed to send. Please try again later.");
      });
  };

  return (
    <section className="bookUs">
      <div className="bookUs-container">
        <h3 className="bookUs-title">Bookings</h3>
        <div className="bookUs-descr">
          We love playing in unique spaces and for intimate gatherings, whether
          it’s somewhere stripped back and atmospheric or grand and echoey. If
          you're putting something special together and think our music could be
          part of it, we'd love to hear from you. Drop us a message with a few
          details — where, when and what you're dreaming up — and we’ll get back
          to you as soon as we can.
        </div>
      </div>
      <form className="bookingForm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          {...register("fullName", { required: true })}
        />
        {/* <CustomSelect
          name="eventType"
          control={control}
          options={eventOptions}
          placeholder="Select event type"
          rules={{ required: true }}
        /> */}
        <Input
          label=""
          type="date"
          {...register("eventDate", { required: true })}
          className="input-date"
        />
        <CustomSelect
          name="time"
          control={control}
          options={timeOptions}
          placeholder="Preferred Time"
          rules={{ required: true }}
        />
        <Input
          label="Location / Venue"
          {...register("location", { required: true })}
        />
        <Input
          label="Phone Number"
          type="tel"
          {...register("phone", { required: true })}
        />
        <Input label="Email" type="email" {...register("email")} />
        <Textarea label="Additional Notes or Requests" {...register("notes")} />
        <button
          className="button"
          type="submit"
          onClick={() => console.log("Clicked test button!")}
        >
          Send
        </button>
      </form>
    </section>
  );
};
