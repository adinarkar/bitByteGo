import React from 'react';
import StaggeredMenu from './components/StaggeredMenu';

export default function Nb({ children }) {
  const menuItems = [
    { label: 'HOME', targetId: 'home' },
    { label: 'EVENT GALLERY', targetId: 'event-gallery' },
    { label: 'COMMITTEE MEMBERS', targetId: 'committee-members' },
    { label: 'UPCOMING EVENTS', targetId: 'event-carousel' },
    { label: 'BLOGS', targetId: 'blogs' },
    { label: 'CONTACTS', targetId: 'contacts' },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ];

  // Smooth scroll function
  const handleScroll = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`❌ No section found with id: ${targetId}`);
    }
  };

  // Pass onClick instead of link
  const updatedMenuItems = menuItems.map((item) => ({
    label: item.label,
    ariaLabel: `Scroll to ${item.label}`,
    onClick: () => handleScroll(item.targetId),
  }));

  return (
    <div className="app-wrapper">
      <header className="navbar-container">
        <StaggeredMenu
          position="right"
          items={updatedMenuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#ffffffff"
          openMenuButtonColor="#000000ff"
          changeMenuColorOnOpen={true}
          colors={['#002', '#0095FF']}
          logoUrl="/vite.png"
          logoHeight="85px"
          accentColor="#061A4C"
          isFixed={true}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </header>

      <main className="app-content">{children}</main>
    </div>
  );
}
