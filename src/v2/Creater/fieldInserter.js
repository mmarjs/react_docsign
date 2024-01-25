import React, { useEffect } from 'react';
import FieldItem from './moveableField';

function FieldInserter(props) {
    const { existingFields, setExistingFields, pageRef, pageNumber } = props;

    const handleButtonClick = () => {
        const newField = {
            id: existingFields.length,
         //   width: 100,
           // height: 100,
            x: 0,
            y: 0,
            pageNumber,
            fieldTypeCode: "TemplateSignature"
        };

        setExistingFields((prevFields) => [...prevFields, newField]);
    };

    useEffect(() => {
        console.log("updated to: ", existingFields);
    }, [existingFields]);

    const deleteField = (id) => {
        const updatedFields = existingFields.filter((field) => field.id !== id);
        console.log("updatedFields", updatedFields)

        setExistingFields(updatedFields);
    };

    return (
        <div>
            <button className="btn btn-primary account-btn"  onClick={handleButtonClick}>Create FieldItem</button>
            {existingFields.map((field) => (
                <FieldItem

                    key={`fieldID_${field.id}`}
                    pageRef={pageRef}
                    id={field.id}
                    size={{
                        height: field.height,
                        width: field.width,
                    }}
                    existingFields={existingFields}
                    setExistingFields={setExistingFields}
                    deleteField={deleteField}
                    pageNumber={pageNumber}
                    fieldTypeCode={"TemplateFullName"}
                />
            ))}
        </div>
    );
}

export default FieldInserter;

