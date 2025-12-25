import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProfileCard from "./ProfileCard/ProfileCard.jsx";
import "./ProfileCard/ProfileCard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ✅ Safe fallback profiles (used only if backend fails or is empty) */
const SAMPLE_PROFILES = [
  {
    name: "AVADH MEHTA",
    title: "Software Engineer",
    handle: "javicodes",
    status: "Online",
    avatarUrl: "https://picsum.photos/id/1025/800/600",
    miniAvatarUrl: "https://picsum.photos/id/1025/200/200",
    behindGlowEnabled: true,
    innerGradient: "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
  },
  {
    name: "OM NARKAR",
    title: "Product Designer",
    handle: "mayap",
    status: "Available",
    avatarUrl: "https://picsum.photos/id/1005/800/600",
    miniAvatarUrl: "https://picsum.photos/id/1005/200/200",
    behindGlowEnabled: true,
  },
  {
    name: "ADITYA NARKAR",
    title: "Fullstack Developer",
    handle: "liamdev",
    status: "Busy",
    avatarUrl: "https://picsum.photos/id/1011/800/600",
    miniAvatarUrl: "https://picsum.photos/id/1011/200/200",
  },
  {
    name: "PRASHAM MEHTA",
    title: "Data Scientist",
    handle: "sofiar",
    status: "Online",
    avatarUrl: "https://picsum.photos/id/1012/800/600",
    miniAvatarUrl: "https://picsum.photos/id/1012/200/200",
  },
  {
    name: "ATHARVA PADTE",
    title: "DevOps Engineer",
    handle: "alexk",
    status: "Offline",
    avatarUrl: "https://picsum.photos/id/1019/800/600",
    miniAvatarUrl: "https://picsum.photos/id/1019/200/200",
  },
];

export default function Carousel({
  apiUrl = import.meta.env.VITE_API_BASE
    ? `${import.meta.env.VITE_API_BASE}/api/profiles`
    : "http://localhost:5001/api/profiles",
  slidesToShow = 3,
  centerMode = true,
  autoplay = true,
  autoplaySpeed = 3500,
}) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profiles from backend (MongoDB Atlas → Express → React)
  useEffect(() => {
    let cancelled = false;

    async function fetchProfiles() {
      console.log("📡 Fetching profiles from:", apiUrl);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data = await res.json();

        if (!cancelled) {
          if (Array.isArray(data) && data.length > 0) {
            console.log(`✅ Received ${data.length} profiles`);
            setProfiles(data);
          } else {
            console.warn("⚠️ No profiles in DB, using fallback sample data");
            setProfiles(SAMPLE_PROFILES);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching profiles:", err.message);
        if (!cancelled) setProfiles(SAMPLE_PROFILES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProfiles();
    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  // ✅ React Slick configuration (drag/swipe enabled)
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    centerMode,
    centerPadding: "60px",
    autoplay,
    autoplaySpeed,
    draggable: true,       // ✅ allows mouse drag
    swipe: true,           // ✅ allows touch swipe
    pauseOnHover: true,    // ✅ pauses autoplay while hovering
    pauseOnFocus: true,    // ✅ pauses autoplay when focused
    touchThreshold: 10,    // ✅ smoother swipe response
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: Math.min(2, slidesToShow) } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "20px" } },
    ],
  };

  // ✅ UI States
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 30, color: "#fff" }}>
        Loading profiles…
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div style={{ textAlign: "center", padding: 30, color: "#fff" }}>
        No profiles available
      </div>
    );
  }

  // ✅ Render profiles inside Slick Slider
  return (
    <div
      style={{
        padding: "30px 16px",
        maxWidth: "1400px",
        margin: "0 auto",
        userSelect: "none", // ✅ prevents text highlighting while dragging
        cursor: "grab",     // ✅ visual cue for draggable area
      }}
    >
      <Slider {...settings}>
        {profiles.map((p, idx) => {
  const profile = {
    name: p.name ?? "No name",
    title: p.title ?? "",
    handle: p.handle ?? `user${idx}`,
    status: p.status ?? "",
    avatarUrl:
      p.avatarUrl ??
      p.image ??
      SAMPLE_PROFILES[idx % SAMPLE_PROFILES.length].avatarUrl,
    miniAvatarUrl: p.miniAvatarUrl ?? p.avatarUrl,
    iconUrl: p.iconUrl,
    behindGlowEnabled: !!p.behindGlowEnabled,
    innerGradient: p.innerGradient ?? undefined,
    contactText: p.contactText ?? "Contact",
    linkedin: p.linkedin,
  };

  return (
    <div key={p._id ?? idx} style={{ padding: 12, outline: "none" }}>
      <ProfileCard
        avatarUrl={profile.avatarUrl}
        iconUrl={profile.iconUrl}
        miniAvatarUrl={profile.miniAvatarUrl}
        innerGradient={profile.innerGradient}
        behindGlowEnabled={profile.behindGlowEnabled}
        name={profile.name}
        title={profile.title}
        handle={profile.handle}
        status={profile.status}
        contactText={profile.contactText}
        onContactClick={() => {
  let url = profile.linkedin;

  if (url) {
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    alert(`Contact ${profile.name}`);
  }
}}

      />
    </div>
  );
})}

      </Slider>
    </div>
  );
}
