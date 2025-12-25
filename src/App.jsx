import { useEffect } from "react";
import Shuffle from "./components/Shuffle/Shuffle";
import "./cardadi.css";
 
import DotGrid from "../frontend/background/DotGrid/DotGrid.jsx";
import Carousel from "./components/Carousel.jsx";
import EventGrid from "./components/EventGrid";
import generateToken from "../notification/firebase";
import CardFrontend from "./CardFrontend.jsx";
import CircularGalleryFrontend from "./components/CircularGalleryFrontend";
import EventCarousel from "./components/EventCarousel";
import ContactSection from "./contactsection";

const App = () => {
  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div className="app-wrapper">
      <DotGrid /> {/* stays behind everything */}
      <main>

      <section id="home" className="home-section">
  <div className="home-content">
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

    <p className="intro-text my-4">
      BitByteGo is a creative tech platform built to inspire innovation through
      technology, learning, and collaboration. We blend bit-sized ideas and
      byte-level execution to deliver meaningful digital experiences — from
      interactive games and event showcases to cutting-edge web applications.
    </p>

    <p className="mission-text my-4">
      Our mission is to make technology accessible, engaging, and fun for
      everyone. Whether you’re exploring new tech trends, participating in
      events, or solving mini-games, BitByteGo is your space to learn, create,
      and grow.
    </p>

    <div className="vision-values ">
      <h3 className="my-4">Vision</h3>
      <p>
        To build a community where innovation meets creativity — one bit and one
        byte at a time.
      </p>

      <h3 className="my-4">Core Values</h3>
      <ul>
        <li>💡 Innovation</li>
        <li>🤝 Collaboration</li>
        <li>🚀 Growth</li>
        <li>❤️ Passion for Tech</li>
      </ul>
    </div>
  </div>
</section>


        {/* EVENT GALLERY SECTION */}
        <section id="upcoming-events">
        
        </section>

        {/* UPCOMING EVENTS SECTION */}
      
        <section id="event-gallery">
          <CircularGalleryFrontend />
        </section>

        {/* CAROUSELS */}
        <section id="event-carousel">
          <EventCarousel /> {/* ✅ Carousel for upcoming events */}
        </section> 
        
        {/* COMMITTEE MEMBERS SECTION */}
        <section id="committee-members">
         <Carousel />
        </section>

{/* CONTACTS + BLOGS SECTION */}
<section id="content-section" className="content-section">
  <div className="contacts">
    <ContactSection />
  </div>

  <div className="blogs">
    <CardFrontend />
  </div>
</section>

        
      </main>
    </div>
  );
};

export default App;
