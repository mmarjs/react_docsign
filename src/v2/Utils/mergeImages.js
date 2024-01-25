import { saveAs } from 'file-saver';

export default function mergeImages(mainImageSrc, overlayImageSrc) {
    const container = document.createElement('canvas');
    container.style.display = "none"
    document.body.appendChild(container); // Append the container to the document body\\\

    const image1 = new Image();
    const image2 = new Image();

    const loadMainImage = new Promise((resolve) => {
        image1.onload = resolve;
        image1.src = mainImageSrc;
    });

    const loadOverlayImage = new Promise((resolve) => {
        image2.onload = resolve;
        image2.src = overlayImageSrc;
    });

    return Promise.all([loadMainImage, loadOverlayImage])
        .then(() => {
            container.width = image1.width; // Set container width to match main image width
            container.height = image1.height; // Set container height to match main image height

            const context = container.getContext('2d');
            context.clearRect(0, 0, container.width, container.height);
            context.drawImage(image1, 0, 0, container.width, container.height);
            context.globalCompositeOperation = 'source-over';
            context.drawImage(image2, 0, 0, image2.width, image2.height);
            context.globalCompositeOperation = 'source-over';

            const dataURL = container.toDataURL('image/png');
            // saveAs(dataURL, 'merged_image.png');
            return dataURL;
        })
        .catch((error) => {
            console.error(error);
        });
}
