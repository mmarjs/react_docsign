import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import FieldItem from "./fieldContainer";
import samplePdf from "../../remoteDataMock/Documentabc/sample.pdf";
import savedExistingFields from "../../remoteDataMock/Documentabc/existingFields.json";

import Form from "./form";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePage() {
  const [existingFields, setExistingFields] = useState([]);

  useEffect(() => {
    setExistingFields(savedExistingFields);
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // setting 1 to show the first page
  const documentRef = useRef(null); // Create a ref for the canvas
  const pageRef = useRef(null); // Create a ref for the canvas
  const [pdf, setPdf] = useState(samplePdf);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset, event) {
    // Prevent the default behavior (scrolling) when the button is clicked
    event?.preventDefault();
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage(event) {
    changePage(-1, event);
  }

  function nextPage(event) {
    changePage(1, event);
  }

  const captureAreaRef = useRef(null); // Create a ref for the canvas

  function startCapture() {
    // Move the element off screen to the left
    captureAreaRef.current.style.position = "absolute";
    captureAreaRef.current.style.left = "-9999px";
  }

  function endCapture() {
    // Move the element off screen to the left
    setPageNumber(1);
    captureAreaRef.current.style.position = "";
    captureAreaRef.current.style.left = "0px";
  }

  return (
    <>
      <Form
        savedExistingFields={savedExistingFields}
        setExistingFields={setExistingFields}
        pageRef={pageRef}
        existingFields={existingFields}
        nextPage={nextPage}
        numPages={numPages}
        startCapture={startCapture}
        endCapture={endCapture}
      ></Form>
      <div ref={captureAreaRef}>
        {existingFields.map((field) => (
          <FieldItem
            key={`fieldID_${field.id}`}
            pageRef={pageRef}
            id={field.id}
            existingFields={existingFields}
            setExistingFields={setExistingFields}
            pageNumber={pageNumber}
          />
        ))}
        <div className="pdf-container">
          <Nav />
          <Document
            inputRef={(ref) => (documentRef.current = ref)} // Assign the ref to documentRef
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              scale={1.5}
              className="MoveWithin"
              pageNumber={pageNumber}
              inputRef={(ref) => (pageRef.current = ref)} // Assign the ref to documentRef
            ></Page>
          </Document>
          <Nav />
        </div>
      </div>
      <div id="pdfCanvas"></div>
    </>
  );

  function Nav() {
    return (
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button
          className="btn btn-primary account-btn"
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          className="btn btn-primary account-btn"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    );
  }
}
