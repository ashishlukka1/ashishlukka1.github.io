import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TiSpiral } from "react-icons/ti";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isOlivePage = location.pathname === "/design/olive-crypto-systems";
  const isLibraryPage = location.pathname === "/design/digital-academic-library";
  const isDraftBlogApp = location.pathname === "/design/draft-blogapp";
  const isSeminarPage = location.pathname === "/design/campus-hall-scheduler";
  const isLumoraPage = location.pathname === "/design/lumora";

  useEffect(() => {
    const handleScroll = () => {
      if (
        isOlivePage ||
        isLibraryPage ||
        isDraftBlogApp ||
        isSeminarPage ||
        isLumoraPage
      ) {
        const bannerSelector = isOlivePage
          ? ".olive-banner"
          : isLibraryPage
          ? ".dal-banner"
          : isDraftBlogApp
          ? ".draft-banner"
          : isSeminarPage
          ? ".seminar-banner"
          : ".lumora-banner";

        const bannerHeight =
          document.querySelector(bannerSelector)?.offsetHeight + 50 || 0;
        setScrolled(window.scrollY > bannerHeight - 60);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOlivePage, isLibraryPage, isDraftBlogApp, isSeminarPage, isLumoraPage]);

  return (
    <nav
      className={`navbarxu ${scrolled ? "scrolled" : ""} ${
        isOlivePage && !scrolled ? "olive-theme" : ""
      } ${isLibraryPage && !scrolled ? "library-theme" : ""} ${
        isDraftBlogApp && !scrolled ? "draft-theme" : ""
      } ${isSeminarPage && !scrolled ? "seminar-theme" : ""} ${
        isLumoraPage && !scrolled ? "lumora-theme" : ""
      }`}
    >
      <div className="navbar-content">
        <NavLink to="/design" className="logo-text">
            <TiSpiral  size={35} color="grey"/>
        </NavLink>
        <ul className="nav-links1">
          <li>
            <NavLink
              to="/design/work"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              WORK
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/design/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1RyuWviYavfKwAKXNPUavKwIr0cZufC1Y/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              RESUME
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
