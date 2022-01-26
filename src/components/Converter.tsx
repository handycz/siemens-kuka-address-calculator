import StorageArea from "./StorageArea";
import React, {useState} from "react";
import KukaAddressConverter from "./KukaAddressConverter";
import SiemensAddressConverter from "./SiemensAddressConverter";
import ErrorBanner from "./ErrorBanner";

export default function Converter() {
    const [errorMessage, setErrorMessage] = useState("")
    const [siemensValues, setSiemensValues] = useState("")
    const [kukaValues, setKukaValues] = useState("")
    const [siemensOffset, setSiemensOffset] = useState("")

    const states = {
        errorMessage: errorMessage,
        setErrorMessage: setErrorMessage,

        siemensValues: siemensValues,
        setSiemensValues: setSiemensValues,

        siemensOffsetValue: siemensOffset,
        setSiemensOffsetValue: setSiemensOffset,

        kukaValues: kukaValues,
        setKukaValues: setKukaValues
    }

    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <SiemensAddressConverter states={states}/>
                </div>
                <div className="container">
                    <KukaAddressConverter states={states}/>
                </div>
                <ErrorBanner errorMessage={errorMessage}/>
                <StorageArea/>
            </div>

        </>
    )
}