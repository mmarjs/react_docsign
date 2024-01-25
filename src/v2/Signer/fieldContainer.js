import React, { useEffect, useState, useRef } from "react";
import "./fieldContainer.css";
import {
  SignatureTEmplate,
  SignatureTEmplateSize,
} from "./templates/signature";
import { FullNameTemplate, FullNameTemplateSize } from "./templates/fullName";

function FieldContainer(props) {
  const [actualField, setactualField] = useState({
    component: undefined,
    width: null,
    height: null,
  });

  const { pageRef, id, pageNumber } = props;
  const { existingFields, setExistingFields } = props;
  const fieldTypeCode = existingFields?.find(
    (field) => field.id === id
  )?.fieldTypeCode;

  function SetActualFieldState() {
    const tempactualField = {
      component: undefined,
      width: null,
      height: null,
    };

    switch (fieldTypeCode) {
      case "TemplateSignature":
        tempactualField.component = SignatureTEmplate;
        tempactualField.width = SignatureTEmplateSize().width;
        tempactualField.height = SignatureTEmplateSize().height;
        break;
      case "TemplateFullName":
        tempactualField.component = FullNameTemplate;
        tempactualField.width = FullNameTemplateSize().width;
        tempactualField.height = FullNameTemplateSize().height;
        break;
      case "TemplateFirstName":
        tempactualField.component = FullNameTemplate;
        tempactualField.width = FullNameTemplateSize().width;
        tempactualField.height = FullNameTemplateSize().height;
        break;
      case "TemplateLastName":
        tempactualField.component = FullNameTemplate;
        tempactualField.width = FullNameTemplateSize().width;
        tempactualField.height = FullNameTemplateSize().height;
        break;
      default:
        break;
    }

    setactualField(tempactualField);
  }

  useEffect(() => {
    onComponentCreated();
    SetActualFieldState();
  }, [pageRef.current]);

  const onComponentCreated = () => {
    if (DraggableRef.current && pageRef.current) {
      pageRef.current.appendChild(DraggableRef.current);
    }
  };

  const [ClassNameDraggable, setClassNameDraggable] = useState(
    existingFields.find((field) => field.id === id)?.prevSaved
      ? ""
      : "blue-glow"
  );

  const DraggableRef = useRef();

  const styleDraggable = {
    position: "absolute",
    left: existingFields.find((field) => field.id === id)?.x + "px",
    top: existingFields.find((field) => field.id === id)?.y + "px",
    width: existingFields.find((field) => field.id === id)?.width + "px",
    height: existingFields.find((field) => field.id === id)?.height + "px",
    zIndex: 999,
    display:
      pageNumber === existingFields.find((field) => field.id === id)?.pageNumber
        ? "block"
        : "none",
  };

  return (
    <>
      <div
        ref={DraggableRef}
        style={styleDraggable}
        className={ClassNameDraggable}
      >
        {actualField.component && (
          <actualField.component
            currentField={existingFields.find((field) => field.id === id)}
            id={id}
          />
        )}
      </div>
    </>
  );
}

export default FieldContainer;
