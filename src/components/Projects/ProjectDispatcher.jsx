import React from "react";
import PanoramicHeroStage from "./PanoramicHeroStage";
import ZigZagAsymmetric from "./ZigZagAsymmetric";
import BiomedicalLab from "./BiomedicalLab";
import MultiTaskDashboard from "./MultiTaskDashboard";
import RLWorkbench from "./RLWorkbench";
import ClassicalCVAndText from "./ClassicalCVAndText";

export default function ProjectDispatcher({ project, onOpenSlide, onOpenPdf, onZoomImage }) {
  const title = (project.title || "").toLowerCase();

  // 1. Panoramic Hero Stage
  if (title.includes("aic multimodal") || title.includes("video retrieval system")) {
    return (
      <PanoramicHeroStage
        project={project}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  // 3. Biomedical Lab
  if (title.includes("hts-multiresunet") || title.includes("medical")) {
    return (
      <BiomedicalLab
        project={project}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  // 4. Multi-Task NLP Dashboard
  if (title.includes("sentiment & topic") || title.includes("course reviews")) {
    return (
      <MultiTaskDashboard
        project={project}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  // 2. Zig-Zag Asymmetric (RAG Lecture Q&A or Citation Trend)
  if (title.includes("lecture video") || title.includes("citation trend")) {
    return (
      <ZigZagAsymmetric
        project={project}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  // 5. RL Workbench (DashBot or Self-Refined RL)
  if (title.includes("dashbot") || title.includes("self-refined")) {
    return (
      <RLWorkbench
        project={project}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  // 6. Classical CV & Text Processing
  if (title.includes("animal")) {
    return (
      <ClassicalCVAndText
        project={project}
        invertLayout={false}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  if (title.includes("hate speech")) {
    return (
      <ClassicalCVAndText
        project={project}
        invertLayout={true}
        onOpenSlide={onOpenSlide}
        onOpenPdf={onOpenPdf}
        onZoomImage={onZoomImage}
      />
    );
  }

  // Fallback
  return (
    <ZigZagAsymmetric
      project={project}
      onOpenSlide={onOpenSlide}
      onOpenPdf={onOpenPdf}
      onZoomImage={onZoomImage}
    />
  );
}
