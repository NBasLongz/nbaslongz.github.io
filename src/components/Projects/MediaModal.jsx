import React, { useEffect } from "react";

export default function MediaModal({ isOpen, onClose, type, title, src }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative flex flex-col w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h4 className="font-heading text-sm font-bold text-slate-800 tracking-tight line-clamp-1">
              {title || (type === "pdf" ? "Document / PDF Report" : "Architecture Diagram Details")}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {type === "pdf" && (
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex ios-glass-btn px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer"
              >
                Open in new tab ↗
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ios-glass-circle w-8 h-8 text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 w-full overflow-auto bg-slate-100/50 p-2 sm:p-4 flex items-center justify-center min-h-[420px]">
          {type === "pdf" ? (
            <iframe
              src={`${src}#toolbar=1&navpanes=0&scrollbar=1`}
              className="w-full h-[76vh] rounded-xl border border-slate-200 bg-white"
              title={title || "PDF Viewer"}
            />
          ) : (
            <div className="relative max-w-full max-h-[80vh] flex items-center justify-center overflow-auto rounded-xl bg-white p-3 shadow-inner">
              <img
                src={src}
                alt={title || "Zoomed visual diagram"}
                className="max-w-full max-h-[78vh] object-contain rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white text-xs text-slate-500 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px] text-slate-700">ESC</kbd> or click outside to dismiss</span>
          {type === "image" && (
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View original full resolution ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
