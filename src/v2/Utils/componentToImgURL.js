import html2canvas from "html2canvas";

const downloadImage = async (element) => {
  return new Promise(async (resolve, reject) => {
    try {
      const canvas = await html2canvas(element, {
        allowTaint: false,
        letterRendering: true,
        logging: false,
        scale: 1.5,
      });

      const data = canvas.toDataURL("image/jpeg", 1.0);

      resolve(data); // Resolve the promise when the download is completed
    } catch (error) {
      console.log("error in comp to img");
      reject(error); // Reject the promise if there's an error
    }
  });
};

export default downloadImage;
