import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./CleanPortfolio.css";

const resumeUrl =
  "https://drive.google.com/file/d/1ewA0xWqfyDv7X9TrqRSCvW6Nxjyspj-1/view?usp=sharing";

const skills = [
  "java","dsa","MERN","ml/dl",
];

const experience = [
  {
    role: "full stack developer intern",
    place: "olive crypto systems",
    time: "jun 2025 – jul 2025",
    points: [
      "architected and developed a scalable MERN-based training platform handling 500+ concurrent users, with RESTful APIs optimized for a 40% reduction in response time and Microsoft OAuth/SSO-based role authentication for secure access control.",
      "built an audit-ready compliance system with real-time activity monitoring and an automated certification engine using a 3-tier validation hierarchy (admin, checker, employee) for structured course approval and issuance.",
    ],
  },
];

const projects = [
  {
    name: "parameter efficient domain adaptation on whisper",
    desc: "whisper ASR fine-tuned with LoRA using synthetic speech data for ASR domain adaptation — 29.3% relative WER reduction on weather, 19.9% on music, 4.4% on pports",
    github: "https://github.com/Janjirala-Srikar/Lora_Whisper",
  },
  {
    name: "olive skill test",
    desc: "internal training platform built during internship at olive crypto systems",
    github: "https://github.com/ashishlukka1/skill-caravan",
    demo: "https://olive-skill-test.vercel.app/",
  },
  {
    name: "sales ticket",
    desc: "turns support tickets into revenue intelligence — an AI platform that extracts structured signals from Zendesk conversations using deterministic classification and graph-based memory, paired with a RAG-based copilot for context-aware, conversational insight.",
    github: "https://github.com/ashishlukka1/sales-ticket",
    demo: "https://salesticket.buildwithlumora.tech",
  },
  {
    name: "quantera",
    desc: "ocr + llm pipeline that extracts structured data from medical reports and answers questions via a rag-powered conversational assistant",
    github: "https://github.com/ashishlukka1/lab-report-agent",
  },
  {
    name: "digital academic library",
    desc: "centralized mern platform for academic resource sharing with role-based access, discussion forums, book booking, and a gemini-powered chatbot — won 1st at webathon 3.0",
    github: "https://github.com/ashishlukka1/Digital-Academic-Library",
    demo: "https://digital-academic-library.vercel.app",
  },
  {
    name: "draft",
    desc: "full mern blog platform with role-based access (admin/author/user), clerk auth, and a rich text editor",
    github: "https://github.com/ashishlukka1/draft-blogapp",
    demo: "https://draft-blogapp.vercel.app",
  },
  {
    name: "lumora",
    desc: "web platform giving college students clerk-authenticated access to curated mern stack learning videos",
    github: "https://github.com/ashishlukka1/lumora",
    demo: "https://lumora-stack.netlify.app",
  },
  {
    name: "seminar hall",
    desc: "web app for booking seminar halls at vnrvjiet",
    github: "https://github.com/ashishlukka1/seminar-hall",
    demo: "https://vnrvjiet-seminar-hall.vercel.app",
  }
];

const sections = ["about", "experience", "projects"];

export default function CleanPortfolio() {
  const [active, setActive] = useState("about");
  const [showAll, setShowAll] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = sectionRefs.current[id];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="cp-page">
      <aside className="cp-sidebar">
        <Link to="/design" className="cp-name">ashish lukka</Link>

        <nav className="cp-nav">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "cp-active" : ""}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
            >
              {id}
            </a>
          ))}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">resume</a>
        </nav>


        <div className="cp-sidebar-links">
          <a href="https://www.linkedin.com/in/ashish-lukka/" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="https://github.com/ashishlukka1" target="_blank" rel="noopener noreferrer">github</a>
        </div>
      </aside>

      <main className="cp-content">
        {/* About */}
        <section
          id="about"
          className="cp-section cp-about"
          ref={(el) => (sectionRefs.current["about"] = el)}
        >
          <div className="cp-section-label">about</div>
          <p>pre-final year information technology student at vnrvjiet, hyderabad.</p>
          <p>currently exploring machine-learning and cloud. building things on the web.</p>
          <div className="cp-tags">
            {skills.map((s) => <span key={s}>{s}</span>)}
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="cp-section"
          ref={(el) => (sectionRefs.current["experience"] = el)}
        >
          <div className="cp-section-label">experience</div>
          {experience.map((job) => (
            <div className="cp-exp-item" key={job.role}>
              <div className="cp-exp-row">
                <span className="cp-exp-role">{job.role}</span>
                <span className="cp-exp-time">{job.time}</span>
              </div>
              <div className="cp-exp-place">{job.place}</div>
              {job.points.map((p) => <div className="cp-exp-point" key={p}>— {p}</div>)}
            </div>
          ))}
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="cp-section"
          ref={(el) => (sectionRefs.current["projects"] = el)}
        >
          <div className="cp-section-label">projects</div>
          {(showAll ? projects : projects.slice(0, 4)).map((p) => (
            <div key={p.name} className="cp-project-item">
              <div className="cp-project-row">
                <div className="cp-project-name">{p.name}</div>
                <div className="cp-project-links">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">github</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">demo ↗</a>}
                </div>
              </div>
              <div className="cp-project-desc">{p.desc}</div>
            </div>
          ))}
          <button className="cp-show-more" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 9L1 4h10L6 9z" fill="currentColor"/></svg> show less</>
            ) : (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3l5 5H1l5-5z" fill="currentColor"/></svg> show more</>
            )}
          </button>
        </section>
      </main>
    </div>
  );
}
