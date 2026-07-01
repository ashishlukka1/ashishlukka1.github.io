import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Moon, Sun, Mail, ArrowLeft } from "lucide-react";
import "./CleanPortfolio.css";
import profileImage from "../../assets/about/image1.webp";

// Import all typography components
import TypoAbout from "../typography/About/About";
import TypoHome from "../typography/Home/Home";
import TypoLibrary from "../typography/Library/Library";
import TypoLumora from "../typography/Lumora/Lumora";
import TypoOlive from "../typography/Olive/Olive";
import TypoSeminar from "../typography/Seminar/Seminar";
import TypoDraft from "../typography/Draft/Draft";
import TypoWork from "../typography/Work/Work";

const resumeUrl =
  "https://drive.google.com/file/d/1RyuWviYavfKwAKXNPUavKwIr0cZufC1Y/view?usp=sharing";

const navItems = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "papers", href: "#papers" },
  { label: "blogs", href: "#blogs" },
  { label: "resume", href: resumeUrl, external: true },
];

const projects = [
  {
    name: "about",
    component: TypoAbout,
    description: "my background, skills, and experience",
    details: {
      techStack: ["React", "Node.js", "Express", "MongoDB", "Java", "Python", "JavaScript", "MySQL", "Notion", "Postman"],
      education: "B.Tech Information Technology - VNRVJIET (CGPA: 9.08)",
    },
  },
  {
    name: "home",
    component: TypoHome,
    description: "collection of my recent projects and work",
    details: {
      role: "Co-Founder at Lumora",
      experience: "Full Stack Developer Intern at Olive Crypto Systems",
    },
  },
  {
    name: "library",
    component: TypoLibrary,
    description: "digital academic library platform",
    details: {
      projectName: "Digital Academic Library",
      event: "Webathon 3.0 By ACM VNRVJIET",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "WebSockets", "Twilio", "Gemini AI"],
      duration: "24 Hours (Hackathon)",
      teamMembers: ["Ashish Lukka", "Srikar Janjirala", "Swaroop Mallidi", "Shaik Afzal Elahi", "Abhinav Cheruku"],
      demo: "https://digital-academic-library.vercel.app/",
      github: "https://github.com/ashishlukka1/digital-academic-library",
    },
  },
  {
    name: "lumora",
    component: TypoLumora,
    description: "web design and development",
    details: {
      projectName: "Lumora – Learning Platform",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Clerk Auth"],
      duration: "2 weeks",
      meansOfAccess: "Students (restricted to college)",
      demo: "https://lumora.vercel.app",
      github: "https://github.com/ashishlukka1/lumora",
    },
  },
  {
    name: "olive",
    component: TypoOlive,
    description: "crypto systems internal platform",
    details: {
      projectName: "Olive Crypto Systems",
      company: "Olive Crypto Systems",
      duration: "June 2025 — July 2025",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      team: "Web Development Team",
      demo: "https://olive-skill-test.vercel.app/login",
      github: "https://github.com/ashishlukka1/skill-caravan",
    },
  },
  {
    name: "seminar",
    component: TypoSeminar,
    description: "campus event scheduling system",
    details: {
      projectName: "Campus Hall Scheduler",
      event: "Seminar Hall Booking System",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "EmailJS", "Firebase"],
      duration: "3 weeks",
      roleBasedAccess: ["Clubs", "Director(Admin)", "Users(Faculties)"],
      demo: "https://vnrvjiet-seminar-hall.vercel.app",
    },
  },
  {
    name: "draft",
    component: TypoDraft,
    description: "blogging platform with rich features",
    details: {
      projectName: "Draft – Blog App",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk Auth"],
      duration: "2 weeks",
      roleBasedAccess: ["Admin", "Author", "Reader"],
      demo: "https://draft-blogapp.vercel.app",
      github: "https://github.com/ashishlukka1/draft-blogapp",
    },
  },
  {
    name: "work",
    component: TypoWork,
    description: "project showcase and portfolio",
    details: {
      role: "Full Stack Developer",
      projects: ["Olive Crypto Systems", "Digital Academic Library", "Draft BlogApp", "Campus Hall Scheduler", "Lumora"],
    },
  },
];

export default function CleanProjectDetail() {
  const { projectName } = useParams();
  const [theme, setTheme] = useState("dark");
  const nextTheme = theme === "dark" ? "light" : "dark";

  const currentProject = projects.find((p) => p.name === projectName);
  const ProjectComponent = currentProject?.component;

  return (
    <main className={`clean-page clean-${theme}`}>
      <aside className="clean-sidebar" aria-label="Portfolio navigation">
        <div className="clean-profile">
          <img src={profileImage} alt="Ashish Lukka" />
          <Link className="clean-name" to="/">
            ashish lukka
          </Link>
          <p className="clean-role">it student & ml enthusiast</p>
        </div>

        <nav className="clean-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.label}
              {item.external && <ArrowUpRight size={14} strokeWidth={2} />}
            </a>
          ))}
        </nav>

        <button
          className="clean-theme-toggle"
          type="button"
          onClick={() => setTheme(nextTheme)}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          <span>{nextTheme} mode</span>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div className="clean-social-links" aria-label="Social links">
          <a
            href="https://github.com/ashishlukka1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashish-lukka/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a href="mailto:ashishlukka@gmail.com" aria-label="Email">
            <Mail size={19} />
          </a>
        </div>

        <p className="clean-footer">© 2026 ashish lukka</p>
      </aside>

      <div className="clean-content">
        <div className="clean-project-detail">
          {/* Back Link */}
          <Link to="/clean" className="clean-back-link">
            <ArrowLeft size={16} />
            back to projects
          </Link>

          {/* Project Content and Details */}
          <div className="clean-project-main">
            {/* Left: Project Content */}
            <section className="clean-project-content">
              {ProjectComponent ? (
                <ProjectComponent />
              ) : (
                <div>Project not found</div>
              )}
            </section>

            {/* Right: Project Details */}
            {currentProject?.details && (
              <aside className="clean-project-sidebar">
                {Object.entries(currentProject.details).map(([key, value]) => {
                  if (!value) return null;

                  // Format the title
                  const title = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .toLowerCase()
                    .trim();

                  // Handle different types of values
                  if (Array.isArray(value)) {
                    return (
                      <div className="clean-detail-section" key={key}>
                        <h3>{title}</h3>
                        <div className={key.includes("Stack") || key.includes("Access") ? "clean-tech-list" : key.includes("Members") || key.includes("projects") ? "clean-members-list" : "clean-role-list"}>
                          {value.map((item) => (
                            key.includes("Stack") || key.includes("Access") ? (
                              <span key={item}>{item}</span>
                            ) : (
                              <p key={item}>{item}</p>
                            )
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Handle URLs
                  if (typeof value === "string" && (value.includes("http") || value.includes("github") || value.includes("vercel"))) {
                    return (
                      <div className="clean-detail-section" key={key}>
                        <h3>{title}</h3>
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clean-link"
                        >
                          {value}
                        </a>
                      </div>
                    );
                  }

                  // Handle regular text
                  return (
                    <div className="clean-detail-section" key={key}>
                      <h3>{title}</h3>
                      <p>{value}</p>
                    </div>
                  );
                })}
              </aside>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
