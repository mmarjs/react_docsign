import React, { useEffect, useState, useRef } from 'react';
import v2ImgsToPDF from "../Utils/v2ImgsToPDF"
import componentToImgURL from "../Utils/componentToImgURL"
import Sig from "./signiture/Signer"

const AutoPopulatedForm = ({ savedExistingFields, setExistingFields, pageRef, endCapture, existingFields, startCapture, nextPage, numPages }) => {
    const [uniqueFieldTypes, setUniqueFieldTypes] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [completedPDF, setCompletedPDF] = useState({});

    const form = useRef();

    async function capturePages() {
        startCapture()
        const pdfPagesAsImages = []
        for (let index = 0; index < numPages + 1; index++) {
            const page = await componentToImgURL(pageRef.current);
            await pdfPagesAsImages.push(page)
            await new Promise((resolve) => setTimeout(resolve, 300)); // 1000 milliseconds (1 second) delay
            if(index < numPages) await nextPage();
        }
        pdfPagesAsImages.shift();
        return pdfPagesAsImages
    }

    async function HandleSaving() {
        const pdfPagesAsImages = await capturePages()
        await setCompletedPDF(pdfPagesAsImages)
    }

    useEffect(() => {
        extractUniqueFieldTypes(savedExistingFields);
    }, [savedExistingFields]);

    const extractUniqueFieldTypes = (data) => {
        const uniqueTypes = [...new Set(data.map((item) => item.fieldTypeCode))];
        setUniqueFieldTypes(uniqueTypes);
    };

    const fieldTypeTextMap = {
        "TemplateSignature": "Signature",
        "TemplateFullName": "Full Name",
    };
    const handleButtonClick = async () => {
        await setIsSaving(true)
        const realData = await getInputValues();
        const updatedFields = savedExistingFields.map((field) => {
            const fieldType = field.fieldTypeCode;

            return {
                ...field,
                "real data": realData[fieldType],
            };
        });

        await setExistingFields(updatedFields);
        await HandleSaving()
        await setIsSaving(false)
        await setIsSaved(true)
        await endCapture()
    };

    function DownloadCopy() {
        v2ImgsToPDF(completedPDF)
    }

    function getInputValues() {
        const inputValues = {};

        // Find all input elements with type "text" inside the form container
        const inputElements = form.current.querySelectorAll('input[type="text"], img');

        // Iterate through the input elements and extract their values
        inputElements.forEach((input) => {
            const name = input.getAttribute('name');

            if (input.tagName === 'INPUT') {
                // For input elements, extract the value
                const value = input.value;
                inputValues[name] = value;
            } else if (input.tagName === 'IMG') {
                // For img elements, extract the src attribute
                const src = input.getAttribute('src');
                inputValues[name] = src;
            }
        });

        return inputValues;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="auto-populated-form form-group">
                    {
                        isSaving && <div> PLEASE WAIT... <br></br>Signing and Submitting document</div>
                    }
                    {isSaved ? (
                        <>
                            <div>Document Signed and Submitted</div>
                            <button className="btn btn-primary account-btn" onClick={DownloadCopy}>Download a copy</button>
                        </>
                    ) :
                        <div ref={form}
                            style={{
                                position: isSaving ? "absolute" : "static",
                                left: isSaving ? "-9999px" : "0px"
                            }}
                        >
                            {uniqueFieldTypes.map((fieldType) => {
                                if (fieldType == "TemplateSignature") {
                                    return <Sig key={fieldType}></Sig>
                                }
                                return <div key={fieldType} className="field-container">
                                    <h3>{fieldTypeTextMap[fieldType]}</h3>
                                    <input className='form-control'
                                        type="text" name={fieldType} placeholdera={`Enter ${fieldType}`} />
                                </div>
                            }
                            )}
                            <button className="btn btn-primary account-btn" onClick={handleButtonClick}>Submit</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );

};

export default AutoPopulatedForm;
