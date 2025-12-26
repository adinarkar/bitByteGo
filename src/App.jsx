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
     INSPIRE.CODE.SUCCEED
      </p>

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
