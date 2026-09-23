import React, { useState } from "react";
import ProjectActionButtons from "./ProjectActionButtons";

export default function ClassicalCVAndText({ project, onOpenSlide, onOpenPdf, onZoomImage, invertLayout = false }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = project.slides || [
    { label: "Pipeline Flowchart", image: project.image },
  ];

  const isAnimal = project.title.toLowerCase().includes("animal");

  const textContent = (
    <div className="flex flex-col justify-center space-y-4">
      {/* Category & Badge */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="glass-liquid-pill px-3 py-1 text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50/80 border-teal-200">
          {project.category}
        </span>
        {isAnimal ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            ★ 95% Accuracy AFHQ
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            ★ Macro F1: 0.6172 (UIT-ViHSD)
          </span>
        )}
        <span className="text-xs font-semibold text-slate-500">
          {project.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
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

      {/* Problem & Feature Engineering Narrative */}
      <div className="space-y-3 pt-2 text-sm leading-relaxed text-slate-600">
        {project.problem && (
          <div>
            <p className="font-bold text-slate-900 mb-0.5">Problem Statement:</p>
            <p>{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div>
            <p className="font-bold text-slate-900 mb-0.5">Solution & Feature Extraction:</p>
            <p>{project.solution}</p>
          </div>
        )}

        {project.impact && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900">Benchmark Performance: </span>
            <span>{project.impact}</span>
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
  );

  const mediaContent = (
    <div className="flex flex-col gap-3.5">
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
        className="relative group w-full h-[360px] sm:h-[420px] flex items-center justify-center bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-4 cursor-pointer"
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
  );

  return (
    <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {invertLayout ? (
        <>
          <div className="lg:col-span-7">{mediaContent}</div>
          <div className="lg:col-span-5">{textContent}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-5">{textContent}</div>
          <div className="lg:col-span-7">{mediaContent}</div>
        </>
      )}
    </article>
  );
}
