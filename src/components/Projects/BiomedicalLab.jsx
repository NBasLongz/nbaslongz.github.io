import React, { useState } from "react";
import ProjectActionButtons from "./ProjectActionButtons";

export default function BiomedicalLab({ project, onOpenSlide, onOpenPdf, onZoomImage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const gallerySlides = project.slides || [
    { label: "01. Results Comparison", image: "/images/HTS.png" },
    { label: "02. Skip Connections", image: "/images/evolution_skip_connections.png" },
    { label: "03. Transformer Bottleneck", image: "/images/hybrid_transformer_bottleneck.png" },
    { label: "04. Edge-Aware Loss", image: "/images/ea_ftl_diagram (1).png" },
  ];

  return (
    <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* LEFT COLUMN: Medical Research Highlights & Metrics */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
        {/* Badges & Jaccard Gain Achievement */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="glass-liquid-pill px-3 py-1 text-xs font-black uppercase tracking-wider text-violet-700 bg-violet-50/80 border-violet-200">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-300 shadow-sm animate-pulse">
            <span>✨</span> +5.83% Jaccard Gain
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {project.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {project.title}
        </h3>

        {/* Subtitle / Overview */}
        {project.overview && (
          <p className="text-sm font-semibold text-violet-800 bg-violet-50/70 p-3 rounded-xl border border-violet-100">
            {project.overview}
          </p>
        )}

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

        {/* Detailed Contributions */}
        <div className="space-y-3 pt-2 text-sm leading-relaxed text-slate-600">
          <div>
            <p className="font-bold text-slate-900 mb-1">Key Scientific Contributions:</p>
            <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc marker:text-violet-500">
              {project.contributions ? (
                project.contributions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))
              ) : (
                <>
                  <li>Integrated Squeeze-and-Excitation (SE) blocks and localized Multi-Head Self-Attention (MHSA) at the bottleneck to capture multi-scale global context.</li>
                  <li>Developed an Edge-Aware Focal Tversky Loss using the Sobel operator to enhance anatomical boundary delineation under extreme class imbalance.</li>
                </>
              )}
            </ul>
          </div>

          {project.result && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Quantitative Results: </span>
              <span>{project.result}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
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

      {/* RIGHT COLUMN: 4-Diagram Medical Gallery */}
      <div className="lg:col-span-7 flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-200/60">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            4-Diagram Medical Architecture Gallery
          </span>
          <button
            type="button"
            onClick={() => onZoomImage && onZoomImage(gallerySlides[activeSlide].image, gallerySlides[activeSlide].label)}
            className="ios-glass-btn px-3 py-1 text-xs font-semibold text-violet-700 hover:text-violet-900 cursor-pointer"
          >
            🔍 Full Screen View
          </button>
        </div>

        {/* 4 Gallery Switcher Pills - iOS Segmented Control Track */}
        <div className="ios-segmented-track flex flex-wrap w-full p-1.5 gap-1.5">
          {gallerySlides.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`ios-glass-tab flex-1 min-w-[125px] sm:min-w-[135px] py-2 px-2.5 text-xs font-semibold text-center transition-all cursor-pointer ${
                  isActive
                    ? "ios-glass-tab-active-dark"
                    : "hover:text-slate-900"
                }`}
              >
                <span className="truncate block w-full">{slide.label}</span>
              </button>
            );
          })}
        </div>

        {/* High Resolution Image Stage */}
        <div
          className="relative group w-full h-[380px] sm:h-[460px] flex items-center justify-center bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden p-4 cursor-pointer"
          onClick={() => onZoomImage && onZoomImage(gallerySlides[activeSlide].image, gallerySlides[activeSlide].label)}
        >
          <img
            src={gallerySlides[activeSlide].image}
            alt={gallerySlides[activeSlide].label}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/70 backdrop-blur-sm text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
            Click to zoom ↗
          </div>
        </div>
      </div>
    </article>
  );
}
