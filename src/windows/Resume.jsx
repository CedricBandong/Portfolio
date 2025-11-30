import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs', 
    import.meta.url,
    ).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header" >
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a href="files/resume.pdf" download className="cursor-pointer" title="Download resume">
            <Download className="icon" />
        </a>
      </div>

        <div style={{ height: "85vh", overflowY: "scroll" }}>

            <Document file="files/resume2.pdf">
                <Page 
                pageNumber={1} 
                renderTextLayer 
                renderAnnotationLayer />
                <Page 
                pageNumber={2} 
                renderTextLayer 
                renderAnnotationLayer />
            </Document>
        </div>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;