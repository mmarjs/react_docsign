compress the completed pdf 

import { PDFDocument, rgb } from 'pdf-lib';

// Assuming you have a function to load the PDF file
const loadPdf = async () => {
  const url = 'path-to-your-pdf.pdf'; // Replace with your PDF file's path
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  // Load the existing PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Compress the PDF (e.g., by removing redundant information)
  pdfDoc.compress();

  // Serialize the modified PDF to bytes
  const modifiedPdfBytes = await pdfDoc.save();

  // Now you can use modifiedPdfBytes as your compressed PDF
};
