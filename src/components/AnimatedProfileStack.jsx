"use client";
import React from "react";
import CardSwap from "@/componentsy/CardSwap/CardSwap";
import ProfileCard from "./ProfileCard/ProfileCard";
import "./AnimatedProfileStack.css";

const ProfileCardSwap = () => {
  return (
    <div className="profilecardswap-wrapper">
      <CardSwap
        width={420}             // ProfileCard dimensions
        height={540}
        delay={4000}            // 4 seconds between swaps
        cardDistance={70}
        verticalDistance={60}
        skewAmount={4}
        pauseOnHover={true}
      >
        {/* --- CARD 1 --- */}
        <ProfileCard
          avatarUrl="/avatars/avatar1.jpg"
          miniAvatarUrl="/avatars/avatar1.jpg"
          name="Priti Verma"
          title="Creative Developer"
          handle="pritidev"
          status="Online"
          contactText="Connect"
          behindGlowEnabled={true}
          behindGlowColor="rgba(120, 180, 255, 0.6)"
          className="profile-swap-card"
        />

        {/* --- CARD 2 --- */}
        <ProfileCard
          avatarUrl="/avatars/avatar2.jpg"
          miniAvatarUrl="/avatars/avatar2.jpg"
          name="Aarav Nair"
          title="UI/UX Designer"
          handle="aaravnair"
          status="Available"
          contactText="Message"
          behindGlowEnabled={true}
          behindGlowColor="rgba(255, 200, 150, 0.55)"
          className="profile-swap-card"
        />

        {/* --- CARD 3 --- */}
        <ProfileCard
          avatarUrl="/avatars/avatar3.jpg"
          miniAvatarUrl="/avatars/avatar3.jpg"
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Offline"
          contactText="Ping"
          behindGlowEnabled={true}
          behindGlowColor="rgba(200, 255, 220, 0.6)"
          className="profile-swap-card"
        />
      </CardSwap>
    </div>
  );
};

export default ProfileCardSwap;
