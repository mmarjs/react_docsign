import componentToImgURL from './componentToImgURL'; // Import the function
import imgURLToBlob from './imgURLToBlob'; // Import the function
import { saveAs } from 'file-saver';
import mergeImages from './mergeImages'; // Import the function


export default async function mergeCompToImg({ FieldComponent, page }) {

    const fieldComponentImg = await componentToImgURL(<FieldComponent />)
   // console.log(page)
    const mergedImages = await mergeImages(page, fieldComponentImg)
   // console.log("aaaaaaaaaaaaaaaa",mergedImages)

    return mergedImages
    //saveAs(mergedImages, 'component_image.png');

}



