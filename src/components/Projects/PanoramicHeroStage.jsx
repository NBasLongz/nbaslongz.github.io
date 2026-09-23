import React, { useState } from "react";
import ProjectActionButtons from "./ProjectActionButtons";

export default function PanoramicHeroStage({ project, onOpenSlide, onOpenPdf, onZoomImage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = project.slides || [
    { label: "System Architecture", image: "/images/SoDoHeThong.png", desc: "Overall pipeline: Offline ingestion of keyframes/text & real-time multi-stream retrieval with Milvus & Elasticsearch" },
    { label: "Visual Search UI", image: "/images/Giao_Dien_Truy_Van_Visual.png", desc: "Visual semantic query interface using SigLIP2 dense embeddings with frame filters and similarity scoring" },
    { label: "OCR Text Search UI", image: "/images/Giao_Dien_Truy_van_OCR.png", desc: "On-screen subtitle and text recognition search using PaddleOCR extraction and Elasticsearch BM25" },
    { label: "Transcripts Search UI", image: "/images/Giao_Dien_Truy_Van_Transcipts.png", desc: "Speech recognition query interface using Whisper large-v3 automated audio transcriptions" },
    { label: "Hybrid Search UI", image: "/images/Giao_Dien_Truy_Van_Highbird.png", desc: "Multi-modal hybrid retrieval combining Visual + OCR + Audio with Reciprocal Rank Fusion (RRF, k=60)" },
    { label: "TRAKE Event Search", image: "/images/Trake_search.png", desc: "TRAKE challenge solver: Tracking and aligning sequential key actions and timeline event chains" },
    { label: "Visual Q&A UI", image: "/images/Q&A.png", desc: "Visual question answering: Locating exact answers and mapping to precise video moment timestamps" },
    { label: "Video Player & Verification", image: "/images/Giao_dien_Khi_open_Video.png", desc: "Video playback interface with millisecond frame verification and 1-click Top-100 submission payload export" },
  ];

  const currentSlide = slides[activeSlide] || slides[0];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <article className="w-full flex flex-col gap-8">
      {/* 1. Header Tier: Title, Badges, Tech Ribbon */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="glass-liquid-pill px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50/80 border-blue-200">
            {project.category}
          </span>
          <span className="glass-liquid-pill px-3.5 py-1 text-xs font-bold text-slate-700">
            {project.type}
          </span>
          {project.role && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {project.role}
            </span>
          )}
        </div>

        <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {project.title}
        </h3>

        <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Ribbon */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white/90 border border-slate-200 rounded-lg shadow-2xs hover:border-blue-400 hover:text-blue-600 transition"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Central Stage: 8-View High-Resolution Gallery */}
      <div className="flex flex-col gap-4 w-full">
        {/* Gallery Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              System Architecture & UI Gallery ({slides.length} Views):
            </span>
          </div>

          <button
            type="button"
            onClick={() => onZoomImage && onZoomImage(currentSlide.image, currentSlide.label)}
            className="ios-glass-btn px-3.5 py-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
          >
            <span>🔍</span> Full Screen View
          </button>
        </div>

        {/* 8 Tab Selector Pills - iOS Segmented Control Track */}
        <div className="ios-segmented-track flex-wrap w-full gap-1.5 p-1.5">
          {slides.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`ios-glass-tab px-3 py-2 text-xs transition-all cursor-pointer ${
                  isActive
                    ? "ios-glass-tab-active-dark"
                    : "hover:text-slate-900"
                }`}
              >
                <span className="font-mono text-[10px] opacity-70 mr-1.5">0{idx + 1}</span>
                {slide.label}
              </button>
            );
          })}
        </div>

        {/* Stage Frame with Image & Next/Prev Controls */}
        <div className="relative glass-liquid-card-elevated rounded-3xl p-3 sm:p-5 w-full border border-slate-200/90 shadow-xl overflow-hidden group">
          <div
            className="relative w-full h-[380px] sm:h-[500px] md:h-[560px] flex items-center justify-center bg-white rounded-2xl border border-slate-200/80 shadow-inner overflow-hidden cursor-pointer"
            onClick={() => onZoomImage && onZoomImage(currentSlide.image, currentSlide.label)}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.label}
              className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-[1.008]"
            />

            {/* Hover overlay hint */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-slate-900/75 backdrop-blur-sm text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition shadow-md">
              Click to inspect full resolution ↗
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="ios-glass-circle absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 text-slate-800 text-xl font-bold shadow-lg transition cursor-pointer"
              aria-label="Previous view"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="ios-glass-circle absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 text-slate-800 text-xl font-bold shadow-lg transition cursor-pointer"
              aria-label="Next view"
            >
              ›
            </button>
          </div>

          {/* Caption Bar underneath */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 px-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                0{activeSlide + 1} / 0{slides.length}
              </span>
              <span className="font-bold text-slate-900 text-sm">{currentSlide.label}:</span>
              <span className="line-clamp-1">{currentSlide.desc || "System view description"}</span>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0">
              Use tabs or arrow buttons to navigate through all 8 screens
            </span>
          </div>

          {/* Thumbnail Carousel Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-3 mt-2 border-t border-slate-100">
            {slides.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`relative aspect-video rounded-lg overflow-hidden border transition cursor-pointer ${
                  activeSlide === idx
                    ? "border-indigo-600 ring-2 ring-indigo-400 shadow-sm"
                    : "border-slate-200 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={s.image}
                  alt={s.label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[9px] font-mono text-center truncate px-0.5">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Tier: 3 Detailed Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Col 1: Problem & Challenge */}
        <div className="glass-liquid-card rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500" />
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
                Core Problem & Challenge
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {project.problem}
            </p>
          </div>
        </div>

        {/* Col 2: Solution & Design */}
        <div className="glass-liquid-card rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
                Engineering Solution & Pipeline
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {project.solution}
            </p>
            {project.contributions && (
              <ul className="text-xs space-y-1.5 text-slate-500 pt-2 border-t border-slate-100">
                {project.contributions.map((c, i) => (
                  <li key={i} className="line-clamp-2">
                    • {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Col 3: Impact & Action Buttons */}
        <div className="glass-liquid-card rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
                Key Win & Benchmark Impact
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {project.impact}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
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
