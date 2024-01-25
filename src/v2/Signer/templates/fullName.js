import React, { useEffect, useState, useRef } from 'react';

const size = { width: 127.957, height: 15 }

export function FullNameTemplate(props) {
    const [realData, setrealData] = useState("FULLNAME");

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
    const containerStyleWithRealData = {
        //  border: "3px dashed lightblue",
        width: size.width,
        height: size.height,
        textAlign: "center",
    };
    const textStyle = {
        fontSize: "13px",
        color: "gray",
    };
    useEffect(() => {
        if (props?.currentField["real data"]) {
            setrealData(props?.currentField["real data"]);
        }
    }, [props]);

    return (
        <div  style={props?.currentField["real data"] ? containerStyleWithRealData :containerStyle}>
            <div style={textStyle}>
                {realData}
            </div>
        </div>
    );
}

export function FullNameTemplateSize() {
    return size
}






