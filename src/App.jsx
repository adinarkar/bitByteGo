import { useEffect } from "react";
import Shuffle from "./components/Shuffle/Shuffle";
import "./cardadi.css";

import DotGrid from "../frontend/background/DotGrid/DotGrid.jsx";
import Carousel from "./components/Carousel.jsx";
import generateToken from "../notification/firebase";
import CardFrontend from "./CardFrontend.jsx";
import CircularGalleryFrontend from "./components/CircularGalleryFrontend";
import EventCarousel from "./components/EventCarousel";
import ContactSection from "./contactsection";

// 👉 Spline
import Spline from "@splinetool/react-spline";

const App = () => {
  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div className="app-wrapper">
      <DotGrid /> {/* stays behind everything */}

      <main className="app-main">

        {/* ================= HERO SECTION ================= */}
        <div className="section-wrapper hero-wrapper">
          <section id="home" className="home-section">
            <div className="hero-inner">

              {/* LEFT TEXT */}
              <div className="hero-text">
                <Shuffle
                  text="BitByteGo"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                  colorFrom="#00ffcc"
                  colorTo="#ffffff"
                />

                <p className="hero-tagline">
                  INSPIRE · CODE · SUCCEED
                </p>
              </div>

              {/* RIGHT 3D */}
              <div className="hero-3d">
                <Spline scene="https://prod.spline.design/aCWDMJtvYubL0Fnt/scene.splinecode" />
              </div>

            </div>
          </section>
        </div>

        {/* ================= UPCOMING EVENTS ================= */}
        <div className="section-wrapper upcoming-events-wrapper">
          <section id="upcoming-events"></section>
        </div>

        {/* ================= EVENT GALLERY ================= */}
        <div className="section-wrapper event-gallery-wrapper">
          <section id="event-gallery">
            <CircularGalleryFrontend />
          </section>
        </div>

        {/* ================= EVENT CAROUSEL ================= */}
        <div className="section-wrapper event-carousel-wrapper">
          <section id="event-carousel">
            <EventCarousel />
          </section>
        </div>

        {/* ================= COMMITTEE MEMBERS ================= */}
        <div className="section-wrapper committee-wrapper">
          <section id="committee-members">
            <Carousel />
          </section>
        </div>

        {/* ================= CONTACT + BLOG ================= */}
        <div className="section-wrapper content-wrapper">
          <section id="content-section" className="content-section">
            <div className="contacts">
              <ContactSection />
            </div>
            <div className="blogs">
              <CardFrontend />
            </div>
          </section>
        </div>

      </main>
    </div>
  );
};

export default App;
