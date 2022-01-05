import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Config/globalContext";
import "./Alert.css"
    
    
const Alert = () => {
    const { dispatch } = useGlobalContext();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), 0);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    const confirmFalse = () => {
        dispatch({ type: "ALERT_FALSE" });
    }

    const confirmTrue = () => {
        dispatch({ type: "ALERT_TRUE" });
    }

    return (
        <>
            <div className="mainAlertBox-container">
                <div className={show ? "mainAlertBox mainAlertBox-after" : "mainAlertBox"}>
                    <div className="alertTitle">
                        <p>Alert Title and some content and confirm</p>
                    </div>
                    <div className="btnContainer">
                        <button className="confirmFalse" onClick={confirmFalse}>Cancel</button>
                        <button className="confirmTrue" onClick={confirmTrue}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert;