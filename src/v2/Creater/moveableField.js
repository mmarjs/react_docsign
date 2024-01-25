import React, { useEffect, useState, useRef, useMemo } from 'react';
import Draggable from 'react-draggable';
import './fieldController.css'
import { SignatureTEmplate, SignatureTEmplateSize } from './templates/Signature'
import { FullNameTemplate, FullNameTemplateSize } from './templates/fullName'

function FieldItem(props) {
    const { pageRef, id, pageNumber } = props;
    const { existingFields, setExistingFields } = props;

    const [actualField, setActualField] = useState({
        component: undefined,
        width: null,
        height: null
    });

    const deleteElementRef = useRef();
    const DraggableRef = useRef();

    const fieldTypeCode = existingFields?.find(field => field.id === id)?.fieldTypeCode
    
    function SetActualFieldState() {
        const tempactualField = {
            component: undefined,
            width: null,
            height: null,
        };

        switch (fieldTypeCode) {
            case 'TemplateSignature':
                tempactualField.component = SignatureTEmplate;
                tempactualField.width = SignatureTEmplateSize().width;
                tempactualField.height = SignatureTEmplateSize().height;
                break;
            case 'TemplateFullName':
                tempactualField.component = FullNameTemplate;
                tempactualField.width = FullNameTemplateSize().width;
                tempactualField.height = FullNameTemplateSize().height;
                break;
            case 'TemplateFirstName':
                tempactualField.component = FullNameTemplate;
                tempactualField.width = FullNameTemplateSize().width;
                tempactualField.height = FullNameTemplateSize().height;
                break;
            case 'TemplateLastName':
                tempactualField.component = FullNameTemplate;
                tempactualField.width = FullNameTemplateSize().width;
                tempactualField.height = FullNameTemplateSize().height;
                break;
            default:
                break;
        }

        setActualField(tempactualField);
    }


    useEffect(() => {
        SetActualFieldState()
    }, [pageRef?.current]);

    const handleFirstMouseDown = (e) => {
        if (deleteElementRef.current.contains(e.target)) {
            setExistingFields((prev) => [...prev.filter(field => field.id != id)]);
        }
        setClassNameDraggable("")
    };

    const [ClassNameDraggable, setClassNameDraggable] = useState(existingFields.find(field => field.id === id)?.prevSaved ? "" : "blue-glow");

    const styleDraggable = useMemo(() => ({
        position: "absolute",
        top: "0px",
        left: "0px",
        cursor: "pointer",
        //transform: "translate(0px, 0px)",// is this needed?
        zIndex: 999,
        display: pageNumber === existingFields.find(field => field.id === id)?.pageNumber ? "block" : "none"
    }), [pageNumber, existingFields, id])

    function onStop() {
        const pageElement = pageRef.current;
        const parentElement = pageElement
        const childElement = DraggableRef.current//document.getElementById(0).children[1];

        if (parentElement && childElement) {
            const parentRect = parentElement.getBoundingClientRect();
            const childRect = childElement.getBoundingClientRect();

            const clientXRelativeToParent = childRect.left - parentRect.left;
            const clientYRelativeToParent = childRect.top - parentRect.top;
            // Find the index of the element in existingFields based on its id
            const index = existingFields.findIndex(field => field.id === id); // Use id as a string

            if (index !== -1) {
                const updatedFields = [...existingFields];
                updatedFields[index] = {
                    ...updatedFields[index],
                    x: clientXRelativeToParent,
                    y: clientYRelativeToParent,
                };

                setExistingFields(updatedFields);
            }
        }
    }

    function calcBounds() {
        const pageElement = pageRef.current;
        const maxRight = pageElement?.clientWidth - actualField?.width - 3;
        const maxBottom = pageElement?.clientHeight - actualField?.height - 3;
        return { left: 0, top: 0, right: maxRight, bottom: maxBottom };
    }
    const bounds = calcBounds();
    
    const deleteStyle = {
        position: "absolute",
        top: `${-20}px`,
        left: `${actualField.width + 5}px`,
        zIndex: 99999,
        cursor: "pointer",
    };
    
    return (
        <>
            <Draggable
                bounds={bounds}
                onMouseDown={(e) => handleFirstMouseDown(e)}
                nodeRef={DraggableRef}
                onStop={onStop}

                defaultPosition={{
                    x: existingFields.find(field => field.id === id)?.x,
                    y: existingFields.find(field => field.id === id)?.y
                }}
            >
                <div
                    ref={DraggableRef}
                    style={styleDraggable}
                    className={ClassNameDraggable}
                >
                    {actualField.component && <actualField.component />}
                    <div ref={deleteElementRef} style={deleteStyle}>X</div>;
                </div>
            </Draggable>
        </>
    );
}

export default FieldItem;
