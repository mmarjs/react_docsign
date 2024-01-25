import React, { forwardRef, useEffect, useState, useRef } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import SignaturePad from 'react-signature-pad-wrapper';
import './modal.css';

const SignModal = forwardRef(({ visible }, ref) => {
    const signatureRef = useRef();
    const [show, setShow] = useState(false);
    const clearSign = () => {
        console.log(signatureRef.current);
        signatureRef.current.signaturePad.clear();
    }
    function handleCancel() {
        clearSign()
        setShow(false);
    }

    function handleSave() {
        var img = signatureRef.current.canvasRef.current.toDataURL('image/png');
        console.log(img)
        //  handleSignAll(img);
        setShow(false);
    }


    return (
        <div>
            <button className="btn btn-primary account-btn"  onClick={() => setShow(true)}>Signature</button>
            <React.Fragment>
                {
                    show ? (
                        <Rodal visible={true} onClose={() => setShow(false)} width={650} height={480} className="modal-canvas">
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
                    ) : <React.Fragment></React.Fragment>
                }
            </React.Fragment>

        </div>);
})

export default SignModal;
