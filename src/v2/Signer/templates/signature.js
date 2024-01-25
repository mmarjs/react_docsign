import React, { useEffect, useState, useRef } from 'react';

const size = { width: 127.957, height: 93.217 }

export function SignatureTEmplate(props) {
    // const { size } = props;
    const [realData, setrealData] = useState("Signature");

    const containerStyle = {
        border: "3px dashed lightblue",
        width: size.width,
        height: size.height,
        textAlign: "center",
    };

    const containerStyleWithRealData = {
        width: size.width,
        height: size.height,
        textAlign: "center",
    };


    const textStyle = {
        fontSize: "8px",
        color: "gray",
    };

    // Fake data
    const macAddress = "00:1A:2B:3C:4D:5E";
    const ipAddress = "192.168.1.100";
    const localDateTime = "2023-11-01 14:30:00";


    useEffect(() => {
        if (props?.currentField["real data"]) {
            setrealData(props?.currentField["real data"]);
        }
    }, [props?.currentField["real data"]]);
    return (
        <div style={props?.currentField["real data"] ? containerStyleWithRealData : containerStyle}>
            {realData != "Signature" ? (
                <div className="saved-signature">
                    <img
                        name={"TemplateSignature"}
                        src={props?.currentField["real data"]}
                        alt="Saved Signature"
                    />
                    <div style={textStyle}>
                        MAC: {macAddress} <br />
                        IP: {ipAddress} <br />
                        Localdatetime: {localDateTime}
                    </div>
                </div>) : (
                <div style={props?.currentField["real data"] ? containerStyleWithRealData : containerStyle}>
                    {
                        realData
                    }
                    <div style={textStyle}>
                        MAC: {macAddress} <br />
                        IP: {ipAddress} <br />
                        Localdatetime: {localDateTime}
                    </div>

                </div>
            )}
        </div>
    );

    /*  return (
          <div style={props?.currentField["real data"] ? containerStyleWithRealData :containerStyle}>
              {
                  realData
              }
              <div style={ textStyle}>
                  MAC: {macAddress} <br />
                  IP: {ipAddress} <br />
                  Localdatetime: {localDateTime}
              </div>
  
          </div>
      );*/
}

export function SignatureTEmplateSize() {
    return size
}
