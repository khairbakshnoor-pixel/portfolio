"use client";

import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { portfolio as p, projects, repositories, type Project, type Repository } from "@/data/portfolio";
import { Icon, type IconName } from "./icons";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} initial={false} whileInView={{ y: [14, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, accent, description }: { eyebrow: string; title: string; accent: string; description?: string }) {
  return <Reveal className="section-heading"><p className="eyebrow"><span />{eyebrow}</p><h2>{title}<br /><span className="text-muted">{accent}</span></h2>{description && <p className="section-description">{description}</p>}</Reveal>;
}

function MagneticLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const reduced = useReducedMotion();
  return <a className={`button ${secondary ? "button-secondary" : "button-primary"}`} href={href}
    onPointerMove={e => { if (reduced || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.055}px, ${(e.clientY - r.top - r.height / 2) * 0.08}px)`; }}
    onPointerLeave={e => { e.currentTarget.style.transform = ""; }}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuContainer = useRef<HTMLDivElement>(null);
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("kb-theme", next); } catch { /* Theme works without storage. */ }
  }
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (open && !menuContainer.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <header className="header"><div className="nav-shell" ref={menuContainer}>
    <a className="brand" href="#home" aria-label={`${p.name} — ${p.footer.back}`}>{p.initials}<span>.</span><span className="brand-name">{p.name}</span></a>
    <nav className={`nav-links ${open ? "is-open" : ""}`} id="primary-navigation" aria-label={p.ui.navigation}>
      {p.nav.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>{p.hero.secondary}</a>
    </nav>
    <div className="nav-actions">
      <button type="button" className="icon-button theme-toggle" onClick={toggleTheme}><span className="theme-sun"><Icon name="sun" /><span className="sr-only">{p.ui.light}</span></span><span className="theme-moon"><Icon name="moon" /><span className="sr-only">{p.ui.dark}</span></span></button>
      <a className="nav-contact" href="#contact">{p.hero.secondary}<Icon name="upRight" size={16} /></a>
      <button ref={menuButton} type="button" className="icon-button mobile-menu" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? p.ui.menuClose : p.ui.menuOpen} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
    </div>
  </div></header>;
}

function RoleLine() {
  const [role, setRole] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setRole(value => (value + 1) % p.hero.roles.length), 3600);
    return () => clearInterval(interval);
  }, [reduced]);
  return <div className="role-line"><span className="role-marker">↳</span><span className="sr-only">{p.title}</span><span aria-hidden="true"><AnimatePresence mode="wait"><motion.span className="role-text" key={role} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.25 }}>{p.hero.roles[role]}</motion.span></AnimatePresence></span></div>;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || reduced) return;
    const control = animate(0, value, { duration: 1.3, onUpdate: number => { if (ref.current) ref.current.textContent = Math.round(number).toString(); } });
    return () => control.stop();
  }, [inView, reduced, value]);
  return <div className="stat"><strong><span ref={ref}>{value}</span><span className="stat-suffix">{suffix}</span></strong><span>{label}</span></div>;
}

function Hero() {
  return <section className="hero section-shell" id="home" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="availability"><span className="status-dot" />{p.availability}</div>
      <p className="hero-intro">{p.hero.introduction} <span>{p.name}</span></p>
      <h1 id="hero-title">{p.hero.line1}<br /><span>{p.hero.line2}</span></h1>
      <RoleLine />
      <p className="hero-description">{p.hero.description}</p>
      <div className="hero-actions"><MagneticLink href="#work">{p.hero.primary}<Icon name="arrow" /></MagneticLink><MagneticLink href="#contact" secondary>{p.hero.secondary}<Icon name="upRight" size={18} /></MagneticLink></div>
      <div className="hero-socials"><span>{p.hero.eyebrow}</span><a href={p.github} aria-label={p.contact.socialLabels.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} /></a><a href={p.linkedin} aria-label={p.contact.socialLabels.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} /></a></div>
    </div>
    <div className="hero-focus">
      <p className="tiny-label hero-focus-heading">{p.hero.focusLabel}</p>
      <div className="hero-focus-list">
        {p.hero.specialties.map((specialty, index) => <div className="hero-focus-item" key={specialty}><span className="hero-focus-number">0{index + 1}</span><span>{specialty}</span></div>)}
      </div>
      <p className="hero-focus-location"><Icon name="pin" size={15} />{p.location}</p>
    </div>
    <div className="hero-bottom"><div className="stats">{p.stats.map(stat => <Stat key={stat.label} {...stat} />)}</div><a href="#about" className="scroll-cue"><span>{p.hero.scroll}</span><Icon name="arrow" size={18} /></a></div>
  </section>;
}

function ChatbotShowcase() {
  const chatbotProjects = projects.filter(project => project.category.includes("Chatbots") && p.chatbotShowcase.projects.includes(project.id));
  return <section id="chatbots" className="chatbot-showcase section-shell" aria-labelledby="chatbot-showcase-title">
    <div className="chatbot-showcase-heading">
      <p className="eyebrow"><span />{p.chatbotShowcase.eyebrow}</p>
      <h2 id="chatbot-showcase-title">{p.chatbotShowcase.title}<br /><span>{p.chatbotShowcase.accent}</span></h2>
      <p>{p.chatbotShowcase.description}</p>
      <a className="chatbot-showcase-link" href="#work">{p.chatbotShowcase.caseLabel}<Icon name="arrow" size={17} /></a>
    </div>
    <div className="chatbot-showcase-grid">
      {chatbotProjects.map(project => <article className="chatbot-feature" key={project.id}>
        <div className="chatbot-feature-copy">
          <div className="chatbot-feature-record"><span className="chatbot-feature-kicker">{project.type}</span><span>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span></div>
          <h3>{project.subtitle}</h3>
          <p>{project.description}</p>
          <div className="chatbot-feature-actions">
            {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{p.chatbotShowcase.liveLabel}<Icon name="upRight" size={15} /></a>}
            <a href="#work">{p.chatbotShowcase.caseLabel}<Icon name="arrow" size={15} /></a>
          </div>
        </div>
      </article>)}
    </div>
  </section>;
}

function About() {
  return <section id="about" className="section section-shell"><div className="about-layout"><div><SectionHeading {...p.about} /><p className="about-location"><Icon name="pin" size={16} />{p.location}</p></div><div><div className="about-copy">{p.about.paragraphs.map(text => <p key={text}>{text}</p>)}</div><div className="about-note"><span className="status-dot" />{p.about.note}</div></div></div><div className="focus-grid">{p.about.focus.map((item, index) => <Reveal key={item.title} className="focus-item"><span className="focus-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></section>;
}

function Experience() {
  return <section id="experience" className="section section-shell experience-section"><SectionHeading {...p.experience} /><div className="timeline">{p.experience.entries.map(entry => <Reveal className="timeline-item" key={entry.company}><div className="timeline-date"><span>{entry.date}</span>{entry.current && <span className="current-label"><span className="status-dot" />{p.ui.current}</span>}</div><div className="timeline-content"><span className={`timeline-node ${entry.current ? "active" : ""}`} /><div className="job-heading"><div><h3>{entry.role}</h3><p className="job-company">{entry.company}<span> / {entry.mode}</span></p></div><Icon name="upRight" size={22} /></div><p className="job-description">{entry.description}</p><ul>{entry.points.map(point => <li key={point}>{point}</li>)}</ul><div className="chips">{entry.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></Reveal>)}</div></section>;
}

function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!project || !dialog) return;
    dialog.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; dialog.close(); };
  }, [project]);
  return <dialog ref={ref} className="case-dialog" aria-labelledby="case-title" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    {project && <div className="case-inner"><button autoFocus type="button" className="icon-button case-close" aria-label={p.work.closeLabel} onClick={onClose}><Icon name="close" /></button><div className="case-body"><span className="eyebrow">{project.type}</span><h2 id="case-title">{project.subtitle}</h2><p className="case-intro">{project.description}</p><h3>{p.work.problemLabel}</h3><p>{project.problem}</p><h3>{p.work.builtLabel}</h3><ul>{project.built.map(item => <li key={item}>{item}</li>)}</ul><div className="case-result"><h3>{p.work.resultLabel}</h3><p>{project.result}</p></div><h3>{p.work.stackLabel}</h3><div className="chips">{project.stack.map(item => <span key={item}>{item}</span>)}</div>{(project.repo || project.demo) && <div className="case-links">{project.repo && <a className="button button-secondary" href={project.repo} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} />{p.work.repoLabel}<Icon name="upRight" size={16} /></a>}{project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noopener noreferrer">{p.work.demoLabel}<Icon name="upRight" size={16} /></a>}</div>}</div></div>}
  </dialog>;
}

function RepositoryCard({ repository }: { repository: Repository }) {
  return <article className="repo-card">
    <a className="repo-main" href={repository.url} target="_blank" rel="noopener noreferrer">
      <div><Icon name="github" size={21} /><Icon name="upRight" size={17} /></div>
      <h3>{repository.name}</h3>
      <p>{repository.description}</p>
      <span className="repo-language"><i />{repository.language}</span>
    </a>
    {repository.demo && <a className="repo-demo" href={repository.demo} target="_blank" rel="noopener noreferrer">{p.githubSection.demoLabel}<Icon name="upRight" size={14} /></a>}
  </article>;
}

function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter(project => filter === "All" ? expanded || project.featured : project.category.some(category => category === filter));
  return <section id="work" className="section work-section"><div className="section-shell"><SectionHeading {...p.work} /><div className="work-toolbar"><div className="filters" role="group" aria-label={p.ui.filter}>{p.work.filters.map(item => <button type="button" key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "All" && <span>{projects.length}</span>}</button>)}</div><span className="project-count" role="status">{visible.length} {p.ui.projectCount}</span></div>
    <div className="project-grid">{visible.map(project => <Reveal key={project.id}><article className="project-card"><button className="project-open" type="button" onClick={() => setSelected(project)} aria-label={`${p.work.caseLabel}: ${project.subtitle}`}><div className="project-body"><div className="project-kicker"><span className="project-category">{project.category[0]}</span><span className="project-number">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span><Icon name="upRight" size={20} /></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-meta"><div className="project-stack">{project.stack.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div>{project.metric && <div className="project-metric"><strong>{project.metric.value}</strong><span>{project.metric.label}</span></div>}</div><span className="project-read">{p.work.caseLabel}<Icon name="arrow" size={16} /></span></div></button>{project.demo && <a className="project-live-link" href={project.demo} target="_blank" rel="noopener noreferrer">Open live project<Icon name="upRight" size={14} /></a>}</article></Reveal>)}</div>
    {filter === "All" && <div className="show-more"><button className="button button-secondary" type="button" onClick={() => { if (expanded) document.getElementById("work")?.scrollIntoView({ behavior: "instant" }); setExpanded(!expanded); }}>{expanded ? p.work.fewerLabel : `${p.work.allLabel} (${projects.length})`}<Icon name="chevron" style={{ transform: expanded ? "rotate(180deg)" : undefined }} size={17} /></button></div>}
    <div className="lab-row"><span className="tiny-label lab-title"><Icon name="code" size={17} />{p.lab.eyebrow}</span><div>{p.lab.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p><span className="tiny-label">{item.stack}</span></article>)}</div></div>
    <CaseStudy project={selected} onClose={() => setSelected(null)} />
  </div></section>;
}

function Skills() {
  return <section id="skills" className="section section-shell"><SectionHeading {...p.skills} /><div className="skills-grid">{p.skills.groups.map((group, i) => <Reveal key={group.title} className={`skill-card skill-card-${i}`}><div className="skill-heading"><span className="skill-icon"><Icon name={group.icon as IconName} size={24} /></span><span className="skill-number">0{i + 1}</span></div><h3>{group.title}</h3><p>{group.subtitle}</p><div className="chips skill-chips">{group.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>)}</div></section>;
}

function Education() {
  return <section id="education" className="section section-shell"><SectionHeading {...p.education} /><div className="education-grid"><Reveal className="degree-card"><Icon name="book" size={35} /><div><span className="tiny-label">{p.education.institution}</span><h3>{p.education.degree}</h3><p>{p.education.detail}</p></div><div className="degree-score"><strong>{p.education.score}</strong><span>{p.education.scoreLabel}</span></div></Reveal><div className="certificates">{p.education.certifications.map((item, i) => <Reveal className="certificate" key={item.title}><span className="certificate-number">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.issuer}</p></div><span>{item.duration}</span></Reveal>)}</div></div></section>;
}

function Github() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All languages");
  const languages = Array.from(new Set(repositories.map(repository => repository.language))).sort();
  const matchingRepositories = repositories.filter(repository => {
    const matchesQuery = `${repository.name} ${repository.description} ${repository.language}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (language === "All languages" || repository.language === language);
  });
  return <section id="github" className="section section-shell">
    <div className="github-heading">
      <SectionHeading {...p.githubSection} />
      <a className="text-link" href={p.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} />{p.githubSection.linkLabel}<Icon name="upRight" size={17} /></a>
    </div>
    <div className="repo-grid">{repositories.filter(repo => repo.pinned).map(repo => <Reveal key={repo.name}><RepositoryCard repository={repo} /></Reveal>)}</div>
    <details className="more-repos">
      <summary>{p.githubSection.moreLabel}<span className="repo-total">{repositories.length} projects</span><Icon name="chevron" size={17} /></summary>
      <div>
        <div className="repo-browser">
          <label className="repo-search"><span className="sr-only">Search all GitHub projects</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects or technologies" /></label>
          <label className="repo-language-filter"><span className="sr-only">Filter GitHub projects by language</span><select value={language} onChange={event => setLanguage(event.target.value)}><option>All languages</option>{languages.map(item => <option key={item}>{item}</option>)}</select></label>
        </div>
        <p className="repo-results" role="status">Showing {matchingRepositories.length} of {repositories.length} public projects</p>
        {matchingRepositories.length > 0
          ? <div className="repo-grid repo-catalog">{matchingRepositories.map(repo => <Reveal key={repo.name}><RepositoryCard repository={repo} /></Reveal>)}</div>
          : <p className="repo-empty">No projects match that search. Try another name or language.</p>}
        <a className="repo-profile-link" href={`${p.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">{p.githubSection.archiveLabel}<Icon name="arrow" size={17} /></a>
      </div>
    </details>
  </section>;
}

function Contact() {
  const [status, setStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = `${p.contact.emailSubject} ${String(form.get("name")).trim()}`;
    const body = `Name: ${String(form.get("name")).trim()}\nEmail: ${String(form.get("email")).trim()}\n\n${String(form.get("message")).trim()}`;
    window.location.href = `mailto:${p.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(p.contact.status);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(p.email); setCopyStatus(p.contact.copied); } catch { setCopyStatus(p.contact.copyFailed); }
  }
  return <section id="contact" className="section contact-section"><div className="section-shell contact-grid"><div><SectionHeading {...p.contact} /><p className="contact-description">{p.contact.description}</p><div className="email-row"><a href={`mailto:${p.email}`}>{p.email}</a><button type="button" className="icon-button" aria-label={p.contact.copy} onClick={copy}><Icon name={copyStatus === p.contact.copied ? "check" : "copy"} size={18} /></button></div><p className="copy-status" role="status">{copyStatus}</p><div className="contact-socials"><a href={p.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} />{p.contact.socialLabels.linkedin}<Icon name="upRight" size={15} /></a><a href={p.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} />{p.contact.socialLabels.github}<Icon name="upRight" size={15} /></a></div><div className="contact-location"><Icon name="pin" size={17} />{p.location}<span>·</span>{p.about.note}</div></div><Reveal className="contact-form-wrap"><form onSubmit={submit}><h3>{p.contact.formTitle}</h3><div className="form-pair"><label>{p.contact.nameLabel}<input name="name" required autoComplete="name" placeholder={p.contact.namePlaceholder} maxLength={100} /></label><label>{p.contact.emailLabel}<input name="email" type="email" required autoComplete="email" placeholder={p.contact.emailPlaceholder} maxLength={254} /></label></div><label>{p.contact.messageLabel}<textarea name="message" required rows={4} placeholder={p.contact.messagePlaceholder} minLength={10} maxLength={3000} /></label><button className="button button-primary" type="submit">{p.contact.submit}<Icon name="upRight" size={18} /></button><p className="form-note">{p.contact.note}</p><p className="form-status" role="status">{status}</p></form></Reveal></div></section>;
}

function Footer() {
  return <footer className="footer section-shell"><div className="footer-top"><a href="#home" className="brand">{p.initials}<span>.</span></a><p>{p.footer.note}</p><a className="text-link" href={p.cv.available ? p.cv.href : `mailto:${p.email}?subject=${encodeURIComponent(p.cv.subject)}`} download={p.cv.available || undefined}><Icon name={p.cv.available ? "download" : "mail"} size={16} />{p.cv.available ? p.cv.label : p.cv.unavailableLabel}</a></div><div className="footer-bottom"><span>© {p.footer.copyright} {p.fullName}</span><a href="#home">{p.footer.back}<Icon name="arrow" size={15} /></a></div></footer>;
}

export default function Portfolio() {
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">{p.ui.skip}</a><Header /><main id="main"><Hero /><ChatbotShowcase /><div className="section-rule section-shell"><span /><Icon name="spark" size={19} /><span /></div><About /><Experience /><Projects /><Skills /><Education /><Github /><Contact /></main><Footer /></MotionConfig>;
}
