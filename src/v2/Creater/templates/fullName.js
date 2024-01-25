import React from 'react';
import SignatureImg from '../../../remoteDataMock/TemplateSignature.png';

const size = { width: 127.957, height: 15 }

export function FullNameTemplate(props) {
   // const { size } = props;
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
        fontSize: "13px",
        color: "gray",
    };

    // Fake data
    const macAddress = "00:1A:2B:3C:4D:5E";
    const ipAddress = "192.168.1.100";
    const localDateTime = "2023-11-01 14:30:00";

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                John Doe
            </div>
        </div>
    );
}

export function FullNameTemplateSize() {
    return size
}






