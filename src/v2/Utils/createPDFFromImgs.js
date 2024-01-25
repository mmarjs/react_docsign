import { jsPDF } from "jspdf";

const A4_WIDTH = 595; // Width of A4 page in points
const A4_HEIGHT = 842; // Height of A4 page in points

const mergeImagesToPdf = ({ imageUrls, fileName }) => {
    if (imageUrls.length === 0) {
        return;
    }

    const doc = new jsPDF();

    const addImageToDoc = async (url, index) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                doc.addImage(img, "PNG", 0, 0);

                if (index < imageUrls.length - 1) {
                    doc.addPage(); // Add a new page for each image except the last one
                }
                resolve();
            };

            img.onerror = () => {
                reject(new Error(`Failed to load image at index ${index}: ${url}`));
            };
        });
    };

    const promises = imageUrls.map((url, index) => addImageToDoc(url, index));

    Promise.all(promises)
        .then(() => {
            doc.save(`${fileName}_merged.pdf`);
        })
        .catch((error) => {
            console.error("Error loading images:", error);
        });
};

export default mergeImagesToPdf;




/*import { jsPDF } from "jspdf";


const mergeImagesToPdf = ({ imageUrls, fileName }) => {
    if (imageUrls.length === 0) {
        return;
    }

    const doc = new jsPDF();

    const addImageToDoc = async (url, index) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                // Add an image to the PDF document
                doc.addImage(img, "PNG", 0, 0, doc.width, doc.height);
                if (index < imageUrls.length - 1) {
                    doc.addPage(); // Add a new page for each image except the last one
                }
                resolve();
            };

            img.onerror = () => {
                reject(new Error(`Failed to load image at index ${index}: ${url}`));
            };
        });
    };

    const promises = imageUrls.map((url, index) => addImageToDoc(url, index));

    Promise.all(promises)
        .then(() => {
            doc.save(`${fileName}_merged.pdf`);
        })
        .catch((error) => {
            console.error("Error loading images:", error);
        });
};



export default mergeImagesToPdf;
*/



/*import { jsPDF } from "jspdf";
const mergeImagesToPdf = ({ imageUrls, fileName }) => {
    console.log(imageUrls)
    if (imageUrls.length === 0) {
        return;
    }
    const doc = new jsPDF();
    imageUrls.forEach((url, index) => {
        // Add an image to the PDF document
        doc.addImage(url, "PNG", 0, 0, url.width, url.height); // You can adjust the coordinates and dimensions as needed
        if (index < imageUrls.length - 1) {
            doc.addPage(); // Add a new page for each image except the last one
        }
    });

    return doc
    // Save or download the PDF
    //doc.save(`${fileName}_merged.pdf`);
};

export default mergeImagesToPdf*/