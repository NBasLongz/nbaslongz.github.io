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
    title: "AIC Multimodal Video Retrieval System",
    category: "RAG",
    type: "Research Project",
    description:
      "I built a multi-modal pipeline that extracts keyframes, OCR text, and ASR transcripts. To improve search accuracy, I implemented a hybrid search engine combining Milvus (dense vectors) and Elasticsearch (sparse keywords).",
    role: "Core Developer",
    stack: ["SigLIP2", "Milvus", "Elasticsearch", "PaddleOCR", "Whisper", "Flask"],
    problem: "Finding specific moments in large video datasets using natural language is often slow and inaccurate.",
    solution: "I built a multi-modal pipeline that extracts keyframes, OCR text, and ASR transcripts. To improve search accuracy, I implemented a hybrid search engine combining Milvus (dense vectors) and Elasticsearch (sparse keywords). The results were merged using Weighted Reciprocal Rank Fusion (RRF) and fine-tuned with a BGE-Reranker.",
    impact: "Achieved highly accurate frame-to-millisecond mapping, enabling fast and reliable natural language searches across complex video collections.",
    image: "/images/AIC.png",
    slides: [
      { label: "Sơ đồ Hệ thống", image: "/images/AIC.png" },
      { label: "Giao diện Tìm kiếm 1", image: "/images/AIC1.png" },
      { label: "Giao diện Tìm kiếm 2", image: "/images/AIC2.png" },
    ],
    githubPath: "https://github.com/NBasLongz/AIC-Video-Retrieval-System",
    accent: "blue",
  },
  {
    title: "RAG-based Lecture Video Q&A System",
    category: "RAG",
    type: "LLM & RAG Application",
    description:
      "A RAG pipeline using LangGraph to direct query flow, synchronizing slide text (Qwen2-VL OCR) with audio transcriptions (Whisper) to map content to exact timestamps.",
    stack: ["LangGraph", "FastAPI", "Qwen2-VL", "Whisper-large-v3", "RAGAS"],
    problem: "Students often struggle to find specific information in long and dense lecture videos.",
    solution: "I developed a RAG (Retrieval-Augmented Generation) pipeline using LangGraph to direct the query flow. The system synchronizes slide text (extracted via Qwen2-VL OCR) with audio transcriptions (via Whisper) to map content to exact video timestamps. I also added a Cross-Encoder reranking step over a hybrid search (BM25 + Dense retrieval).",
    impact: "Ensured efficient query routing and high-quality answers. The system's performance was strictly validated using the RAGAS framework, focusing on faithfulness and relevancy metrics.",
    image: "/images/Q&A.2.png",
    pdfEmbed: "/images/Pileline_Q&A.pdf",
    githubPath: "https://github.com/NBasLongz/A-Temporal-RAG-Framework-for-UIT-Course-Video-Retrieval",
    pdfPath: "/reports/rag-qa-system.pdf",
    slidePath: "/slides/CS431.pdf",
    accent: "green",
  },
  {
    title: "HTS-MultiResUNet (Dual-Attention Hybrid CNN-Transformer)",
    category: "CV",
    type: "Research Project",
    description:
      "A hybrid CNN-Transformer architecture combining MultiResUNet with Squeeze-and-Excitation (SE) blocks and localized Multi-Head Self-Attention (MHSA) bottleneck.",
    stack: ["TensorFlow", "Keras", "OpenCV", "MultiResUNet"],
    overview: "Dual-Attention Hybrid CNN-Transformer for Medical Image Segmentation",
    contributions: [
      "Integrated Squeeze-and-Excitation (SE) blocks and a localized Multi-Head Self-Attention (MHSA) bottleneck to improve feature extraction.",
      "Developed an Edge-Aware Focal Tversky Loss using a Sobel operator to ensure sharp boundaries, even with severe class imbalances."
    ],
    result: "Outperformed the baseline MultiResUNet model by up to 5.83% in the Jaccard Index, significantly reducing false-positive segments.",
    image: "/images/HTS.png",
    slides: [
      { label: "Results Comparison", image: "/images/HTS.png" },
      { label: "Skip Connections", image: "/images/evolution_skip_connections.png" },
      { label: "Transformer Bottleneck", image: "/images/hybrid_transformer_bottleneck.png" },
      { label: "Edge-Aware Loss", image: "/images/ea_ftl_diagram (1).png" },
    ],
    githubPath: "https://github.com/NBasLongz/HTS-MultiResUNet-MedSeg",
    pdfPath: "/reports/hts-multiresunet.pdf",
    slidePath: "/slides/Slide_HTS.pdf",
    accent: "violet",
  },
  {
    title: "Sentiment & Topic Analysis of Vietnamese Course Reviews",
    category: "NLP",
    type: "Vietnamese NLP Application",
    description:
      "A Multi-task Learning architecture with a shared encoder and task-specific heads to simultaneously predict sentiment and topic on noisy feedback.",
    stack: ["PhoBERT", "mBERT", "TF-IDF", "Underthesea"],
    problem: "Analyzing noisy Vietnamese student feedback, which contains 'teencode' (slang) and mixed sentiments, under severe class imbalance.",
    solution: "I built a Multi-task Learning architecture with a shared encoder and task-specific heads. By fine-tuning PhoBERT and mBERT, the model could simultaneously predict sentiment (single-label) and topic (multi-label). I also applied threshold tuning and class weights to handle data imbalance.",
    resultsList: [
      "mBERT: F1-Score (Topic) = 88.5%",
      "PhoBERT: F1-Score (Topic) = 88.2%",
      "Baseline (TF-IDF): Outperformed by ~20% in contextual understanding."
    ],
    image: "/images/sentiment_methodology.png",
    slides: [
      { label: "Phương pháp Nghiên cứu", image: "/images/sentiment_methodology.png" },
      { label: "Kiến trúc Hệ thống", image: "/images/sentiment_system.png" },
      { label: "Kết quả Thực nghiệm", image: "/images/sentiment_results.png" },
      { label: "Ma trận Nhầm lẫn", image: "/images/sentiment_confusion.png" },
    ],
    githubPath: "https://github.com/NBasLongz/SENTIMENT-AND-TOPIC-ANALYSIS-OF-VIETNAMESE-UNIVERSITY-STUDENTS-COURSE-EVALUATIONS",
    pdfPath: "/reports/sentiment-analysis.pdf",
    slidePath: "/slides/Báo Cáo CS221.Q13.pdf",
    accent: "violet",
  },
  {
    title: "DashBot: Insight-Driven Dashboard Generation",
    category: "RL",
    type: "Paper Reimplementation",
    description:
      "An automated dashboard generation system modeling the visualization process as a Markov Decision Process (MDP) using A3C agent and Bi-LSTM.",
    stack: ["Deep Reinforcement Learning (A3C)", "Bi-LSTM", "Vega-Lite", "Python"],
    methodology: "I modeled the visualization process as a Markov Decision Process (MDP). An A3C agent, combined with a Bi-LSTM network, was used to learn the relationships between different charts. I also implemented Constrained Sampling to prevent the system from generating invalid chart configurations.",
    impact: "In a user study with 10 experts, DashBot outperformed the MultiVision baseline in 88% of cases for 'Information Depth' and 84% for 'Understandability'.",
    image: "/images/dasbot.png",
    githubPath: "https://github.com/NBasLongz/Dashbot-a3c-dashboard-generation",
    slidePath: "/slides/Nhoms4_SlideBaoCao_CS106.pdf",
    accent: "cyan",
  },
  {
    title: "Predicting Citation Trend in CS Publications",
    category: "NLP",
    type: "Data Mining Project",
    description:
      "Mined a dataset of 15,959 Computer Science papers. Used RNN/LSTM/GRU models to forecast citation counts up to 5 years in advance.",
    stack: ["RNN", "LSTM", "GRU", "AllenAI SPECTER", "BERTopic", "TF-IDF", "Selenium", "Python"],
    problem: "Citation counts are a lagging indicator of paper quality, typically peaking years after publication. Researchers need early estimates of a publication's future academic impact.",
    solution: "We mined and integrated a dataset of 15,959 Computer Science papers from arXiv, Google Scholar, Semantic Scholar, Hugging Face, CORE, and Scimago. We extracted dynamic time-series elements (citation histories), metadata, and text embeddings using AllenAI SPECTER and BERTopic, and applied sequential models (RNN/LSTM/GRU) to forecast future citations.",
    impact: "LSTM and GRU achieved the best forecasting performance across multiple future years, with the LSTM model reaching an R² score of 0.98 on predictions for 2020.",
    image: "/images/citation_architecture.png",
    slides: [
      { label: "Model Architecture", image: "/images/citation_architecture.png" },
      { label: "Actual vs Predicted", image: "/images/citation_evaluation.png" },
      { label: "Feature Importance (SHAP)", image: "/images/citation_shap.png" },
    ],
    githubPath: "https://github.com/NBasLongz/Predicting-Citation-Trend-In-Computer-Science-Publications",
    pdfPath: "/reports/citation-prediction.pdf",
    slidePath: "/slides/CS313.pdf",
    accent: "green",
  },
  {
    title: "Self-Refined RL Reward Designer",
    category: "RL",
    type: "Paper Adaptation",
    description:
      "A lightweight RL experiment that uses LLM-generated reward functions and Q-Learning in a 2D Gridworld environment.",
    stack: ["Python", "Flask", "Q-Learning", "LLM API", "Gridworld"],
    problem: "Designing manual reward functions for RL agents is tedious and prone to design bugs. Researchers need automated, self-refined reward designs.",
    solution: "I designed a self-refined pipeline that uses an LLM to generate reward functions from task descriptions. The RL agent is trained using Q-Learning in a 2D Gridworld environment, evaluated, and the performance feedback is fed back to the LLM to refine the reward function design in a loop.",
    impact: "Demonstrated automated reward function optimization, achieving optimal policy convergence faster than baseline trial-and-error manual designs.",
    image: "/images/highlight-pipeline.jpg",
    githubPath: "https://github.com/NBasLongz/self-refined-llm-reward-design-reproduction-remake-with2D",
    accent: "green",
  },
  {
    title: "Animal Image Classification",
    category: "CV",
    type: "Computer Vision Project",
    description:
      "Built a CV baseline using HOG and LBP feature fusion combined with an SVM classifier, reaching 95% accuracy on the AFHQ dataset.",
    stack: ["HOG", "LBP", "SVM", "Random Forest", "AFHQ Dataset", "Python"],
    problem: "Classifying wild animals and domestic pets accurately in localized regions requires hand-crafted feature extractors that remain interpretable and computationally efficient compared to massive deep neural networks.",
    solution: "Developed a classic computer vision baseline combining Histogram of Oriented Gradients (HOG) to extract shape profiles, and Local Binary Patterns (LBP) to capture micro-textures. We combined these vectors using Feature Fusion (Concatenation + Standardization) and trained classification models (SVM with RBF kernel and Random Forest).",
    impact: "The feature fusion approach combined with an SVM classifier achieved an impressive accuracy of 95% on the AFHQ dataset, significantly outperforming individual descriptor baselines (LBP-only: 68%).",
    image: "/images/animal_pipeline.png",
    slides: [
      { label: "Pipeline Flowchart", image: "/images/animal_pipeline.png" },
      { label: "Feature Extraction Process", image: "/images/animal_extraction.png" },
      { label: "Confusion Matrix (SVM)", image: "/images/animal_confusion.png" },
      { label: "Results Comparison", image: "/images/animal_results.png" },
    ],
    githubPath: "https://github.com/NBasLongz/AnimalClassification",
    pdfPath: "/reports/animal-classification.pdf",
    slidePath: "/slides/Slide_ClassificationAnimal.pdf",
    accent: "cyan",
  },
  {
    title: "Vietnamese Hate Speech Detection",
    category: "NLP",
    type: "Machine Learning & NLP",
    description:
      "Developed an NLP filter using LinearSVM and TF-IDF, successfully handling 3-class imbalances with a Macro F1-Score of 0.6172 on UIT-ViHSD.",
    stack: ["LinearSVM", "TF-IDF", "Underthesea", "Python"],
    problem: "Detecting toxic, offensive, and hateful language in Vietnamese social media comments is highly challenging due to diacritical variations, abbreviations (teencode), slang, and severe class imbalance.",
    solution: "We designed a text preprocessing pipeline handling lowercasing, regex noise filtering, tone normalization, teencode dictionary expansion, and word segmentation via Underthesea. We extracted TF-IDF features and compared multiple algorithms: Naive Bayes, Support Vector Machines, Logistic Regression, and Gradient Boosting Trees.",
    impact: "Our champion model, a LinearSVM with balanced class weights, achieved a Macro F1-Score of 0.6172 and a global accuracy of 85.8% on the UIT-ViHSD test set.",
    image: "/images/hate_speech_pipeline.png",
    slides: [
      { label: "Sơ đồ Pipeline", image: "/images/hate_speech_pipeline.png" },
      { label: "Bảng so sánh Hiệu năng", image: "/images/hate_speech_results.png" },
      { label: "Phân tích & Đánh giá", image: "/images/hate_speech_analysis.png" },
    ],
    githubPath: "https://github.com/NBasLongz/Vietnamese-Hate-Speech-Detector",
    pdfPath: "/reports/hate-speech-detection.pdf",
    slidePath: "/slides/CS114.Q11.pdf",
    accent: "blue",
  },
];

const otherProjects = []; // Moved all projects to main array

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

const filters = ["All", "RL", "RAG", "NLP", "CV"];



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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[750ms] ease-out ${
        visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[1px]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Badge({ children, accent = "cyan" }) {
  const styles = {
    cyan: "border-cyan-500/30 bg-cyan-950/40 text-cyan-300",
    violet: "border-violet-500/30 bg-violet-950/40 text-violet-300",
    blue: "border-blue-500/30 bg-blue-950/40 text-blue-300",
    green: "border-emerald-500/30 bg-emerald-950/40 text-emerald-300",
    amber: "border-amber-500/30 bg-amber-950/40 text-amber-300",
  };

  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[accent] || styles.cyan}`}>
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-300 transition hover:-translate-y-1 hover:border-blue-400 hover:text-blue-400 hover:bg-white/20 shadow-sm"
    >
      {children}
    </a>
  );
}

function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute right-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-violet-500/12 blur-[100px] animate-aurora" />
      <div className="absolute left-[-10%] bottom-[-15%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/12 blur-[100px] animate-aurora-delayed" />
      <div className="absolute left-[35%] top-[15%] h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[90px] animate-liquid" />
      <div className="absolute right-[10%] bottom-[5%] h-[20rem] w-[20rem] rounded-full bg-emerald-500/8 blur-[90px] animate-liquid-delayed" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_20%_20%,white_0_1px,transparent_1px)] bg-[size:18px_18px]" />
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
        background: `radial-gradient(600px circle at ${position.x}% ${position.y}%, rgba(34,211,238,.07), rgba(139,92,246,.05), transparent 60%)`,
      }}
    />
  );
}

// Left side portrait and double stack effect
function PolaroidPortraitStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "/images/profile_picture.jpg",
    "/images/retouch_2025092715113522.jpg",
    "/images/retouch_2025092119520068.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-72 h-[340px] md:w-80 md:h-[400px] mx-auto">
      {images.map((src, i) => {
        // Compute relative position in the stack (0: front, 1: middle, 2: bottom)
        const relativePos = (i - activeIndex + 3) % 3;

        let cardStyle = "";
        let filterStyle = "";
        let shadowStyle = "";

        if (relativePos === 0) {
          // Front (Active)
          cardStyle = "z-30 translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100";
          filterStyle = "grayscale-0 opacity-100";
          shadowStyle = "shadow-polaroid";
        } else if (relativePos === 1) {
          // Middle (Behind)
          cardStyle = "z-20 -translate-x-3 translate-y-1 -rotate-3 scale-[0.98] opacity-90";
          filterStyle = "grayscale opacity-80 hover:grayscale-0 transition-all duration-300";
          shadowStyle = "shadow-md";
        } else {
          // Bottom (Back)
          cardStyle = "z-10 translate-x-3 translate-y-2 rotate-6 scale-[0.96] opacity-80";
          filterStyle = "grayscale opacity-60 hover:grayscale-0 transition-all duration-300";
          shadowStyle = "shadow-sm";
        }

        return (
          <div
            key={src}
            className={`absolute w-full h-full bg-white border border-slate-200 p-4 rounded-2xl transition-all duration-700 ease-in-out transform ${cardStyle} ${shadowStyle} cursor-pointer`}
            onClick={() => setActiveIndex(i)}
          >
            <div className="w-full h-[85%] rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
              <img
                src={src}
                alt="Nguyen Ba Long photos"
                className={`w-full h-full object-cover transition-all duration-700 ${filterStyle}`}
              />
            </div>
            <div className="h-[12%] flex items-center justify-center">
              <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">UIT VNU-HCM</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TerminalHeroCard() {
  const lines = [
    { text: "$ python app.py --mode rag", color: "text-slate-400" },
    { text: "[INFO] Initializing LangGraph workflow...", color: "text-cyan-600 font-semibold" },
    { text: "[INFO] Loading ChromaDB vector store...", color: "text-cyan-600 font-semibold" },
    { text: "> Query: \"What is A3C?\"", color: "text-blue-600 font-semibold" },
    { text: "[INFO] Retrieving context (BM25 + Vector)...", color: "text-slate-400" },
    { text: "[READY] Portfolio system online.", color: "text-emerald-600 font-semibold" },
  ];

  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-violet-500/10 blur-xl" />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(96,165,250,.08),transparent_34%),radial-gradient(circle_at_0%_100%,rgba(34,211,238,.05),transparent_32%)]" />
        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/90" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
              <span className="h-3 w-3 rounded-full bg-green-400/90" />
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 shadow-sm">
              terminal
            </span>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-[#0B1020] p-5 font-mono text-sm shadow-inner shadow-black/40">
            <div className="space-y-3">
              {lines.map((line, i) => (
                <p key={i} className={line.color}>
                  {line.text}
                </p>
              ))}
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <span>&gt;</span>
                <span className="h-5 w-2 animate-cursor rounded-sm bg-blue-500" />
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
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <p className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.3em] text-violet-400">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-extrabold text-white md:text-5xl tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-slate-300">{subtitle}</p>}
    </div>
  );
}

function HighlightCard({ value, label, accent }) {
  const colors = {
    cyan: "text-cyan-700 hover:border-cyan-400/40",
    violet: "text-violet-700 hover:border-violet-400/40",
    blue: "text-blue-700 hover:border-blue-400/40",
    green: "text-emerald-700 hover:border-emerald-400/40",
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white/70 p-6 text-center transition hover:-translate-y-1 hover:shadow-md ${
        colors[accent] || colors.cyan
      }`}
    >
      <h3 className="font-heading text-3xl font-bold">{value}</h3>
      <p className="mt-1 text-sm text-slate-500 font-semibold">{label}</p>
    </div>
  );
}

// Large Wide Horizontal Project Panel - Matches User Request
function ProjectCard({ project }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 md:p-8 transition hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-950/20 flex flex-col md:flex-row gap-8 items-start w-full text-slate-200">
      
      {/* Left Column: Details (48% width) */}
      <div className="w-full md:w-[48%] flex flex-col justify-center space-y-4">
        {/* Category & Badge */}
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300 shadow-sm">
            {project.category}
          </span>
          {project.role && (
            <span className="text-xs text-slate-400 font-semibold italic">
              {project.role}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
          {project.title}
        </h3>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((item) => (
            <Badge key={item} accent={project.accent}>
              {item}
            </Badge>
          ))}
        </div>

        {/* Project Problem / Solution / Results Descriptions */}
        <div className="space-y-3.5 pt-2 text-sm leading-relaxed text-slate-300">
          
          {project.overview && (
            <div className="border-l-2 border-white/20 pl-3">
              <span className="font-bold text-white">Overview: </span>
              <span>{project.overview}</span>
            </div>
          )}

          {project.problem && (
            <div>
              <p className="font-bold text-white mb-0.5">Problem / Bài toán:</p>
              <p>{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <p className="font-bold text-white mb-0.5">Solution / Giải pháp:</p>
              <p>{project.solution}</p>
            </div>
          )}

          {project.contributions && (
            <div>
              <p className="font-bold text-white mb-1">Key Contributions / Đóng góp:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {project.contributions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {project.methodology && (
            <div>
              <p className="font-bold text-white mb-0.5">Methodology / Phương pháp:</p>
              <p>{project.methodology}</p>
            </div>
          )}

          {project.impact && (
            <div>
              <p className="font-bold text-white mb-0.5">Impact / Key Win:</p>
              <p>{project.impact}</p>
            </div>
          )}

          {project.result && (
            <div>
              <p className="font-bold text-white mb-0.5">Result / Kết quả:</p>
              <p>{project.result}</p>
            </div>
          )}

          {/* PhoBERT/mBERT 3 statistics list on Project 4 */}
          {project.resultsList && (
            <div className="space-y-1.5 pt-1">
              <p className="font-bold text-white">Results / Kết quả:</p>
              <div className="grid grid-cols-1 gap-1.5 max-w-md">
                {project.resultsList.map((r, i) => (
                  <div key={i} className="flex gap-2 text-xs text-slate-300 bg-slate-950/40 p-2 border border-slate-800/40 rounded-lg">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons to Open PDF Report & GitHub Repo */}
        <div className="pt-3 flex flex-wrap gap-3">
          {project.githubPath && (
            <a
              href={project.githubPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              GitHub Code
            </a>
          )}
          {project.slidePath && (
            <a
              href={project.slidePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600/80 hover:bg-cyan-700/90 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm border border-cyan-500/20"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Xem Slide
            </a>
          )}
          {project.pdfPath && (
            <a
              href={project.pdfPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm border border-violet-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Xem Báo Cáo (PDF)
            </a>
          )}
        </div>
      </div>

      {/* Right Column: Visual Diagram (52% width) */}
      <div className="w-full md:w-[52%] flex flex-col gap-4 bg-slate-50/30 p-3 md:p-5 rounded-2xl border border-slate-100/80">
        {project.slides ? (
          <div className="flex flex-col gap-3.5 w-full">
            {/* Slide active image */}
            <div className="w-full h-[320px] flex justify-center items-center bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden relative p-3">
              <img 
                src={project.slides[activeSlide].image} 
                alt={project.slides[activeSlide].label}
                className="max-w-full max-h-full object-contain transition-all duration-300"
              />
            </div>
            
            {/* Slides selector tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {project.slides.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    activeSlide === idx
                      ? "border-violet-500/40 bg-violet-50 text-violet-755 shadow-sm"
                      : "border-slate-200 bg-white/70 text-slate-500 hover:border-slate-350 hover:text-slate-700"
                  }`}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          </div>
        ) : project.pdfEmbed ? (
          <>
            {/* Pipeline flowchart PDF on top - matches page aspect ratio to remove grey viewer background */}
            <div className="w-full h-[315px] rounded-xl overflow-hidden shadow-sm bg-white border border-slate-100 relative">
              <iframe 
                src={`${project.pdfEmbed}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-full border-none"
                title="Pipeline Flowchart"
              />
            </div>
            {/* Q&A interface screenshot below */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-contain max-h-[220px] rounded-xl shadow-sm bg-white border border-slate-100"
            />
          </>
        ) : (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto object-contain max-h-[350px] rounded-xl shadow-sm bg-white border border-slate-100"
          />
        )}
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/35 backdrop-blur-md shadow-2xl mb-16 mt-6">
      {/* Dark overlay with overlay/blur to make text extremely readable */}
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] z-0" />
      
      {/* Grid container */}
      <div className="relative z-10 grid items-center gap-12 px-8 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24 md:px-12 lg:px-16 xl:px-20 text-white">
        <Reveal className="space-y-6">
          <p className="font-heading text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
            AI / ML Engineer Portfolio
          </p>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl tracking-tight">
            NGUYỄN BÁ LONG
          </h1>
          <div className="space-y-2">
            <h2 className="font-heading text-lg md:text-xl font-bold text-cyan-300">
              AI & Machine Learning Engineer | Computer Science Student
            </h2>
            <p className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT - VNUHCM)
            </p>
          </div>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-slate-200 font-light">
            "Transforming data into intelligent solutions through Machine Learning, Deep Learning, and NLP."
          </p>
          
          <div className="flex flex-wrap gap-4 pt-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-heading font-medium text-white shadow-lg shadow-violet-600/30 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              View Projects <span>→</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-heading font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              GitHub Portfolio <span>↗</span>
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-heading font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Download CV <span>↓</span>
            </a>
          </div>
        </Reveal>
        
        <Reveal delay={140}>
          <TerminalHeroCard />
        </Reveal>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
      <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <HighlightCard value="9" label="Featured Projects" accent="blue" />
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
      <Reveal className="grid gap-12 lg:grid-cols-12 items-center">
        
        {/* Polaroid Card Stack Left (Screenshot 2) */}
        <div className="lg:col-span-5 flex justify-center">
          <PolaroidPortraitStack />
        </div>

        {/* About Me details Right */}
        <div className="space-y-6 lg:col-span-7">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-violet-400">01. About Me</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">Bridging Research & Implementation</h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-350">
            As a third-year Computer Science student at UIT (VNUHCM) with a GPA of 8.24/10, I specialize in developing end-to-end AI pipelines. My hands-on experience covers everything from data preprocessing and training neural networks to deploying multi-modal RAG and Agent workflows. I am actively seeking an AI/ML Intern position to apply my academic knowledge to real-world challenges and continuously grow as an engineer.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {["Python", "PyTorch", "FastAPI", "LangChain", "LangGraph", "Docker", "Elasticsearch", "Milvus", "Next.js", "OpenCV", "PostgreSQL", "ChromaDB"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-sm text-slate-200 shadow-sm font-semibold">
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
          subtitle="Selected projects from my CV, focused on AI/ML, NLP, RAG systems, and reinforcement learning. Expanded in full details."
        />
      </Reveal>
      
      {/* Filter Tabs */}
      <Reveal delay={80} className="mb-12 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              active === filter
                ? "border-blue-500/40 bg-blue-600/20 text-blue-300 shadow-sm"
                : "border-white/10 bg-white/10 text-slate-300 hover:border-white/20 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </Reveal>

      {/* Large Wide Horizontal Project Panels List */}
      <div className="flex flex-col gap-10">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 90}>
            <ProjectCard project={project} />
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
            <div className="h-full rounded-2xl liquid-card p-6 transition hover:-translate-y-2 hover:border-cyan-500/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/40 text-sm font-black text-cyan-400 shadow-sm border border-slate-800/40">
                {group.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-white">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
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
        <p className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.3em] text-violet-400">04. Resume</p>
        <h2 className="mb-8 font-heading text-4xl font-bold text-white">Education & Focus</h2>
        <div className="mb-8 space-y-4 rounded-2xl liquid-card-strong p-8 text-left">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-xl font-semibold text-white">B.Sc. Computer Science</h3>
              <p className="text-blue-400">University of Information Technology - VNUHCM</p>
            </div>
            <span className="rounded-full bg-slate-950/40 border border-slate-800/40 px-3 py-1 text-sm text-slate-400 shadow-sm">Present</span>
          </div>
          <p className="text-slate-300">
            <span className="font-medium text-white">Focus:</span> AI/ML, NLP, RAG Systems, Reinforcement Learning
          </p>
          <p className="text-slate-300">
            <span className="font-medium text-white">Target:</span> AI/ML Engineering & Research Internships
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-heading font-medium text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-1 hover:bg-blue-700"
          >
            Download Full CV <span>↓</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-8 py-3 font-heading font-medium text-white transition hover:-translate-y-1 hover:border-blue-400/40 hover:text-blue-400 hover:bg-white/20"
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
    <section id="contact" className="relative z-10 overflow-hidden py-24 border-t border-white/10">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/3 blur-[100px]" />
      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">Let's Build Something Together</h2>
        <p className="mb-12 text-lg text-slate-355">Interested in discussing internship opportunities, AI/ML projects, or collaborations? Let's connect.</p>
        <div className="flex justify-center gap-5">
          <IconButton href={`mailto:${profile.email}`} label="Email">✉</IconButton>
          <IconButton href={profile.linkedin} label="LinkedIn">in</IconButton>
          <IconButton href={profile.github} label="GitHub">⌘</IconButton>
        </div>
      </Reveal>
    </section>
  );
}



export default function App() {
  return (
    <main 
      className="min-h-screen overflow-hidden text-slate-200"
      style={{
        background: "linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.93)), url('/images/Background 1.jpg') no-repeat center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
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
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.65), rgba(30, 41, 59, 0.4)),
            radial-gradient(circle at 15% 0%, rgba(96,165,250,0.06), transparent 34%),
            radial-gradient(circle at 85% 10%, rgba(139,92,246,0.05), transparent 32%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(22px) saturate(135%);
          -webkit-backdrop-filter: blur(22px) saturate(135%);
        }
        .liquid-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, rgba(255,255,255,0.1), transparent 28%, transparent 72%, rgba(255,255,255,0.05));
          opacity: .3;
        }
        .liquid-card::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -35%;
          width: 26%;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          opacity: 0;
        }
        .liquid-card:hover::after {
          animation: glassShine 1.25s ease-out;
        }
        .liquid-card-strong {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(30, 41, 59, 0.5)),
            radial-gradient(circle at 20% 0%, rgba(34,211,238,0.06), transparent 34%),
            radial-gradient(circle at 90% 20%, rgba(139,92,246,0.06), transparent 36%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(28px) saturate(150%);
          -webkit-backdrop-filter: blur(28px) saturate(150%);
        }
        .liquid-pill {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 23, 42, 0.45);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
        }
        .nav-shell {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.45)),
            radial-gradient(circle at 15% 0%, rgba(96,165,250,0.06), transparent 36%),
            radial-gradient(circle at 90% 10%, rgba(139,92,246,0.05), transparent 34%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 15px 40px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(26px) saturate(150%);
          -webkit-backdrop-filter: blur(26px) saturate(150%);
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
          background: linear-gradient(90deg, #0284C7, #7C3AED);
          transition: width .25s ease;
        }
        .nav-link:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.06);
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
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-sm font-black text-white shadow-lg shadow-cyan-500/10 transition group-hover:-translate-y-0.5">
              LB
            </span>
            <span className="font-heading text-xl font-bold text-white">
              Long<span className="text-blue-400">Nguyen</span>
            </span>
          </a>

          <div className="hidden items-center rounded-full border border-white/10 bg-slate-950/40 p-1 text-sm text-slate-300 md:flex">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <a
            href={profile.resume}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/20 hover:text-cyan-300"
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
      <Skills />
      <ResumeSnapshot />
      <Contact />
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-slate-400">
        Designed & built by Nguyen Ba Long. Last updated for AI/ML internship applications.
      </footer>
    </main>
  );
}
