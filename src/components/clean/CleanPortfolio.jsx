import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Moon, Sun, Mail } from "lucide-react";
import "./CleanPortfolio.css";
import profileImage from "../../assets/about/image1.webp";

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

const skills = [
  "react",
  "node.js",
  "python",
  "machine learning",
  "rag pipelines",
  "fine-tuning",
];

const experience = [
  {
    role: "full stack developer intern",
    place: "olive crypto systems",
    time: "jun 2025 – jul 2025",
    points: [
      " - built a mern-based internal training platform with role-based dashboards for employees, trainers, and admins",
      " - integrated skill assessments, progress tracking, certificates, and audit-ready compliance logs",
    ],
  }
];

const projects = [
  {
    name: "about",
    path: "/clean/about",
    description: "my background, skills, and experience",
  },
  {
    name: "home",
    path: "/clean/home",
    description: "collection of my recent projects and work",
  },
  {
    name: "library",
    path: "/clean/library",
    description: "digital academic library platform",
  },
  {
    name: "lumora",
    path: "/clean/lumora",
    description: "web design and development",
  },
  {
    name: "olive",
    path: "/clean/olive",
    description: "crypto systems internal platform",
  },
  {
    name: "seminar",
    path: "/clean/seminar",
    description: "campus event scheduling system",
  },
  {
    name: "draft",
    path: "/clean/draft",
    description: "blogging platform with rich features",
  },
  {
    name: "work",
    path: "/clean/work",
    description: "project showcase and portfolio",
  },
];

const papers = [
  {
    venue: "Under review",
    title:
      "Domain Adaptation for ASR via Synthetic Data Augmentation: A LoRA Fine-tuning Study on Whisper",
    description:
      "replication of the DAS framework using Llama3-8B and Tacotron2-DDC for synthetic data generation, evaluated on Common Voice 17.0 with WER reduction as the key metric",
    href: null,
  },
];

const blogs = [
  {
    title: "technical blogs",
    description: "notes on ml, full-stack architecture, and applied ai",
    href: null,
  },
  {
    title: "guides",
    description: "walkthroughs on tools, workflows, and placement prep",
    href: null,
  },
];

export default function CleanPortfolio() {
  const [theme, setTheme] = useState("dark");
  const nextTheme = theme === "dark" ? "light" : "dark";

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
        {/* ── About ── */}
        <section className="clean-section" id="about">
          <h1>about me</h1>
          <div className="clean-copy">
            <p>
              i am pre-final year student, studying information technology at VNRVJIET, hyderabad.
            </p>
            <p>
              currently, exploring agenti ai and cloud.
            </p>
          </div>
          <div className="clean-tags">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="clean-section" id="experience">
          <h2>experience</h2>
          <div className="clean-timeline">
            {experience.map((job) => (
              <article key={job.role}>
                <span className="clean-dot" />
                <div>
                  <div className="clean-row">
                    <h3>{job.role}</h3>
                    <time>{job.time}</time>
                  </div>
                  <p className="clean-place">{job.place}</p>
                  {job.points.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="clean-section" id="projects">
          <h2>projects</h2>
          <div className="clean-list">
            {projects.map((project) => (
              <Link
                className="clean-list-item"
                key={project.name}
                to={project.path}
              >
                <strong>{project.name}</strong>
                <span>{project.description}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Papers ── */}
        <section className="clean-section" id="papers">
          <h2>papers</h2>
          <div className="clean-list">
            {papers.map((paper) => (
              <article className="clean-list-item clean-paper" key={paper.title}>
                <span className="clean-venue">{paper.venue}</span>
                {paper.href ? (
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clean-paper-title"
                  >
                    {paper.title}
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                ) : (
                  <strong className="clean-paper-title">{paper.title}</strong>
                )}
                <span>{paper.description}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ── Blogs ── */}
        <section className="clean-section" id="blogs">
          <h2>blogs</h2>
          <div className="clean-list">
            {blogs.map((blog) =>
              blog.href ? (
                <a
                  className="clean-list-item"
                  key={blog.title}
                  href={blog.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{blog.title}</strong>
                  <span>{blog.description}</span>
                </a>
              ) : (
                <article className="clean-list-item" key={blog.title}>
                  <strong>{blog.title}</strong>
                  <span>{blog.description}</span>
                </article>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}