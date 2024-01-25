import React from 'react';
import SignatureImg from '../../../remoteDataMock/TemplateSignature.png';

const size = { width: 127.957, height: 93.217 }

export function SignatureTEmplate(props) {
    const containerStyle = {
        border: "3px dashed lightblue",
        width: size.width,
        height: size.height,
        textAlign: "center",
    };

    const imgStyle = {
        width: 100,
        pointerEvents: 'none',
    };

    const textStyle = {
        fontSize: "8px",
        color: "gray",
    };

    // Fake data
    const macAddress = "00:1A:2B:3C:4D:5E";
    const ipAddress = "192.168.1.100";
    const localDateTime = "2023-11-01 14:30:00";

    return (
        <div style={containerStyle}>
            <img src={SignatureImg} alt="Signature" style={imgStyle} />
            <div style={textStyle}>
                MAC: {macAddress} <br />
                IP: {ipAddress} <br />
                Localdatetime: {localDateTime}
            </div>
        </div>
    );
}

export function SignatureTEmplateSize() {
    return size
}







function Maina(props) {
    const { ClassNameDraggable, DraggableRef, styleDraggable, size, deleteElementRef } = props
    return <div
        ref={DraggableRef}
        style={styleDraggable}
        className={ClassNameDraggable}
    >
        Drag me!
        <DeleteComp />
    </div>
    function DeleteComp() {
        const deleteStyle = {
            position: "absolute",
            top: `${-20}px`,
            left: `${size.width + 5}px`,
            zIndex: 99999,
            cursor: "pointer",
        };

        return <div ref={deleteElementRef} style={deleteStyle}>X</div>;
    }
}