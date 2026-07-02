import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import resumePdf from "../../assets/Ashish_s_Resume.pdf";
import "./CleanPortfolio.css";

const resumeUrl = resumePdf;

const profiles = [
  {
    name: "leetcode",
    link: "https://leetcode.com/u/AshishLukka/",
    desc: "250+ problems solved, with a rating of 1680.",
  },
  {
    name: "codechef",
    link: "https://www.codechef.com/users/ashishlukka",
    desc: "1390 rated across 29 contests, 120 problems solved.",
  },
  {
    name: "codeforces",
    link: "https://codeforces.com/profile/ashish_lukka",
    desc: "competing in rated rounds to build speed and problem intuition.",
  },
  {
    name: "geeksforgeeks",
    link: "https://www.geeksforgeeks.org/profile/ashishlukka",
    desc: "revisiting core cs fundamentals and interview-style questions.",
  },
];

export default function CodingProfiles() {
  const location = useLocation();
  const active = location.pathname === "/profiles" ? "profiles" : "home";

  return (
    <div className="cp-page">
      <aside className="cp-sidebar">
        <Link to="/" className="cp-name">ashish lukka</Link>

        <nav className="cp-nav">
          <Link to="/" className={active === "home" ? "cp-active" : ""}>
            home
          </Link>
          <Link to="/profiles" className={active === "profiles" ? "cp-active" : ""}>
            profiles
          </Link>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            resume <LuArrowUpRight size={12} />
          </a>
        </nav>

        <div className="cp-sidebar-links">
          <a href="https://www.linkedin.com/in/ashish-lukka/" target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
          <a href="https://github.com/ashishlukka1" target="_blank" rel="noopener noreferrer">
            github
          </a>
        </div>
      </aside>

      <main className="cp-content">
        <section className="cp-section">
          <div className="cp-section-label">coding profiles</div>
          {profiles.map((profile) => (
            <div key={profile.name} className="cp-profile-item">
              <div className="cp-profile-row">
                <div className="cp-profile-name">{profile.name}</div>
                <a href={profile.link} target="_blank" rel="noopener noreferrer">
                  view <LuArrowUpRight size={12} />
                </a>
              </div>
              <div className="cp-profile-desc">{profile.desc}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
