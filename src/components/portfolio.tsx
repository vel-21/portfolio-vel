import { Fragment, useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bell, Check, CheckCircle2,
  CircleDot, ClipboardCheck, FileText, Filter, GitBranch,
  Mail, Menu, Moon, Play, Send, Sparkles, Sun, Table2, Users,
  Workflow, Wrench, X, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { projects, deliveryPolicy, type Project } from "@/lib/portfolio";
import { contact } from "@/lib/contact";

const navigation = [
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
];

const services = [
  { icon: Users, title: "Lead qualification & CRM pipelines", description: "Turn incoming leads into scored, organized opportunities." },
  { icon: Send, title: "Instant, personal follow-ups", description: "Email, voice AI and proposals that keep the conversation moving." },
  { icon: FileText, title: "Invoices & documents to Sheets", description: "Extract the details, check the data and skip the copy-paste." },
  { icon: Wrench, title: "Automation rescue", description: "Fix and document broken n8n, Make or Zapier workflows." },
];

const process = [
  { title: "Map the process", description: "A short call to understand your tools, your workflow and what’s slowing you down." },
  { title: "Agree on the scope", description: "A written scope and a fixed price. You’ll know exactly what’s included." },
  { title: "Build, test, hand over", description: "A working demo early. Then clear documentation and a Loom walkthrough." },
  { title: "Keep it running", description: `A ${deliveryPolicy.fixWindowDays}-day fix window after delivery, so you’re not left figuring it out alone.` },
];

const tools = ["n8n", "Make", "Zapier", "Airtable", "Google Sheets", "Gmail", "HubSpot", "Gemini", "Claude", "OpenAI"];

const workflowIcons: Record<string, [LucideIcon, LucideIcon, LucideIcon, LucideIcon]> = {
  "speed-to-lead": [Users, Sparkles, Table2, Mail],
  "invoice-to-sheets": [FileText, Sparkles, ClipboardCheck, Table2],
  "job-triage": [FileText, Sparkles, Filter, Bell],
  "proposal-drafter": [FileText, Sparkles, Mail, ClipboardCheck],
};

function HireButton({ compact = false }: { compact?: boolean }) {
  return (
    <Button asChild variant="portfolio" size={compact ? "sm" : "portfolio"}>
      <a href={contact.upwork} target="_blank" rel="noopener noreferrer">
        {compact ? "Let’s talk" : "Hire me on Upwork"}<ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function WorkflowPreview({ project }: { project: Project }) {
  const icons = workflowIcons[project.id];
  if (!icons) return null;
  return (
    <div className="workflow-preview" role="img" aria-label={`Illustrative workflow: ${project.nodes.join(" to ")}`}>
      <span className="preview-label"><CircleDot size={10} /> Demo build</span>
      <span className="preview-caption">WORKFLOW OVERVIEW</span>
      <div className="flow-track" aria-hidden="true">
        {project.nodes.map((node, index) => {
          const Icon = icons[index];
          if (!Icon) return null;
          return (
            <Fragment key={node}>
              {index > 0 && <div className="flow-connector" />}
              <div className="flow-node">
                <div className="flow-symbol"><Icon strokeWidth={1.6} /></div>
                <span className="flow-name">{node}</span>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="flow-summary"><CheckCircle2 size={11} />{project.summary}</div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <WorkflowPreview project={project} />
      <div className="project-body">
        <div className="project-title-row">
          <h3>{project.title}</h3><span className="project-number">0{index + 1}</span>
        </div>
        <p className="project-result">{project.result}</p>
        <div className="tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="caseStudy" className="mt-5" aria-label={`View case study: ${project.title}`}>
              View case study <ArrowUpRight aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent className="case-study">
            <DialogHeader>
              <span className="eyebrow mb-3">Demo build</span>
              <DialogTitle className="text-2xl leading-snug pr-5">{project.title}</DialogTitle>
              <DialogDescription>{project.result}</DialogDescription>
            </DialogHeader>
            <div><h3>Problem</h3><p>{project.problem}</p></div>
            <div><h3>What I built</h3><p>{project.built}</p></div>
            <div><h3>How it works</h3><ol>{project.steps.map(step => <li key={step}>{step}</li>)}</ol></div>
            <div className="case-result"><h3>Result</h3><p>{project.result}</p></div>
            {project.loom && (
              <div>
                <h3>Loom walkthrough</h3>
                <a className="loom-link" href={project.loom} target="_blank" rel="noopener noreferrer"><Play size={14} /> Watch the walkthrough<ArrowUpRight aria-hidden="true" /></a>
              </div>
            )}
            <div>
              <h3>Workflow diagram</h3>
              <figure className="case-media">
                <a href={project.media.flow} target="_blank" rel="noopener noreferrer">
                  <img src={project.media.flow} width={1600} height={900} loading="lazy" alt={`Workflow diagram for the ${project.title} demo build`} />
                </a>
                <figcaption>Built in n8n · click to open full size</figcaption>
              </figure>
            </div>
            <div>
              <h3>Test run result</h3>
              <figure className="case-media">
                <a href={project.media.result} target="_blank" rel="noopener noreferrer">
                  <img src={project.media.result} width={1600} height={900} loading="lazy" alt={`Test run result for the ${project.title} demo build`} />
                </a>
                <figcaption>Live n8n test run · click to open full size</figcaption>
              </figure>
            </div>
            <div className="border-t pt-5"><HireButton /></div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("juvel-theme") === "dark";
      setDark(saved);
      document.documentElement.classList.toggle("dark", saved);
    } catch { /* Theme still works if storage is unavailable. */ }
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("juvel-theme", next ? "dark" : "light"); } catch { /* Optional preference. */ }
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="page-container flex h-full items-center justify-between gap-4">
          <a href="#main" className="flex items-center gap-3" aria-label="Juvel Bergantin home">
            <img src="/favicon.svg" width={35} height={35} alt="" className="brand-mark" />
            <span className="brand-name">Juvel Bergantin<span className="hidden sm:inline text-muted-foreground font-normal"> / AI Automation</span></span>
          </a>
          <div className="flex items-center gap-3 sm:gap-6">
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
              {navigation.map(item => <a className="nav-link" href={`#${item.id}`} key={item.id}>{item.label}</a>)}
            </nav>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun /> : <Moon />}
            </Button>
            <div className="hidden sm:block"><HireButton compact /></div>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="relative z-30 mobile-nav md:hidden">
          <div className="page-container flex justify-between">
            {[...navigation, { id: "contact", label: "Contact" }].map(item => <a href={`#${item.id}`} className="nav-link" key={item.id} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          </div>
        </nav>}
      </header>

      <main id="main">
        <section className="hero page-container" aria-labelledby="hero-title">
          <div className="eyebrow">AI automation specialist</div>
          <h1 id="hero-title">I automate the <em>admin</em><br className="hidden sm:block" /> that slows your<br className="hidden sm:block" /> business down.</h1>
          <p className="hero-description">Lead follow-up, CRM updates and document data entry, built in n8n with AI, running on your own accounts.</p>
          <div className="hero-actions">
            <HireButton />
            <Button asChild variant="portfolioOutline" size="portfolio"><a href="#projects">See the work<ArrowDown aria-hidden="true" /></a></Button>
          </div>
          <p className="availability"><CircleDot size={12} /><span>Based in the Philippines (UTC+8), overlapping Australian business hours and US evenings.</span></p>
          <div className="hero-baseline"><span>LESS BUSYWORK. MORE BUSINESS.</span><span><Workflow size={13} /> BUILT IN n8n · OWNED BY YOU</span></div>
        </section>

        <section id="services" className="section" aria-labelledby="services-title">
          <div className="page-container">
            <div className="section-heading">
              <div><div className="eyebrow">01 / Services</div><h2 id="services-title">Your repetitive work. Automated.</h2></div>
              <p className="section-intro">Practical systems that fit the tools you already use. No unnecessary complexity.</p>
            </div>
            <div className="services-grid">{services.map(({ icon: Icon, title, description }) => <article className="service-card" key={title}>
              <div className="service-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></div>
              <h3>{title}</h3><p>{description}</p>
            </article>)}</div>
          </div>
        </section>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div className="page-container">
            <div className="section-heading">
              <div><div className="eyebrow">02 / Selected projects</div><h2 id="projects-title">Less talk. More working workflows.</h2></div>
              <p className="section-intro">Four demo builds. Real workflows, concrete results, and a look at how they work.</p>
            </div>
            <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
          </div>
        </section>

        <section id="process" className="section" aria-labelledby="process-title">
          <div className="page-container">
            <div className="eyebrow">03 / How I work</div><h2 id="process-title">Clear scope. No surprises.</h2>
            <div className="process-grid">{process.map((step, index) => <div key={step.title}>
              <span className="step-number">0{index + 1}<ArrowRight size={14} className="ml-auto" aria-hidden="true" /></span>
              <h3>{step.title}</h3><p>{step.description}</p>
            </div>)}</div>
          </div>
        </section>

        <section className="tools-section" aria-label="Tools I work with">
          <div className="page-container"><div className="eyebrow">The right tools for the job</div><div className="tools-row">{tools.map(tool => <span className="tool" key={tool}>{tool}</span>)}</div></div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="page-container about-grid">
            <div className="portrait-placeholder" aria-label="Juvel Bergantin photo placeholder"><span className="portrait-initials">JB</span><span className="portrait-label">PHOTO COMING SOON</span></div>
            <div className="about-copy">
              <div className="eyebrow">04 / A little about me</div><h2 id="about-title">Hi, I’m Juvel.</h2>
              <p>I’m a Computer Science student at Camarines Sur Polytechnic Colleges, building practical AI automations for small businesses and agencies.</p>
              <p>My background in customer service at Concentrix taught me that a system is only useful if people can actually use it. I focus on automations that are reliable, documented and easy to hand over—not a black box you have to depend on me to maintain.</p>
              <div className="about-signature flex items-center gap-2"><Check size={15} className="text-primary" /> Built for your business. On your accounts.</div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <div className="page-container">
            <div className="eyebrow">05 / Let’s work together</div>
            <h2 id="contact-title">What’s taking up<br />too much of your time?</h2>
            <p>Tell me the tools you use and the task that eats your time. I’ll reply with a plan.</p>
            <div className="contact-actions"><HireButton /><span className="email-placeholder">{contact.email}</span></div>
          </div>
        </section>
      </main>
      <footer className="page-container site-footer"><span>© 2026 Juvel Bergantin. All rights reserved.</span><span>Philippines · UTC+8 <span className="mx-2">/</span> Less admin, more possibility.</span></footer>
    </>
  );
}