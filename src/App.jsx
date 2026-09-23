import React, { useEffect, useMemo, useRef, useState } from "react";
import ProjectDispatcher from "./components/Projects/ProjectDispatcher";
import MediaModal from "./components/Projects/MediaModal";

const profile = {
  name: "Nguyen Ba Long",
  role: "Final-Year Computer Science Student",
  target: "AI/ML Engineer & Research Intern",
  email: "longnguyen132005@gmail.com",
  github: "https://github.com/NBasLongz",
  linkedin: "https://www.linkedin.com/in/nbl2005/",
  resume: "/CV_Nguyen_Ba_Long_AI_Engineer.pdf",
};

const projects = [
  {
    title: "AIC Multimodal Video Retrieval System",
    category: "RAG",
    type: "AI Challenge 2026 / Multimodal System",
    description:
      "A fast and accurate multimedia retrieval system for AI Challenge 2026, combining SigLIP2 dense vectors, BM25 text search, YOLOv11 scene graphs, Cross-Encoder reranking, and Rocchio relevance feedback with sub-second latency.",
    role: "Core Developer",
    stack: [
      "SigLIP2",
      "Milvus",
      "Elasticsearch",
      "YOLOv11",
      "Whisper large-v3",
      "PaddleOCR",
      "bge-reranker-v2-m3",
      "Rocchio Feedback",
      "Redis",
      "Flask",
    ],
    problem:
      "Locating exact video moments (Known-Item Search), answering visual queries (Visual Q&A), and aligning sequential key events (TRAKE) across massive video archives under strict real-time response constraints.",
    solution:
      "I engineered an end-to-end multimodal retrieval architecture combining offline AI indexing with online multi-stream hybrid search:",
    contributions: [
      "Offline AI Ingestion: Extracted keyframes (H.264 normalized), Whisper large-v3 transcripts, PaddleOCR text, Florence-2 captions, and YOLOv11 spatial scene graphs. Indexed dense vectors into Milvus (SigLIP2 1152-dim & BGE-M3) and sparse text into Elasticsearch (BM25).",
      "Online Hybrid Search & Reranking: Implemented query decomposition with Gemini API fallback, fused multi-stream candidates using Reciprocal Rank Fusion (RRF, k=60), and fine-tuned results with Cross-Encoder (bge-reranker-v2-m3).",
      "Interactive Tuning & Performance: Integrated real-time Rocchio Relevance Feedback vector refinement and a sub-millisecond Redis response caching layer.",
    ],
    impact:
      "Fully compliant with AI Challenge evaluation standards (R-Score & Final Score), supporting 1-click Top-100 bulk submission, sub-second latency with 0ms Redis cache hits, and precise frame-to-millisecond timestamp mapping.",
    image: "/images/SoDoHeThong.png",
    slides: [
      { label: "System Architecture", image: "/images/SoDoHeThong.png", desc: "Overall system design: Offline ingestion pipeline & online multi-stream hybrid retrieval with Milvus and Elasticsearch" },
      { label: "Visual Search UI", image: "/images/Giao_Dien_Truy_Van_Visual.png", desc: "Semantic visual search using SigLIP2 dense vector embeddings with frame-level filtering and similarity thresholds" },
      { label: "OCR Text Search UI", image: "/images/Giao_Dien_Truy_van_OCR.png", desc: "On-screen text search extracting visible signs, slides, and banners using PaddleOCR and Elasticsearch BM25" },
      { label: "Transcripts Search UI", image: "/images/Giao_Dien_Truy_Van_Transcipts.png", desc: "Speech-to-text audio query interface powered by Whisper large-v3 automated transcriptions" },
      { label: "Hybrid Search UI", image: "/images/Giao_Dien_Truy_Van_Highbird.png", desc: "Multi-stream search fusing Visual, OCR, and Audio modalities via Reciprocal Rank Fusion (RRF, k=60)" },
      { label: "TRAKE Event Search", image: "/images/Trake_search.png", desc: "TRAKE challenge module: Aligning and tracking sequential action events across long video timelines" },
      { label: "Visual Q&A UI", image: "/images/Q&A.png", desc: "Visual question answering: Pinpointing visual evidence and mapping to exact timestamped video frames" },
      { label: "Video Player & Verification", image: "/images/Giao_dien_Khi_open_Video.png", desc: "Interactive video player with millisecond precision, frame verification, and 1-click Top-100 submission export" },
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
    problem: "Students often struggle to locate specific explanations and technical definitions within lengthy, dense university lecture recordings.",
    solution: "I developed a RAG (Retrieval-Augmented Generation) pipeline using LangGraph to direct query flow. The system synchronizes slide text (extracted via Qwen2-VL OCR) with audio transcriptions (via Whisper large-v3) to map content to exact video timestamps. I also added a Cross-Encoder reranking step over a hybrid search (BM25 + Dense retrieval).",
    impact: "Ensured efficient query routing and high-quality answers. The system's performance was strictly validated using the RAGAS framework, focusing on faithfulness and answer relevancy metrics.",
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
      "Integrated Squeeze-and-Excitation (SE) blocks and a localized Multi-Head Self-Attention (MHSA) bottleneck to improve feature extraction across multi-scale contexts.",
      "Developed an Edge-Aware Focal Tversky Loss using a Sobel operator to ensure sharp anatomical boundaries, even with severe class imbalances."
    ],
    result: "Outperformed the baseline MultiResUNet model by up to 5.83% in the Jaccard Index, significantly reducing false-positive segments.",
    image: "/images/HTS.png",
    slides: [
      { label: "01. Results Comparison", image: "/images/HTS.png" },
      { label: "02. Skip Connections", image: "/images/evolution_skip_connections.png" },
      { label: "03. Transformer Bottleneck", image: "/images/hybrid_transformer_bottleneck.png" },
      { label: "04. Edge-Aware Loss", image: "/images/ea_ftl_diagram (1).png" },
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
      "A Multi-task Learning architecture with a shared encoder and task-specific heads to simultaneously predict sentiment and topic on noisy student feedback.",
    stack: ["PhoBERT", "mBERT", "TF-IDF", "Underthesea", "Streamlit"],
    problem: "Analyzing noisy Vietnamese student feedback containing informal slang ('teencode') and mixed sentiments under severe class imbalance.",
    solution: "I built a Multi-task Learning architecture with a shared encoder and task-specific heads. By fine-tuning PhoBERT and mBERT, the model could simultaneously predict sentiment (single-label) and topic (multi-label). I also applied threshold tuning and class weights to handle data imbalance.",
    resultsList: [
      "mBERT: F1-Score (Topic) = 88.5%",
      "PhoBERT: F1-Score (Topic) = 88.2%",
      "Baseline (TF-IDF): Outperformed by ~20% in contextual understanding."
    ],
    image: "/images/sentiment_methodology.png",
    slides: [
      { label: "Research Methodology", image: "/images/sentiment_methodology.png" },
      { label: "System Architecture", image: "/images/sentiment_system.png" },
      { label: "Experimental Results", image: "/images/sentiment_results.png" },
      { label: "Confusion Matrix", image: "/images/sentiment_confusion.png" },
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
      { label: "Actual vs Predicted (R²=0.98)", image: "/images/citation_evaluation.png" },
      { label: "SHAP Feature Importance", image: "/images/citation_shap.png" },
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
      { label: "Performance Benchmark", image: "/images/animal_results.png" },
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
      { label: "Pipeline Flowchart", image: "/images/hate_speech_pipeline.png" },
      { label: "Performance Comparison", image: "/images/hate_speech_results.png" },
      { label: "Analysis & Evaluation", image: "/images/hate_speech_analysis.png" },
    ],
    githubPath: "https://github.com/NBasLongz/Vietnamese-Hate-Speech-Detector",
    pdfPath: "/reports/hate-speech-detection.pdf",
    slidePath: "/slides/CS114.Q11.pdf",
    accent: "blue",
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
    items: ["FastAPI", "Flask", "PostgreSQL", "SQLAlchemy", "Pydantic", "RESTful API", "ChromaDB", "Milvus", "Elasticsearch", "Redis"],
  },
  {
    title: "Tools / UI",
    icon: "DEV",
    items: ["Docker", "Docker Compose", "Git", "GitHub", "Streamlit", "Gradio", "Jupyter Notebook", "Next.js", "Selenium"],
  },
];

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

function IconButton({ href, children, label }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="ios-glass-circle h-12 w-12 text-slate-700 hover:text-indigo-600 text-base font-bold transition"
    >
      {children}
    </a>
  );
}

// Left side portrait stack
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
        const relativePos = (i - activeIndex + 3) % 3;

        let cardStyle = "";
        let filterStyle = "";
        let shadowStyle = "";

        if (relativePos === 0) {
          cardStyle = "z-30 translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100";
          filterStyle = "grayscale-0 opacity-100";
          shadowStyle = "shadow-xl shadow-slate-200/60";
        } else if (relativePos === 1) {
          cardStyle = "z-20 -translate-x-3 translate-y-1 -rotate-3 scale-[0.98] opacity-90";
          filterStyle = "grayscale opacity-80 hover:grayscale-0 transition-all duration-300";
          shadowStyle = "shadow-md";
        } else {
          cardStyle = "z-10 translate-x-3 translate-y-2 rotate-6 scale-[0.96] opacity-80";
          filterStyle = "grayscale opacity-60 hover:grayscale-0 transition-all duration-300";
          shadowStyle = "shadow-sm";
        }

        return (
          <div
            key={src}
            className={`absolute w-full h-full bg-white border border-slate-200/90 p-4 rounded-3xl transition-all duration-700 ease-in-out transform ${cardStyle} ${shadowStyle} cursor-pointer`}
            onClick={() => setActiveIndex(i)}
          >
            <div className="w-full h-[85%] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
              <img
                src={src}
                alt="Nguyen Ba Long"
                className={`w-full h-full object-cover transition-all duration-700 ${filterStyle}`}
              />
            </div>
            <div className="h-[12%] flex items-center justify-between px-1">
              <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">UIT VNU-HCM</span>
              <span className="text-indigo-600 font-bold text-xs">AI / ML</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TerminalHeroCard() {
  const lines = [
    { text: "$ python multimodal_retrieval.py --top_k 100", color: "text-slate-400" },
    { text: "[INFO] Initializing SigLIP2 + Milvus HNSW dense index...", color: "text-cyan-600 font-semibold" },
    { text: "[INFO] Syncing PaddleOCR & Whisper large-v3 transcripts...", color: "text-cyan-600 font-semibold" },
    { text: "> Query: \"Ambulance crossing red light intersection\"", color: "text-blue-600 font-semibold" },
    { text: "[SEARCH] RRF Fusion (k=60) + Cross-Encoder reranker...", color: "text-indigo-600 font-semibold" },
    { text: "[READY] Top-1 match found at 01:24.450 (Latency: 38ms).", color: "text-emerald-600 font-semibold" },
  ];

  return (
    <div className="relative hidden lg:block">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/90" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Terminal Live Demo
            </span>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#0B1020] p-5 font-mono text-sm shadow-inner text-slate-200">
            <div className="space-y-3">
              {lines.map((line, i) => (
                <p key={i} className={line.color}>
                  {line.text}
                </p>
              ))}
              <div className="flex items-center gap-2 pt-1 text-slate-400">
                <span>&gt;</span>
                <span className="h-5 w-2 animate-pulse rounded-xs bg-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ value, label, accent }) {
  const colors = {
    cyan: "text-cyan-700 bg-cyan-50/70 border-cyan-200",
    violet: "text-violet-700 bg-violet-50/70 border-violet-200",
    blue: "text-blue-700 bg-blue-50/70 border-blue-200",
    green: "text-emerald-700 bg-emerald-50/70 border-emerald-200",
  };

  return (
    <div
      className={`glass-liquid-card rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:shadow-lg border ${
        colors[accent] || colors.cyan
      }`}
    >
      <h3 className="font-heading text-3xl font-extrabold">{value}</h3>
      <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">{label}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white/75 backdrop-blur-xl shadow-xl shadow-slate-200/40 mb-16 mt-6">
      <div className="grid items-center gap-12 px-8 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-20 md:px-12 lg:px-16 xl:px-20 text-slate-900">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-[0.25em] text-blue-700 bg-blue-50 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            AI / ML Engineer Portfolio
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            NGUYỄN BÁ LONG
          </h1>

          <div className="space-y-2">
            <h2 className="font-heading text-lg md:text-xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              AI & Machine Learning Engineer | Final-Year Computer Science Student
            </h2>
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              University of Information Technology - VNU-HCM (UIT)
            </p>
          </div>

          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-slate-600 font-normal">
            "Building robust multimodal AI pipelines, production-grade video retrieval, and deep learning architectures with proven research results."
          </p>

          <div className="flex flex-wrap gap-3.5 pt-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-heading font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              View Projects <span>↓</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass-liquid-pill px-6 py-3 font-heading font-semibold text-slate-800 transition hover:-translate-y-0.5"
            >
              GitHub Portfolio <span>↗</span>
            </a>
            <a
              href={profile.resume}
              download
              className="glass-liquid-pill px-6 py-3 font-heading font-semibold text-indigo-700 hover:text-indigo-900 transition hover:-translate-y-0.5"
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
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
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
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <Reveal className="grid gap-12 lg:grid-cols-12 items-center">
        {/* Polaroid Card Stack Left */}
        <div className="lg:col-span-5 flex justify-center">
          <PolaroidPortraitStack />
        </div>

        {/* About Me details Right */}
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-[0.25em] text-violet-700 bg-violet-50 border border-violet-200">
            01. About Me
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Bridging Research & Production Engineering
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600">
            I am a final-year Computer Science student at the University of Information Technology (VNU-HCM) with a GPA of 8.27/10.0, specializing in Computer Vision, Deep Learning, and Multimodal Systems. My hands-on experience includes developing end-to-end multimodal pipelines—from image preprocessing and custom neural architecture design (HTS-MultiResUNet) to high-throughput OCR extraction (PaddleOCR) and low-latency hybrid retrieval (Milvus + BM25). I am seeking an AI/ML Engineer or Research Intern position where I can apply practical engineering and research-driven solutions to real-world challenges.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Python", "PyTorch", "FastAPI", "LangChain", "LangGraph", "Docker",
              "Elasticsearch", "Milvus", "Next.js", "OpenCV", "PostgreSQL", "ChromaDB"
            ].map((item) => (
              <span key={item} className="glass-liquid-pill px-3.5 py-1 text-xs font-semibold text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 02. FEATURED PROJECTS SECTION - Unboxed Editorial Canvas
function Projects({ onOpenSlide, onOpenPdf, onZoomImage }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = useMemo(() => [
    { id: "All", label: "All Projects", count: projects.length },
    { id: "RAG", label: "RAG", count: projects.filter((p) => p.category === "RAG").length },
    { id: "CV", label: "CV", count: projects.filter((p) => p.category === "CV").length },
    { id: "NLP", label: "NLP", count: projects.filter((p) => p.category === "NLP").length },
    { id: "RL", label: "RL", count: projects.filter((p) => p.category === "RL").length },
  ], []);

  const visibleProjects = useMemo(
    () => (activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      {/* 1. Luminous Section Spotlight Header */}
      <Reveal>
        <div className="relative mx-auto mb-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-indigo-700 bg-indigo-50/90 border border-indigo-200/80 shadow-2xs mb-4">
            <span className="text-amber-500">✦</span> 02. FEATURED ENGINEERING & RESEARCH
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            What I've Built
          </h2>

          <p className="mt-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Transforming Research into Reality
          </p>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Deep dive into 9 production-grade AI systems, research reproductions, and multimodal pipelines with concrete architectures and metrics.
          </p>
        </div>
      </Reveal>

      {/* 2. Apple Liquid Glass Category Filter Toolbar */}
      <Reveal delay={80} className="mb-16 flex justify-center">
        <div className="ios-segmented-track flex-wrap justify-center max-w-full">
          {filterCategories.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`ios-glass-tab px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive ? "ios-glass-tab-active-dark" : "hover:text-slate-900"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono transition-colors ${
                    isActive ? "bg-white/25 text-white" : "bg-slate-200/80 text-slate-700"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* 3. Unboxed & Fluid Editorial Canvas (Projects via ProjectDispatcher) */}
      <div className="flex flex-col">
        {visibleProjects.map((project, index) => (
          <React.Fragment key={project.title}>
            <Reveal delay={index * 60}>
              <ProjectDispatcher
                project={project}
                onOpenSlide={onOpenSlide}
                onOpenPdf={onOpenPdf}
                onZoomImage={onZoomImage}
              />
            </Reveal>

            {/* Soft Light Gradient Separator between projects */}
            {index < visibleProjects.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-16 sm:my-24" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 font-heading text-xs font-black uppercase tracking-[0.3em] text-violet-700">03. Skills</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Tech Stack & Tools</h2>
          <p className="mt-3 text-base text-slate-600">Grouped by practical usage across my AI projects, research, and production workflows.</p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 90}>
            <div className="h-full rounded-3xl glass-liquid-card p-6 transition hover:-translate-y-1.5 hover:shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xs font-black text-indigo-700 shadow-sm border border-indigo-100">
                {group.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">{group.title}</h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
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
        <p className="mb-3 font-heading text-xs font-black uppercase tracking-[0.3em] text-violet-700">04. Resume</p>
        <h2 className="mb-8 font-heading text-3xl sm:text-4xl font-black text-slate-900">Education & Focus</h2>
        
        <div className="mb-8 space-y-4 rounded-3xl glass-liquid-card-elevated p-8 text-left border border-slate-200/90 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-xl font-bold text-slate-900">B.Sc. Computer Science</h3>
              <p className="text-blue-600 font-medium">University of Information Technology - VNU-HCM (UIT)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
                GPA: 8.27 / 10.0
              </span>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs text-slate-600 shadow-2xs">
                Expected 2027
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">Focus:</span> Computer Vision, Multimodal RAG Systems, Deep Learning & Reinforcement Learning
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">Target:</span> AI/ML Engineer & Research Internships
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 font-heading font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Download Full CV <span>↓</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="glass-liquid-pill px-8 py-3.5 font-heading font-semibold text-slate-800 transition hover:-translate-y-0.5"
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
    <section id="contact" className="relative z-10 overflow-hidden py-24 border-t border-slate-200/80">
      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="mb-4 font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
          Let's Build Something Together
        </h2>
        <p className="mb-10 text-base sm:text-lg text-slate-600">
          Interested in discussing internship opportunities, AI/ML projects, or research collaborations? Let's connect.
        </p>
        <div className="flex justify-center gap-4">
          <IconButton href={`mailto:${profile.email}`} label="Email">✉</IconButton>
          <IconButton href={profile.linkedin} label="LinkedIn">in</IconButton>
          <IconButton href={profile.github} label="GitHub">⌘</IconButton>
        </div>
      </Reveal>
    </section>
  );
}

export default function App() {
  // Modal Controller
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "pdf", // "pdf" | "image"
    title: "",
    src: "",
  });

  const handleOpenSlide = (src, title) => {
    setModalConfig({ isOpen: true, type: "pdf", title, src });
  };

  const handleOpenPdf = (src, title) => {
    setModalConfig({ isOpen: true, type: "pdf", title, src });
  };

  const handleZoomImage = (src, title) => {
    setModalConfig({ isOpen: true, type: "image", title, src });
  };

  const handleCloseModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC] bg-grid-light text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Ambient Glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl -z-10" />

      {/* Apple Liquid Glass Sticky Navigation Bar */}
      <nav className="sticky top-4 z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex items-center justify-between rounded-2xl ios-glass-bar px-4 py-2.5">
          <a href="#" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-xs font-black text-white shadow-sm transition group-hover:-translate-y-0.5">
              NL
            </span>
            <span className="font-heading text-lg font-black text-slate-900 tracking-tight">
              Long<span className="text-blue-600">Nguyen</span>
            </span>
          </a>

          <div className="hidden items-center ios-segmented-track md:flex">
            <a href="#projects" className="ios-glass-tab hover:text-slate-900">Projects</a>
            <a href="#about" className="ios-glass-tab hover:text-slate-900">About</a>
            <a href="#skills" className="ios-glass-tab hover:text-slate-900">Skills</a>
            <a href="#contact" className="ios-glass-tab hover:text-slate-900">Contact</a>
          </div>

          <a
            href={profile.resume}
            className="ios-glass-btn px-4 py-2 text-xs font-bold text-slate-800 hover:text-indigo-600 transition"
            download
          >
            Download CV ↓
          </a>
        </div>
      </nav>

      {/* Main Page Sections */}
      <Hero />
      <Highlights />
      <About />
      <Projects
        onOpenSlide={handleOpenSlide}
        onOpenPdf={handleOpenPdf}
        onZoomImage={handleZoomImage}
      />
      <Skills />
      <ResumeSnapshot />
      <Contact />

      <footer className="relative z-10 border-t border-slate-200/80 py-8 text-center text-xs text-slate-500">
        Designed & built by Nguyen Ba Long. Updated for AI/ML Engineer Internship applications.
      </footer>

      {/* Global In-Page Media Modal (PDF Slide / Report / Image Zoom) */}
      <MediaModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        type={modalConfig.type}
        title={modalConfig.title}
        src={modalConfig.src}
      />
    </main>
  );
}
