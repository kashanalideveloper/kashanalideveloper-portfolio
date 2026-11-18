// src/app/Components/CvDownloadButton.jsx
"use client";

import { SITE } from "../lib/site";

export default function CvDownloadButton({ className, children = "Download CV" }) {
  const handleClick = (e) => {
    e.preventDefault();
    const downloaded = typeof window !== "undefined" && localStorage.getItem("malik_kashan_cv_downloaded");

    if (downloaded) {
      // Already downloaded before -> open CV in a new tab
      window.open(SITE.cvFile, "_blank");
    } else {
      // First time -> direct download without prompting any window or option
      if (typeof window !== "undefined") {
        localStorage.setItem("malik_kashan_cv_downloaded", "true");
      }
      const link = document.createElement("a");
      link.href = SITE.cvFile;
      link.download = "Malik_Kashan_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button onClick={handleClick} type="button" className={`cursor-pointer ${className || ""}`}>
      {children}
    </button>
  );
}
