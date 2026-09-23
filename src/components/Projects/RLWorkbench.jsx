import React from "react";
import ProjectActionButtons from "./ProjectActionButtons";

export default function RLWorkbench({ project, onOpenSlide, onOpenPdf, onZoomImage }) {
  const isDashBot = project.title.toLowerCase().includes("dashbot");

  return (
    <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* 7 COLUMNS CONTENT (LEFT) */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
        {/* Category & Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="glass-liquid-pill px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-800 bg-cyan-50/80 border-cyan-200">
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

        {/* Deep RL / Methodology Narrative */}
        <div className="space-y-3 pt-2 text-sm leading-relaxed text-slate-600">
          {project.methodology && (
            <div>
              <p className="font-bold text-slate-900 mb-1">Reinforcement Learning Framework (MDP & A3C):</p>
              <p>{project.methodology}</p>
            </div>
          )}

          {project.problem && (
            <div>
              <p className="font-bold text-slate-900 mb-1">Core Challenge:</p>
              <p>{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <p className="font-bold text-slate-900 mb-1">Algorithm & Optimization Loop:</p>
              <p>{project.solution}</p>
            </div>
          )}

          {/* User Study Callout Card for DashBot */}
          {isDashBot ? (
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/90 text-slate-800 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-900 flex items-center gap-1.5 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-600" />
                Expert User Study (10 Evaluators):
              </span>
              <p className="text-xs sm:text-sm leading-normal">
                Outperformed the <span className="font-semibold text-slate-900">MultiVision</span> baseline in{" "}
                <span className="font-bold text-cyan-800">88%</span> of cases for{" "}
                <span className="font-semibold">Information Depth</span> and{" "}
                <span className="font-bold text-cyan-800">84%</span> of cases for{" "}
                <span className="font-semibold">Understandability</span>.
              </p>
            </div>
          ) : project.impact ? (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Convergence Impact: </span>
              <span>{project.impact}</span>
            </div>
          ) : null}
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

      {/* 5 COLUMNS VISUAL DIAGRAM (RIGHT) */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isDashBot ? "Multi-Agent Dashboard Generation Pipeline" : "2D Reward Design Closed Loop"}
          </span>
          <button
            type="button"
            onClick={() => onZoomImage && onZoomImage(project.image, project.title)}
            className="ios-glass-btn px-2.5 py-1 text-xs font-semibold text-cyan-700 hover:text-cyan-900 cursor-pointer"
          >
            🔍 Zoom
          </button>
        </div>

        <div
          className="relative group w-full h-[320px] sm:h-[380px] flex items-center justify-center bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-4 cursor-pointer"
          onClick={() => onZoomImage && onZoomImage(project.image, project.title)}
        >
          <img
            src={project.image}
            alt={project.title}
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
