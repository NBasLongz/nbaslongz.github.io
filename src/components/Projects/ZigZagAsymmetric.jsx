import React, { useState } from "react";
import ProjectActionButtons from "./ProjectActionButtons";

export default function ZigZagAsymmetric({ project, onOpenSlide, onOpenPdf, onZoomImage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* LEFT COLUMN: Visual Media (PDF / Multi-Diagram Gallery) - 6 or 7 cols */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {project.pdfEmbed ? (
          /* Case 1: RAG Lecture Q&A with embedded PDF flowchart + UI Screenshot */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Pipeline Flowchart Architecture (Interactive Embed)
              </span>
              <button
                type="button"
                onClick={() => onOpenPdf && onOpenPdf(project.pdfEmbed, `Pipeline Flowchart: ${project.title}`)}
                className="ios-glass-btn px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Expand ↗
              </button>
            </div>

            {/* Embedded PDF iframe */}
            <div className="w-full h-[340px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white relative">
              <iframe
                src={`${project.pdfEmbed}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-full border-none"
                title={`${project.title} Flowchart`}
              />
            </div>

            {/* UI Screenshot below */}
            <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white p-2">
              <img
                src={project.image}
                alt={`${project.title} UI`}
                className="w-full h-auto max-h-[220px] object-contain rounded-xl transition group-hover:scale-[1.01]"
              />
              <button
                type="button"
                onClick={() => onZoomImage && onZoomImage(project.image, `${project.title} Interface`)}
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition backdrop-blur-xs cursor-pointer"
              >
                🔍 Enlarge Q&A Interface
              </button>
            </div>
          </div>
        ) : project.slides ? (
          /* Case 2: Citation Trend Prediction with 3 Diagram Switcher */
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="ios-segmented-track flex-wrap gap-1 p-1">
                {project.slides.map((slide, idx) => {
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
                      {slide.label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => onZoomImage && onZoomImage(project.slides[activeSlide].image, project.slides[activeSlide].label)}
                className="ios-glass-btn px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                🔍 Zoom
              </button>
            </div>

            <div
              className="relative group w-full h-[360px] sm:h-[440px] flex items-center justify-center bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-4 cursor-pointer"
              onClick={() => onZoomImage && onZoomImage(project.slides[activeSlide].image, project.slides[activeSlide].label)}
            >
              <img
                src={project.slides[activeSlide].image}
                alt={project.slides[activeSlide].label}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/70 backdrop-blur-sm text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                Click to zoom ↗
              </div>
            </div>
          </div>
        ) : (
          <div
            className="relative group w-full h-[360px] flex items-center justify-center bg-white rounded-2xl border border-slate-200 shadow-sm p-4 cursor-pointer"
            onClick={() => onZoomImage && onZoomImage(project.image, project.title)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Text, Architecture Breakdown & Action Buttons - 5 or 6 cols */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
        {/* Category & Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="glass-liquid-pill px-3 py-0.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50/80 border-emerald-200">
            {project.category}
          </span>
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

        {/* Problem & Solution description */}
        <div className="space-y-3.5 pt-2 text-sm leading-relaxed text-slate-600">
          {project.problem && (
            <div>
              <p className="font-bold text-slate-900 mb-0.5">Problem Statement:</p>
              <p>{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <p className="font-bold text-slate-900 mb-0.5">Engineered Solution:</p>
              <p>{project.solution}</p>
            </div>
          )}

          {project.impact && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Key Win & Empirical Impact: </span>
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
    </article>
  );
}
