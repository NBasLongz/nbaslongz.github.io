import React from "react";

export default function ProjectActionButtons({
  githubPath,
  slidePath,
  pdfPath,
  title,
  onOpenSlide,
  onOpenPdf,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 pt-2 ${className}`}>
      {githubPath && (
        <a
          href={githubPath}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
          GitHub Code
        </a>
      )}

      {slidePath && (
        <button
          type="button"
          onClick={() => onOpenSlide && onOpenSlide(slidePath, `Slides: ${title}`)}
          className="ios-glass-btn px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-indigo-700 hover:text-indigo-900 border-indigo-200/80 hover:border-indigo-300 transition cursor-pointer"
        >
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          View Slides
        </button>
      )}

      {pdfPath && (
        <button
          type="button"
          onClick={() => onOpenPdf && onOpenPdf(pdfPath, `Report: ${title}`)}
          className="ios-glass-btn px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 border-emerald-200/80 hover:border-emerald-300 transition cursor-pointer"
        >
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Report (PDF)
        </button>
      )}
    </div>
  );
}
