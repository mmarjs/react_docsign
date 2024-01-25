import React, { forwardRef, useEffect, useState, useRef } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import SignaturePad from 'react-signature-pad-wrapper';
import './modal.css';

function SignModal({ setSignature }) {
    const signatureRef = useRef();
    const [show, setShow] = useState(false);
    const [savedSignature, setSavedSignature] = useState(null);

    const clearSign = () => {
        console.log(signatureRef.current);
        signatureRef.current.signaturePad.clear();
    }

    function handleCancel() {
        clearSign();
        setShow(false);
        setSavedSignature(null);
    }

    function handleSave() {
        var img = signatureRef.current.canvasRef.current.toDataURL('image/png');
        setSavedSignature(img);
        //  setSignature(img)
        setShow(false);
    }

    return (
        <div className="signature-container">
            <button className="btn btn-primary account-btn"  onClick={() => setShow(true)}>Signature</button>
            {savedSignature ? (
                <div className="saved-signature">
                    <img 
                        name={"TemplateSignature"}
                        src={savedSignature}
                        alt="Saved Signature"
                    />
                </div>
            ) : null}
            <Rodal visible={show} onClose={() => setShow(false)} width={650} height={480} className="modal-canvas ontop">
                <div className="sign-type-input">
                    <div className="button-sign-type">
                        <div>
                            <button className="btn btn-primary account-btn"  onClick={clearSign}>Clear</button>
                        </div>
                    </div>
                    <div style={{ marginBottom: -5 }}>
                        <SignaturePad
                            ref={signatureRef}
                            width={600}
                            height={200}
                            options={{ minWidth: 1, maxWidth: 1, penColor: '#00008b' }}
                        />
                    </div>
                </div>
                <div className="form-sign-footer">
                    <button className="btn btn-primary account-btn"  onClick={handleSave}>Save</button>
                    <button className="btn btn-primary account-btn"  onClick={handleCancel}>Cancel</button>
                </div>
            </Rodal>
        </div>
    );
}

export default SignModal;
