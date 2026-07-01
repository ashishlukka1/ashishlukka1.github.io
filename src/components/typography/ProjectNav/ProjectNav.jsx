import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OliveCryptoImage from "../../../assets/home/olive_crypto.webp";
import LibraryImage from "../../../assets/home/library.webp";
import BlogAppImage from "../../../assets/home/draftblogapp.webp";
import SeminarHallImage from "../../../assets/home/seminarhall.webp";
import LumoraImage from "../../../assets/home/lumora.webp";
import "./ProjectNav.css";

export default function ProjectNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const projects = [
    { src: OliveCryptoImage, alt: "Olive Crypto Systems", path: "/design/olive-crypto-systems" },
    { src: LibraryImage, alt: "Digital Academic Library", path: "/design/digital-academic-library" },
    { src: BlogAppImage, alt: "Draft BlogApp", path: "/design/draft-blogapp" },
    { src: SeminarHallImage, alt: "Campus Hall Scheduler", path: "/design/campus-hall-scheduler" },
    { src: LumoraImage, alt: "Lumora", path: "/design/lumora" },
  ];

  // find index of active project
  const activeIndex = projects.findIndex((p) => p.path === location.pathname);

  // pick 4 projects so that active is always at index 1
  let visibleProjects = [];
  if (activeIndex !== -1) {
    for (let i = -1; i < 3; i++) {
      const index = (activeIndex + i + projects.length) % projects.length;
      visibleProjects.push(projects[index]);
    }
  }

  return (
    <div className="project-nav">
      {visibleProjects.map((proj, i) => {
        const isActive = proj.path === location.pathname;
        return (
          <div
            key={i}
            className={`project-nav-item ${isActive ? "active" : ""}`}
            onClick={() => navigate(proj.path)}
          >
            <img src={proj.src} alt={proj.alt} loading="lazy" />
          </div>
        );
      })}
    </div>
  );
}
