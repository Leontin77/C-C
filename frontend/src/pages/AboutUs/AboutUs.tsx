import "./AboutUs.scss";
import aboutUsImg from "../../assets/aboutUs.webp";
import aboutUsImg1 from "../../assets/aboutUs1.jpg";
import aboutUsImg2 from "../../assets/aboutUs2.webp";
import aboutUsImg3 from "../../assets/aboutUs3.jpg";
import aboutUsImg4 from "../../assets/aboutUs4.jpg";
import { motion } from "framer-motion";

export const AboutUs = () => {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <section className="aboutUs">
      <div className="aboutUs-container">
        <h1 className="aboutUs-mainTitle">Hello! Welcome to our Substack.</h1>
        <div className="aboutUs-content">
          <p>
            We are Helen and Joe, two siblings, bandmates and songwriters from
            Teesside in the North East of the UK. We’ve been in a band together
            for 10+ years (Cattle & Cane) and have our own careers within the
            music industry as artists and songwriters. Over the years, we’ve
            sold out shows, toured across Europe, released multiple albums,
            received millions of streams and worked with incredible musicians
            and producers, on our own music and other artists’ releases.
          </p>
          <div className="aboutUs-content__img">
            <img src={aboutUsImg} alt="" />
          </div>

          <p>
            Our Substack is a new home for us to shout about what we’re working
            on - together, independently, and in collaboration with other
            artists - as well as sharing all of the usual Cattle & Cane news and
            updates.
          </p>

          <p>
            We’re looking forward to sharing this space with you, bringing you
            closer to our journeys and keeping you up to date with everything
            we’re working on. If you’re already subscribed, thanks for being
            here and having a read! If you’re new to us and curious about what
            we do, you can find us on socials (Helen Hammill, Joe Hammill,
            Cattle & Cane) and listen to our music (Cattle & Cane, Joe Hammill,
            Written by Joe Hammill playlist).
          </p>

          <p>
            Thanks for having a read and joining us here, we hope you stick
            around!
          </p>
        </div>
        <div className="aboutUs-section">
          <h2 className="aboutUs-title">WHY SUBSCRIBE?</h2>
          <motion.img
            src={aboutUsImg1}
            alt=""
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          />
          <motion.p
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          >
            We’ve merged our Patreon, MailChimp mailing list and Joe’s mailing
            list all into one place - right here. Subscribe to get updates on
            everything we’re up to!
          </motion.p>

          <h2 className="aboutUs-title">STAY UP-TO-DATE</h2>
          <motion.p
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          >
            Never miss an update—every new post is sent directly to your email
            inbox. For a spam-free, ad-free reading experience, plus audio and
            community features, get the Substack app.
          </motion.p>
          <motion.img
            src={aboutUsImg2}
            alt=""
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          />

          <h2 className="aboutUs-title">JOIN THE CREW</h2>
          <motion.img
            src={aboutUsImg3}
            alt=""
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          />
          <motion.p
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          >
            Be part of a community of people who share your interest in all
            things Helen, Joe and Cattle & Cane. Participate in the comments
            section, or support this work with a subscription.
          </motion.p>

          <h2 className="aboutUs-title">THANK YOU!</h2>
          <motion.p
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          >
            We couldn’t do what we do without you, and we never take it for
            granted. Your support means the world to us. There’s a free
            subscription option which means you’ll get the occasional mailing
            list update, but if you want behind the scenes content and early
            access to new music, merch, tour dates etc, then you can choose the
            paid option.
          </motion.p>
          <motion.img
            src={aboutUsImg4}
            alt=""
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </section>
  );
};
