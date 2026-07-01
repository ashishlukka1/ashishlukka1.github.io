import React, { useState, useEffect } from "react";
import "./Home.css";
import OliveCryptoImage from "../../../assets/home/olive_crypto.webp";
import LibraryImage from "../../../assets/home/library.webp";
import BlogAppImage from "../../../assets/home/draftblogapp.webp";
import SeminarHallImage from "../../../assets/home/seminarhall.webp";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const allImages = [
    {
      src: OliveCryptoImage,
      alt: "Olive-Crypto-Systems",
    },
    {
      src: LibraryImage,
      alt: "Digital-Academic-Library",
    },
    {
      src: BlogAppImage,
      alt: "Draft-BlogApp",
    },
    {
      src: SeminarHallImage,
      alt: "Campus-Hall-Scheduler",
    },
  ];

  useEffect(() => {
    // show loader briefly, then fade
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (alt) => {
    navigate(`/design/${alt.replace(/\s+/g, "-").toLowerCase()}`);
  };

  return (
    <>
      {loading && (
        <div className={`loader ${!loading ? "fade-out" : ""}`}>
          <span className="loader-text">Hold on now Brodigy... :)</span>
        </div>
      )}

      <div
        className="home-container"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.8s ease" }}
      >
        {/* Intro Section */}
        <div className="intro-section">
          <div className="star star-left">
            <svg fill="none" height="68" viewBox="0 0 68 68" width="68" xmlns="http://www.w3.org/2000/svg"><path d="m29.201 4.40976c1.4024-4.795399 8.1956-4.795399 9.598 0l4.8413 16.55444c.4787 1.6368 1.7587 2.9168 3.3955 3.3955l16.5544 4.8413c4.7954 1.4024 4.7954 8.1956 0 9.598l-16.5544 4.8413c-1.6368.4787-2.9168 1.7587-3.3955 3.3955l-4.8413 16.5544c-1.4024 4.7954-8.1956 4.7954-9.598 0l-4.8413-16.5544c-.4787-1.6368-1.7587-2.9168-3.3955-3.3955l-16.55444-4.8413c-4.795399-1.4024-4.795399-8.1956 0-9.598l16.55444-4.8413c1.6368-.4787 2.9168-1.7587 3.3955-3.3955z" fill="#98a1a0ff"/></svg>
          </div>

          <h1 className="intro-title">
            Hi. I'm Ashish. <br /> A Developer.
          </h1>

          <div className="star star-right">
           <svg fill="none" height="68" viewBox="0 0 68 68" width="68" xmlns="http://www.w3.org/2000/svg"><path d="m29.201 4.40976c1.4024-4.795399 8.1956-4.795399 9.598 0l4.8413 16.55444c.4787 1.6368 1.7587 2.9168 3.3955 3.3955l16.5544 4.8413c4.7954 1.4024 4.7954 8.1956 0 9.598l-16.5544 4.8413c-1.6368.4787-2.9168 1.7587-3.3955 3.3955l-4.8413 16.5544c-1.4024 4.7954-8.1956 4.7954-9.598 0l-4.8413-16.5544c-.4787-1.6368-1.7587-2.9168-3.3955-3.3955l-16.55444-4.8413c-4.795399-1.4024-4.795399-8.1956 0-9.598l16.55444-4.8413c1.6368-.4787 2.9168-1.7587 3.3955-3.3955z" fill="#98a1a0ff"/></svg>
          </div>

          <p className="intro-subtitle">
            Co-Founder of{" "}
            <a
              href="https://buildwithlumora.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lumora
            </a>
            , and previously Intern at{" "}
            <a
              href="https://olivecrypto.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Olive Crypto Systems
            </a>
            .
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {allImages.map((img, index) => (
            <div
              key={index}
              className="image-wrapper"
              onClick={() => handleImageClick(img.alt)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ minHeight: "200px", background: "#f0f0f0" }}
              />
              <div className="caption">
                <span>{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
