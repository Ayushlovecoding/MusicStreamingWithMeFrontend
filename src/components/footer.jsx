// src/components/Footer.jsx
import React from 'react';
import meImage from '../assets/frontend-assets/me.jpg'; // Adjusted to your correct path

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center gap-3 p-4 border-t border-background-light bg-background-dark text-caption">
      <img
        src={meImage}
        alt="Ayush Sharma"
        className="w-10 h-10 rounded-full object-cover shadow-sm"
      />
      <p className="text-caption">@ 2030 ALL rights reserved • Created by Ayush Sharma</p>
    </div>
  );
};

export default Footer;
