import React from 'react';
import './FieldPalate.css'; // Import a CSS file for styling

function FieldPalate(props) {

    const { existingFields, setExistingFields, pageNumber } = props;

    const saveFieldsAsJson = () => {
        // Update each item in existingFields before saving
        const updatedFields = existingFields.map(field => ({
            ...field,
            prevSaved: true,
        }));

        const jsonContent = JSON.stringify(updatedFields, null, 2); // Convert the object to JSON with pretty formatting

        // Create a Blob with the JSON content
        const blob = new Blob([jsonContent], { type: 'application/json' });

        // Create a temporary URL to the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element for downloading the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'existingFields.json'; // Set the filename for the JSON file

        // Trigger a click event on the anchor element to start the download
        a.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(url);
    };


    const handleFieldClick = (fieldType) => {
        const newField = {
            id: existingFields.length,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            pageNumber,
            fieldTypeCode: fieldType
        };

        setExistingFields((prevFields) => [...prevFields, newField]);
    };

    return (
        <div className="field-palate">
            <div>
                <button className="btn btn-primary account-btn"  onClick={() => handleFieldClick('TemplateSignature')}>Signature</button>
            </div>
            <div>
                <button className="btn btn-primary account-btn"  onClick={() => handleFieldClick('TemplateFullName')}>Full Name</button>
            </div>
            <div>
                <button className="btn btn-primary account-btn save-button"  onClick={() => saveFieldsAsJson()}>Save All Fields</button>
            </div>

        </div>
    );
}

export default FieldPalate;
