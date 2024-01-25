/*var pdfjsLib = window["pdfjs-dist/build/pdf"];//why doesnt this work?
pdfjsLib.GlobalWorkerOptions.workerSrc = "./assets/js/pdf.worker.js";
*/

import * as PDFJS from 'pdfjs-dist'

//pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

async function convertURLToBlob(pdfUrl) {
    try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch the PDF file: ${response.status} ${response.statusText}`);
        }
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error fetching PDF as Blob:', error);
        return null; // You can handle the error as needed
    }
};

async function convertURLToBlobURL(pdfUrl) {
    return fetch(pdfUrl)
        .then(response => response.blob())
        .then(blob => {
            // Step 2: Generate a Blob URL from the Blob
            const blobUrl = URL.createObjectURL(blob);

            // You can now use the blobUrl in your application
            //console.log(blobUrl);
            return blobUrl
        })
        .catch(error => {
            console.error('Error fetching the PDF file:', error);
        });
};




const convertPdfToImages = async (pdfUrl) => {
    const data = await fetch(pdfUrl).then((response) =>
        response.blob().then((blob) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsArrayBuffer(blob);
            })
        )
    );

    const imagesList = [];
    const pdf = await PDFJS.getDocument(data).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext: canvas.getContext("2d"),
            viewport: viewport,
        };
        await page.render(renderContext).promise;
        const img = canvas.toDataURL("image/png");
        imagesList.push(img);
    }
    return imagesList;
};


export default convertPdfToImages
