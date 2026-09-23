import React, { useState } from "react";
import ProjectActionButtons from "./ProjectActionButtons";

export default function MultiTaskDashboard({ project, onOpenSlide, onOpenPdf, onZoomImage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = project.slides || [
    { label: "Research Methodology", image: "/images/sentiment_methodology.png" },
    { label: "Model Architecture", image: "/images/sentiment_system.png" },
    { label: "Experimental Results", image: "/images/sentiment_results.png" },
    { label: "Confusion Matrix", image: "/images/sentiment_confusion.png" },
  ];

  return (
    <article className="w-full flex flex-col gap-6">
      {/* TOP TIER: Header, Context & Multi-Task Concept */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="glass-liquid-pill px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50/80 border-indigo-200">
            {project.category}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {project.type}
          </span>
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {project.title}
        </h3>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-2.5 py-0.5 text-xs font-medium text-slate-600 bg-slate-100/90 border border-slate-200 rounded-md"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="font-bold text-slate-900 block mb-1">Noisy Student Feedback & Slang (Teencode):</span>
            <p>{project.problem}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="font-bold text-slate-900 block mb-1">Multi-Task Learning Architecture:</span>
            <p>{project.solution}</p>
          </div>
        </div>
      </div>

      {/* BOTTOM TIER: Visual Stage & Empirical F1 Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Side: 4 Methodology & Matrix Diagrams (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-200/60">
            <div className="ios-segmented-track flex-wrap gap-1 p-1">
              {slides.map((s, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`ios-glass-tab px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? "ios-glass-tab-active-dark"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => onZoomImage && onZoomImage(slides[activeSlide].image, slides[activeSlide].label)}
              className="ios-glass-btn px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              🔍 Zoom
            </button>
          </div>

          <div
            className="relative group w-full h-[360px] sm:h-[420px] flex items-center justify-center bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-3 cursor-pointer"
            onClick={() => onZoomImage && onZoomImage(slides[activeSlide].image, slides[activeSlide].label)}
          >
            <img
              src={slides[activeSlide].image}
              alt={slides[activeSlide].label}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/70 backdrop-blur-sm text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
              Click to zoom ↗
            </div>
          </div>
        </div>

        {/* Right Side: Empirical F1-Score Benchmarks & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Empirical F1-Score Benchmarks
            </span>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">mBERT Transformer Head</p>
                    <p className="text-[11px] text-slate-500">Fine-tuned for Vietnamese multi-label</p>
                  </div>
                </div>
                <span className="text-sm font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  F1: 88.5%
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">PhoBERT Transformer Head</p>
                    <p className="text-[11px] text-slate-500">Monolingual Vietnamese RoBERTa</p>
                  </div>
                </div>
                <span className="text-sm font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  F1: 88.2%
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-slate-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Baseline (TF-IDF + SVM)</p>
                    <p className="text-[11px] text-slate-500">Classical n-gram benchmark</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-300">
                  +20% Over Baseline
                </span>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-100/70 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <p><span className="font-semibold text-slate-800">Sentiment:</span> Negative, Neutral, Positive (3 classes)</p>
              <p><span className="font-semibold text-slate-800">Topics:</span> Lecturer, Curriculum, Facilities, Others</p>
            </div>
          </div>

          <div className="pt-2">
            <ProjectActionButtons
              githubPath={project.githubPath}
              slidePath={project.slidePath}
              pdfPath={project.pdfPath}
              title={project.title}
              onOpenSlide={onOpenSlide}
              onOpenPdf={onOpenPdf}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
