import jsPDF from "jspdf";
///jsPDF.GlobalWorkerOptions.workerSrc = "./assets/js/pdf.worker.js";

const convertImagesToPdf = (imageUrls, pdfFileName) => {
  const doc = new jsPDF("p", "mm", "a4");

  imageUrls.forEach((url, index) => {
    const img = new Image();
    img.src = url;
    doc.addImage(img, "JPEG", 0, 0, 210, 297); // Adjust the dimensions as needed
    if (index < imageUrls.length - 1) {
      doc.addPage();
    }
  });

  doc.save(pdfFileName);
};

export default convertImagesToPdf;
