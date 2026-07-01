import React, { useState, useEffect } from "react";
import "./Work.css";
import OliveCryptoImage from "../../../assets/home/olive_crypto.webp";
import LibraryImage from "../../../assets/home/library.webp";
import BlogAppImage from "../../../assets/home/draftblogapp.webp";
import SeminarHallImage from "../../../assets/home/seminarhall.webp";
import LumoraImage from "../../../assets/home/lumora.webp";
import { useNavigate } from "react-router-dom";

export default function Work() {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [loading, setLoading] = useState(true);

  const workImages = [
    { src: OliveCryptoImage, alt: "Olive Crypto Systems" },
    { src: LibraryImage, alt: "Digital Academic Library" },
    { src: BlogAppImage, alt: "Draft BlogApp" },
    { src: SeminarHallImage, alt: "Campus Hall Scheduler" },
    { src: LumoraImage, alt: "Lumora" }
  ];

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

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
          <span className="loader-text">  Hold on now Brodigy... :)</span>
        </div>
      )}

      <div
        className="work-container"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.8s ease" }}
      >
        {workImages.map((img, index) => (
          <div
            key={index}
            className="work-image-wrapper"
            onClick={() => handleImageClick(img.alt)}
          >
            <img
              src={img.src}
              alt={img.alt}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            <span>{img.alt}</span>
          </div>
        ))}
      </div>
    </>
  );
}
