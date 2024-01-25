import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FieldInserter from "./fieldInserter";
import FieldPalate from "./fieldPalate";
import FieldItem from "./moveableField.js";
import pdff from "../../remoteDataMock/Documentabc/sample.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePage(props) {
  const [existingFields, setExistingFields] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // setting 1 to show the first page
  const documentRef = useRef(null); // Create a ref for the canvas
  const pageRef = useRef(null); // Create a ref for the canvas
  const [pdf, setPdf] = useState(pdff);

  const saveFieldsAsJson = () => {
    // Update each item in existingFields before saving
    const updatedFields = existingFields.map((field) => ({
      ...field,
      prevSaved: true,
    }));

    const jsonContent = JSON.stringify(updatedFields, null, 2); // Convert the object to JSON with pretty formatting

    // Create a Blob with the JSON content
    const blob = new Blob([jsonContent], { type: "application/json" });

    // Create a temporary URL to the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element for downloading the file
    const a = document.createElement("a");
    a.href = url;
    a.download = "existingFields.json"; // Set the filename for the JSON file

    // Trigger a click event on the anchor element to start the download
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset, event) {
    // Prevent the default behavior (scrolling) when the button is clicked
    event.preventDefault();
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage(event) {
    changePage(-1, event);
  }

  function nextPage(event) {
    changePage(1, event);
  }

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

  return (
    <>
      <label>
        Normal PDF
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setPdf(reader.result);
            };
          }}
        />
      </label>
      <label>
        Saved Fields
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8"); // Read the file as text (JSON)

            reader.onload = () => {
              // Handle the JSON file content here
              const jsonContent = reader.result;

              // Perform your JSON processing, e.g., parse JSON
              try {
                const parsedData = JSON.parse(jsonContent);
                console.log("loaded json: ", jsonContent);
                setExistingFields(parsedData);

                // Do something with the parsed JSON data
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            };
          }}
        />
      </label>
      <button
        className="btn btn-primary account-btn"
        hidden
        onClick={saveFieldsAsJson}
      >
        Save Fields
      </button>

      <FieldPalate
        existingFields={existingFields}
        setExistingFields={setExistingFields}
        pageRef={pageRef}
        pageNumber={pageNumber}
      ></FieldPalate>

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
          >
            {existingFields.map((field) => (
              <FieldItem
                key={`fieldID_${field.id}`}
                pageRef={pageRef}
                id={field.id}
                existingFields={existingFields}
                setExistingFields={setExistingFields}
                pageNumber={pageNumber}
                fieldTypeCode={"TemplateFullName"}
              />
            ))}
          </Page>
        </Document>
        <Nav />
      </div>
    </>
  );
}

{
  /* <FieldInserter
  existingFields={existingFields}
  setExistingFields={setExistingFields}
  pageRef={pageRef}
  pageNumber={pageNumber}
/> */
}
