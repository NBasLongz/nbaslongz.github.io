import React, { useEffect, useMemo, useRef, useState } from "react";

const profile = {
  name: "Nguyen Ba Long",
  role: "Computer Science Student",
  target: "AI/ML Engineer Intern",
  email: "longnguyen132005@gmail.com",
  github: "https://github.com/NBasLongz",
  linkedin: "https://www.linkedin.com/in/nbl2005/",
  resume: "/NguyenBaLongCV.pdf",
};

const projects = [
  {
    title: "DashBot: A3C Dashboard Generation",
    category: "RL",
    type: "Paper Reimplementation",
    description:
      "A paper-based dashboard generation system that recommends charts from CSV data using an A3C-style reinforcement learning workflow.",
    stack: ["Python", "PyTorch", "FastAPI", "A3C", "JavaScript"],
    pipeline:
      "CSV upload → data profiling → insight detection → constrained action sampling → A3C reward calculation → dashboard chart recommendation",
    metrics: ["A3C workflow", "Actor-Critic", "Dashboard generation"],
    link: "https://github.com/NBasLongz/Dashbot-a3c-dashboard-generation",
    accent: "cyan",
  },
  {
    title: "Temporal RAG for UIT Course Video Retrieval",
    category: "RAG",
    type: "Team Project",
    description:
      "A team-built RAG Q&A system for course learning materials using hybrid retrieval, backend APIs, and evaluation tools.",
    stack: ["FastAPI", "LangGraph", "ChromaDB", "Elasticsearch", "RAGAS"],
    pipeline:
      "User question → query routing → BM25 + vector retrieval → context fusion/reranking → answer generation → RAGAS/Langfuse evaluation",
    metrics: ["BM25 + vector", "RAGAS", "Docker"],
    link: "https://github.com/NBasLongz/A-Temporal-RAG-Framework-for-UIT-Course-Video-Retrieval",
    accent: "violet",
  },
  {
    title: "Vietnamese Hate Speech Detector",
    category: "NLP",
    type: "NLP Application",
    description:
      "A Vietnamese text classification system for detecting clean, offensive, and hate speech content with FastAPI deployment.",
    stack: ["Python", "Scikit-learn", "FastAPI", "Underthesea", "TF-IDF"],
    pipeline:
      "Vietnamese text input → teencode expansion → word segmentation → TF-IDF vectorization → ML classification → FastAPI prediction response",
    metrics: ["Macro F1 > 0.73", "FastAPI", "Web UI"],
    link: "https://github.com/NBasLongz/Vietnamese-Hate-Speech-Detector",
    accent: "blue",
  },
  {
    title: "Self-Refined RL Reward Designer",
    category: "RL",
    type: "Paper Adaptation",
    description:
      "A lightweight RL experiment that uses LLM-generated reward functions and Q-Learning in a 2D Gridworld environment.",
    stack: ["Python", "Flask", "Q-Learning", "LLM API", "Gridworld"],
    pipeline:
      "Task prompt → LLM-generated reward function → Q-Learning agent training → policy evaluation → feedback loop → refined reward design",
    metrics: ["Q-Learning", "Gridworld", "Reward loop"],
    link: "https://github.com/NBasLongz/self-refined-llm-reward-design-reproduction-remake-with2D",
    accent: "green",
  },
];

const otherProjects = [
  {
    title: "Sentiment and Topic Analysis for Vietnamese Course Reviews",
    category: "NLP",
    description:
      "Vietnamese course review analysis system for sentiment classification and topic detection using PhoBERT/mBERT experiments with a Streamlit demo.",
    stack: ["Python", "PyTorch", "Transformers", "PhoBERT", "mBERT", "Streamlit"],
    pipeline:
      "Raw feedback → preprocessing → PhoBERT/mBERT tokenizer → multi-task model → sentiment class + topic probabilities → Streamlit demo", 
    details: ["Sentiment: negative / neutral / positive", "Topics: lecturer / training program / facility / others", "Utilities for training, evaluation, inference"],
    link: "https://github.com/NBasLongz/SENTIMENT-AND-TOPIC-ANALYSIS-OF-VIETNAMESE-UNIVERSITY-STUDENTS-COURSE-EVALUATIONS",
    accent: "violet",
  },
  {
    title: "DS200 Big Data Analysis",
    category: "Big Data",
    description:
      "Big Data coursework project using Hadoop MapReduce, Apache Pig, and Spark RDD on MovieLens data for rating analysis and reporting.",
    stack: ["Java", "Hadoop", "Apache Pig", "Spark RDD", "Maven", "MovieLens"],
    pipeline:
      "MovieLens files → Hadoop/Pig/Spark processing → rating aggregations → statistical summaries → output files + screenshots",
    details: ["Lab 01: Hadoop MapReduce", "Lab 02: Apache Pig scripts", "Lab 03: Spark RDD with Java"],
    link: "https://github.com/NBasLongz/DS200.Q21.1.LAB_BigDataAnalysis",
    accent: "blue",
  },
  {
    title: "Predicting Citation Trend in CS Publications",
    category: "Data Mining",
    description:
      "Data mining project for predicting citation trends in computer science papers using scraped metadata, topic features, and regression models.",
    stack: ["Python", "FastAPI", "Next.js", "Selenium", "Random Forest", "XGBoost"],
    pipeline:
      "Paper metadata scraping → preprocessing → feature merging → text embeddings / BERTopic → regression models → FastAPI + Next.js app",
    details: ["Sources: arXiv, Google Scholar, Hugging Face, Semantic Scholar", "Models: Linear Regression, Random Forest, XGBoost", "Metrics: R², RMSE, MAE"],
    link: "https://github.com/NBasLongz/Predicting-Citation-Trend-In-Computer-Science-Publications",
    accent: "green",
  },
  {
    title: "Multi Retrieval Video Search System",
    category: "Retrieval",
    description:
      "Hybrid video search system that combines CLIP/OpenCLIP visual embeddings, transcript search, Flask APIs, and a JavaScript web UI.",
    stack: ["Flask", "OpenCLIP", "Milvus", "Elasticsearch", "Whisper", "Docker"],
    pipeline:
      "Video files → keyframe extraction → CLIP embeddings → Milvus indexing + Whisper transcripts → Elasticsearch indexing → hybrid search → ranked video results",
    details: ["Text query and transcript search", "Frame-level preview and navigation", "Docker services for Milvus / Elasticsearch"],
    link: "https://github.com/NBasLongz/Multi_Retrieval_System",
    accent: "cyan",
  },
];

const skillGroups = [
  {
    title: "Languages",
    icon: "CODE",
    items: ["Python", "Java", "C/C++", "SQL", "JavaScript"],
  },
  {
    title: "ML / Deep Learning",
    icon: "ML",
    items: ["PyTorch", "TensorFlow/Keras", "Scikit-learn", "Hugging Face", "BERT-based models", "TF-IDF"],
  },
  {
    title: "NLP / RAG",
    icon: "RAG",
    items: ["Underthesea", "LangChain", "LangGraph", "BM25", "Vector Search", "Hybrid Retrieval", "Reranking"],
  },
  {
    title: "Backend / Data",
    icon: "API",
    items: ["FastAPI", "Flask", "PostgreSQL", "SQLAlchemy", "Pydantic", "RESTful API", "ChromaDB", "Milvus", "Elasticsearch"],
  },
  {
    title: "Tools / UI",
    icon: "DEV",
    items: ["Docker", "Docker Compose", "Git", "GitHub", "Streamlit", "Gradio", "Jupyter Notebook", "Next.js", "Selenium"],
  },
];

const filters = ["All", "RL", "RAG", "NLP"];

function runPortfolioTests() {
  return [
    { name: "shows exactly 4 featured projects", pass: projects.length === 4 },
    {
      name: "every project has a GitHub link",
      pass: projects.every((project) => project.link.startsWith("https://github.com/")),
    },
    {
      name: "every project has at least 4 stack tags",
      pass: projects.every((project) => project.stack.length >= 4),
    },
    {
      name: "every project has a complete pipeline",
      pass: projects.every((project) => project.pipeline.split("→").length >= 5),
    },
    {
      name: "every project has three metric chips",
      pass: projects.every((project) => project.metrics.length === 3),
    },
    { name: "skill matrix has 5 groups", pass: skillGroups.length === 5 },
    { name: "other projects section has 4 compact projects", pass: otherProjects.length === 4 },
    {
      name: "every other project has a detailed pipeline",
      pass: otherProjects.every((project) => project.pipeline && project.pipeline.split("→").length >= 5),
    },
    {
      name: "every other project has detail bullets",
      pass: otherProjects.every((project) => project.details && project.details.length >= 3),
    },
    {
      name: "every other project has a GitHub link",
      pass: otherProjects.every((project) => project.link.startsWith("https://github.com/")),
    },
    { name: "profile has contact links", pass: Boolean(profile.email && profile.github && profile.linkedin) },
  ];
}

const smokeTests = runPortfolioTests();

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -70px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[850ms] ease-out ${
        visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[2px]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Badge({ children, accent = "cyan" }) {
  const styles = {
    cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    violet: "border-violet-300/20 bg-violet-300/10 text-violet-100",
    blue: "border-blue-300/20 bg-blue-300/10 text-blue-100",
    green: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[accent] || styles.cyan}`}>
      {children}
    </span>
  );
}

function IconButton({ href, children, label }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/70 text-slate-300 transition hover:-translate-y-1 hover:border-cyan-300/60 hover:text-cyan-200"
    >
      {children}
    </a>
  );
}

function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1020]" />
      <div className="absolute right-[-12%] top-[-10%] h-[38rem] w-[38rem] rounded-full bg-violet-500/14 blur-[120px] animate-aurora" />
      <div className="absolute left-[-12%] bottom-[-15%] h-[34rem] w-[34rem] rounded-full bg-cyan-400/14 blur-[120px] animate-aurora-delayed" />
      <div className="absolute left-[35%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-[110px] animate-liquid" />
      <div className="absolute right-[10%] bottom-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-400/7 blur-[110px] animate-liquid-delayed" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:54px_54px]" />
      <div className="absolute inset-0 opacity-[0.055] bg-[radial-gradient(circle_at_20%_20%,white_0_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,.14),transparent_42%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1020]/30 to-[#0B1020]" />
    </div>
  );
}

function CursorLiquidGlow() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-70 transition duration-300"
      style={{
        background: `radial-gradient(520px circle at ${position.x}% ${position.y}%, rgba(34,211,238,.12), rgba(139,92,246,.07), transparent 58%)`,
      }}
    />
  );
}

function TerminalHeroCard() {
  const lines = [
    { text: "$ python app.py --mode rag", color: "text-slate-400" },
    { text: "[INFO] Initializing LangGraph workflow...", color: "text-cyan-300" },
    { text: "[INFO] Loading ChromaDB vector store...", color: "text-cyan-300" },
    { text: "> Query: \"What is A3C?\"", color: "text-blue-300" },
    { text: "[INFO] Retrieving context (BM25 + Vector)...", color: "text-slate-400" },
    { text: "[READY] Portfolio system online.", color: "text-emerald-300" },
  ];

  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-r from-blue-400/20 via-cyan-400/10 to-violet-500/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.7rem] liquid-card-strong p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(96,165,250,.16),transparent_34%),radial-gradient(circle_at_0%_100%,rgba(34,211,238,.10),transparent_32%)]" />
        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/90" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
              <span className="h-3 w-3 rounded-full bg-green-400/90" />
            </div>
            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              terminal
            </span>
          </div>
          <div className="rounded-[1.25rem] border border-slate-800 bg-[#0B1020]/90 p-5 font-mono text-sm shadow-inner shadow-black/40">
            <div className="space-y-3">
              {lines.map((line) => (
                <p key={line.text} className={line.color}>
                  {line.text}
                </p>
              ))}
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <span>&gt;</span>
                <span className="h-5 w-2 animate-cursor rounded-sm bg-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-slate-400">{subtitle}</p>}
    </div>
  );
}

function HighlightCard({ value, label, accent }) {
  const colors = {
    cyan: "text-cyan-300 hover:border-cyan-300/50",
    violet: "text-violet-300 hover:border-violet-300/50",
    blue: "text-blue-300 hover:border-blue-300/50",
    green: "text-emerald-300 hover:border-emerald-300/50",
  };

  return (
    <div
      className={`rounded-2xl liquid-card p-6 text-center transition hover:-translate-y-1 ${
        colors[accent] || colors.cyan
      }`}
    >
      <h3 className="font-heading text-3xl font-bold">{value}</h3>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}

function ProjectVisual({ project }) {
  const accentMap = {
    cyan: {
      glow: "bg-cyan-400/20",
      stroke: "#67E8F9",
      fill: "rgba(34, 211, 238, 0.12)",
      text: "text-cyan-200",
    },
    violet: {
      glow: "bg-violet-400/20",
      stroke: "#C4B5FD",
      fill: "rgba(139, 92, 246, 0.14)",
      text: "text-violet-200",
    },
    blue: {
      glow: "bg-blue-400/20",
      stroke: "#93C5FD",
      fill: "rgba(96, 165, 250, 0.13)",
      text: "text-blue-200",
    },
    green: {
      glow: "bg-emerald-400/20",
      stroke: "#6EE7B7",
      fill: "rgba(16, 185, 129, 0.12)",
      text: "text-emerald-200",
    },
  };
  const theme = accentMap[project.accent] || accentMap.cyan;

  if (project.category === "RAG") {
    return (
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#0B1020]">
        <div className={`absolute h-40 w-40 rounded-full ${theme.glow} blur-3xl transition group-hover:scale-125`} />
        <svg className="relative z-10 h-32 w-56 transition duration-500 group-hover:scale-105" viewBox="0 0 240 140" fill="none">
          <path d="M48 70H96M144 70H192" stroke={theme.stroke} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 6" />
          <rect x="20" y="38" width="56" height="64" rx="16" fill={theme.fill} stroke={theme.stroke} strokeWidth="1.5" />
          <rect x="92" y="26" width="56" height="88" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <rect x="164" y="38" width="56" height="64" rx="16" fill={theme.fill} stroke={theme.stroke} strokeWidth="1.5" />
          <circle cx="48" cy="70" r="10" fill={theme.stroke} fillOpacity="0.8" />
          <circle cx="120" cy="70" r="12" fill={theme.stroke} fillOpacity="0.7" />
          <circle cx="192" cy="70" r="10" fill={theme.stroke} fillOpacity="0.8" />
          <path d="M108 54H132M108 70H132M108 86H126" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className={`absolute bottom-5 z-10 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold ${theme.text}`}>
          Hybrid Retrieval
        </span>
      </div>
    );
  }

  if (project.category === "NLP") {
    return (
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#0B1020]">
        <div className={`absolute h-40 w-40 rounded-full ${theme.glow} blur-3xl transition group-hover:scale-125`} />
        <div className="relative z-10 w-60 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-xl transition duration-500 group-hover:-translate-y-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-44 rounded-full bg-slate-600/70" />
            <div className="h-3 w-36 rounded-full bg-slate-700/70" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-center text-[10px] font-bold text-emerald-200">Clean</div>
              <div className="rounded-lg border border-yellow-300/20 bg-yellow-300/10 px-2 py-1 text-center text-[10px] font-bold text-yellow-200">Offensive</div>
              <div className="rounded-lg border border-red-300/20 bg-red-300/10 px-2 py-1 text-center text-[10px] font-bold text-red-200">Hate</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.title.includes("Self-Refined")) {
    return (
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#0B1020]">
        <div className={`absolute h-40 w-40 rounded-full ${theme.glow} blur-3xl transition group-hover:scale-125`} />
        <svg className="relative z-10 h-36 w-56 transition duration-500 group-hover:rotate-1 group-hover:scale-105" viewBox="0 0 240 150" fill="none">
          <rect x="26" y="48" width="54" height="54" rx="14" fill={theme.fill} stroke={theme.stroke} />
          <rect x="93" y="22" width="54" height="54" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <rect x="160" y="48" width="54" height="54" rx="14" fill={theme.fill} stroke={theme.stroke} />
          <path
            d="M80 70C98 48 106 46 120 49M147 49C165 47 174 54 186 70M160 94C139 121 100 120 80 94"
            stroke={theme.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 6"
          />
          <text x="53" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">LLM</text>
          <text x="120" y="54" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">Reward</text>
          <text x="187" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">Agent</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#0B1020]">
      <div className={`absolute h-40 w-40 rounded-full ${theme.glow} blur-3xl transition group-hover:scale-125`} />
      <div className="relative z-10 grid h-28 w-56 grid-cols-4 items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-xl transition duration-500 group-hover:-translate-y-1 group-hover:scale-105">
        {[72, 42, 58, 86].map((height, index) => (
          <div key={`${height}-${index}`} className="relative flex items-end justify-center rounded-lg bg-slate-800/80">
            <div
              className="w-full rounded-lg bg-gradient-to-t from-cyan-400/80 to-blue-300/80 shadow-[0_0_18px_rgba(34,211,238,.25)]"
              style={{ height: `${height}%`, animationDelay: `${index * 120}ms` }}
            />
          </div>
        ))}
      </div>
      <span className={`absolute bottom-5 z-10 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold ${theme.text}`}>
        Dashboard RL
      </span>
    </div>
  );
}

function PipelineSteps({ pipeline }) {
  const steps = pipeline.split("→").map((step) => step.trim());

  return (
    <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Pipeline</p>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={`${step}-${index}`}>
            <span className="rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-xs font-semibold leading-5 text-slate-100">
              {step}
            </span>
            {index < steps.length - 1 && <span className="text-cyan-300/70">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group overflow-hidden rounded-2xl liquid-card transition hover:-translate-y-2 hover:border-blue-300/40 hover:shadow-2xl hover:shadow-blue-950/30">
      <ProjectVisual project={project} />
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <Badge key={item} accent={project.accent}>
              {item}
            </Badge>
          ))}
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.type}</p>
        <h3 className="font-heading text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p>
        <PipelineSteps pipeline={project.pipeline} />
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <span key={metric} className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-1 text-xs font-semibold text-slate-300">
              {metric}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:gap-3 hover:text-blue-200"
          >
            View Repository <span>→</span>
          </a>
          <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 transition hover:text-white">
            ⌘
          </a>
        </div>
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-8 pb-24 pt-16 md:grid-cols-[1.15fr_0.85fr] md:pt-24 lg:px-10 xl:px-12">
      <Reveal className="space-y-6">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">AI / ML Engineer Portfolio</p>
        <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl">{profile.name}</h1>
        <h2 className="font-heading text-2xl font-medium text-slate-200/85 md:text-3xl">NLP, RAG Systems & Reinforcement Learning</h2>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
          Computer Science student building AI/ML projects in Vietnamese NLP, RAG systems, and reinforcement learning. Seeking internship opportunities to apply machine learning and software engineering skills in real-world projects.
        </p>
        <div className="flex flex-wrap gap-4 pt-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-heading font-medium text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-1 hover:bg-violet-500/90"
          >
            View Projects <span>→</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] px-6 py-3 font-heading font-medium text-slate-100 transition hover:-translate-y-1 hover:border-blue-300/50 hover:text-blue-300"
          >
            GitHub Portfolio <span>↗</span>
          </a>
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] px-6 py-3 font-heading font-medium text-slate-100 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-300"
          >
            Download CV <span>↓</span>
          </a>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <TerminalHeroCard />
      </Reveal>
    </section>
  );
}

function Highlights() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
      <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <HighlightCard value="4" label="Featured Projects" accent="blue" />
        <HighlightCard value="AI/ML" label="NLP, RAG, RL" accent="violet" />
        <HighlightCard value="Full Stack" label="FastAPI, Next.js" accent="cyan" />
        <HighlightCard value="Open" label="Seeking Internships" accent="green" />
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <Reveal className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">01. About</p>
          <h2 className="font-heading text-4xl font-bold text-white">Bridging Research & Implementation</h2>
        </div>
        <div className="space-y-6 md:col-span-3">
          <p className="text-lg leading-relaxed text-slate-400">
            I am a Computer Science student at UIT - VNUHCM with a strong interest in AI/ML, NLP, RAG systems, and reinforcement learning.
          </p>
          <p className="text-lg leading-relaxed text-slate-400">
            I enjoy turning research ideas into practical implementations through project-based learning, system building, and experimentation. My approach combines reading papers with building end-to-end pipelines, from data processing to API demos.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Python", "PyTorch", "FastAPI", "LangChain", "LangGraph", "Docker", "Elasticsearch", "Milvus", "Next.js"].map((item) => (
              <span key={item} className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-sm text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState("All");
  const visibleProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active]
  );

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle
          eyebrow="02. Projects"
          title="What I've Built"
          subtitle="Selected projects from my CV, focused on AI/ML, NLP, RAG systems, and reinforcement learning."
        />
      </Reveal>
      <Reveal delay={80} className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              active === filter
                ? "border-blue-300/50 bg-blue-400/15 text-blue-200"
                : "border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 90}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OtherProjectCard({ project }) {
  const accentStyles = {
    cyan: "hover:border-cyan-300/40 text-cyan-200",
    violet: "hover:border-violet-300/40 text-violet-200",
    blue: "hover:border-blue-300/40 text-blue-200",
    green: "hover:border-emerald-300/40 text-emerald-200",
  };

  return (
    <article className={`h-full rounded-2xl liquid-card p-5 transition hover:-translate-y-1 ${accentStyles[project.accent] || accentStyles.cyan}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {project.category}
        </span>
        <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-500 transition hover:text-white" aria-label={`Open ${project.title}`}>
          ↗
        </a>
      </div>
      <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((item) => (
          <Badge key={item} accent={project.accent}>{item}</Badge>
        ))}
      </div>
      <details className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/35 p-4 text-sm text-slate-400">
        <summary className="cursor-pointer font-semibold text-slate-200 transition hover:text-cyan-200">
          View pipeline and implementation details
        </summary>
        {project.pipeline && <PipelineSteps pipeline={project.pipeline} />}
        {project.details && (
          <ul className="mt-5 space-y-2 text-sm text-slate-400">
            {project.details.map((detail) => (
              <li key={detail} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </details>
    </article>
  );
}

function OtherProjects() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <SectionTitle
          eyebrow="More Work"
          title="Other Projects & Experiments"
          subtitle="Compact cards for broader experience. Technical details stay hidden until opened, so the page remains easy to scan."
        />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {otherProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 80}>
            <OtherProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionTitle eyebrow="03. Skills" title="Tech Stack & Tools" subtitle="Grouped by how I use each tool across my projects and coursework." />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 90}>
            <div className="h-full rounded-2xl liquid-card p-6 transition hover:-translate-y-2 hover:border-cyan-300/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-sm font-black text-cyan-200">
                {group.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-white">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ResumeSnapshot() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
      <Reveal className="mx-auto max-w-2xl">
        <p className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">04. Resume</p>
        <h2 className="mb-8 font-heading text-4xl font-bold text-white">Education & Focus</h2>
        <div className="mb-8 space-y-4 rounded-2xl liquid-card-strong p-8 text-left">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-xl font-semibold text-white">B.Sc. Computer Science</h3>
              <p className="text-blue-300">University of Information Technology - VNUHCM</p>
            </div>
            <span className="rounded-full bg-[#0B1020] px-3 py-1 text-sm text-slate-400">Present</span>
          </div>
          <p className="text-slate-400">
            <span className="font-medium text-slate-100">Focus:</span> AI/ML, NLP, RAG Systems, Reinforcement Learning
          </p>
          <p className="text-slate-400">
            <span className="font-medium text-slate-100">Target:</span> AI/ML Engineering & Research Internships
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-3 font-heading font-medium text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:bg-blue-500/90"
          >
            Download Full CV <span>↓</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] px-8 py-3 font-heading font-medium text-slate-100 transition hover:border-blue-300/50 hover:text-blue-300"
          >
            View GitHub Portfolio <span>↗</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative z-10 overflow-hidden py-24">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/5 blur-[100px]" />
      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">Let's Build Something Together</h2>
        <p className="mb-12 text-lg text-slate-400">Interested in discussing internship opportunities, AI/ML projects, or collaborations? Let's connect.</p>
        <div className="flex justify-center gap-5">
          <IconButton href={`mailto:${profile.email}`} label="Email">✉</IconButton>
          <IconButton href={profile.linkedin} label="LinkedIn">in</IconButton>
          <IconButton href={profile.github} label="GitHub">⌘</IconButton>
        </div>
      </Reveal>
    </section>
  );
}

function PrototypeChecks() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8">
      <details className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4 text-sm text-slate-400">
        <summary className="cursor-pointer font-semibold text-slate-300">Prototype checks</summary>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {smokeTests.map((test) => (
            <p key={test.name} className={test.pass ? "text-emerald-300" : "text-red-300"}>
              {test.pass ? "✓" : "✕"} {test.name}
            </p>
          ))}
        </div>
      </details>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B1020] text-slate-100">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes aurora {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(32px, 24px, 0) scale(1.08); }
        }
        @keyframes cursorBlink { 50% { opacity: 0; } }
        @keyframes liquidMove {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); border-radius: 43% 57% 62% 38% / 44% 41% 59% 56%; }
          33% { transform: translate3d(36px, -28px, 0) scale(1.08) rotate(12deg); border-radius: 62% 38% 44% 56% / 59% 48% 52% 41%; }
          66% { transform: translate3d(-28px, 24px, 0) scale(.96) rotate(-10deg); border-radius: 38% 62% 53% 47% / 45% 61% 39% 55%; }
        }
        @keyframes glassShine {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          30% { opacity: .45; }
          100% { transform: translateX(180%) skewX(-18deg); opacity: 0; }
        }
        .liquid-card {
          position: relative;
          border: 1px solid rgba(255,255,255,.12);
          background:
            linear-gradient(135deg, rgba(255,255,255,.105), rgba(255,255,255,.035)),
            radial-gradient(circle at 15% 0%, rgba(96,165,250,.16), transparent 34%),
            radial-gradient(circle at 85% 10%, rgba(139,92,246,.13), transparent 32%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.13), 0 24px 80px rgba(0,0,0,.28);
          backdrop-filter: blur(22px) saturate(155%);
          -webkit-backdrop-filter: blur(22px) saturate(155%);
        }
        .liquid-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, rgba(255,255,255,.2), transparent 28%, transparent 72%, rgba(255,255,255,.08));
          opacity: .52;
        }
        .liquid-card::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -35%;
          width: 26%;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent);
          opacity: 0;
        }
        .liquid-card:hover::after {
          animation: glassShine 1.25s ease-out;
        }
        .liquid-card-strong {
          position: relative;
          border: 1px solid rgba(255,255,255,.14);
          background:
            linear-gradient(135deg, rgba(255,255,255,.13), rgba(255,255,255,.045)),
            radial-gradient(circle at 20% 0%, rgba(34,211,238,.18), transparent 34%),
            radial-gradient(circle at 90% 20%, rgba(139,92,246,.18), transparent 36%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.15), 0 30px 90px rgba(0,0,0,.34);
          backdrop-filter: blur(28px) saturate(170%);
          -webkit-backdrop-filter: blur(28px) saturate(170%);
        }
        .liquid-pill {
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.07);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
        }
        .nav-shell {
          border: 1px solid rgba(255,255,255,.12);
          background:
            linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.045)),
            radial-gradient(circle at 15% 0%, rgba(96,165,250,.16), transparent 36%),
            radial-gradient(circle at 90% 10%, rgba(139,92,246,.14), transparent 34%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 20px 60px rgba(0,0,0,.24);
          backdrop-filter: blur(26px) saturate(170%);
          -webkit-backdrop-filter: blur(26px) saturate(170%);
        }
        .nav-link {
          position: relative;
          border-radius: 999px;
          padding: 0.55rem 0.9rem;
          transition: color .25s ease, background .25s ease, transform .25s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0.28rem;
          height: 2px;
          width: 0;
          transform: translateX(-50%);
          border-radius: 999px;
          background: linear-gradient(90deg, #67E8F9, #A78BFA);
          transition: width .25s ease;
        }
        .nav-link:hover {
          color: white;
          background: rgba(255,255,255,.07);
          transform: translateY(-1px);
        }
        .nav-link:hover::after {
          width: 42%;
        }
        .animate-aurora { animation: aurora 14s ease-in-out infinite; }
        .animate-aurora-delayed { animation: aurora 18s ease-in-out 1.5s infinite; }
        .animate-liquid { animation: liquidMove 18s ease-in-out infinite; }
        .animate-liquid-delayed { animation: liquidMove 22s ease-in-out 2.2s infinite; }
        .animate-cursor { animation: cursorBlink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <AuroraBackground />
      <CursorLiquidGlow />

      <nav className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="nav-shell mx-auto flex items-center justify-between rounded-[1.6rem] px-4 py-3">
          <a href="#" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-500 text-sm font-black text-[#0B1020] shadow-lg shadow-cyan-500/20 transition group-hover:-translate-y-0.5">
              LB
            </span>
            <span className="font-heading text-xl font-bold text-white">
              Long<span className="text-blue-300">Nguyen</span>
            </span>
          </a>

          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.045] p-1 text-sm text-slate-400 md:flex">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <a
            href={profile.resume}
            className="rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-inner shadow-white/5 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
            download
          >
            Download CV ↓
          </a>
        </div>
      </nav>

      <Hero />
      <Highlights />
      <About />
      <Projects />
      <OtherProjects />
      <Skills />
      <ResumeSnapshot />
      <Contact />

      <footer className="relative z-10 border-t border-[#1F2937] py-8 text-center text-sm text-slate-500">
        Designed & built by Nguyen Ba Long. Last updated for AI/ML internship applications.
      </footer>
    </main>
  );
}
