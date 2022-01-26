import React, {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {
    LOCAL_STORAGE_SIEMENS_FIELD_NAME,
    LOCAL_STORAGE_SIEMENS_OFFSET_FIELD_NAME
} from "../constants";
import {
    parseSiemensAddress,
    parseSiemensAddressList, serializeKukaAddressList,
} from "../converterUtils";
import {States} from "../types";

interface SiemensAddressConverterProps {
    states: States
}

export default function KukaAddressConverter(props: SiemensAddressConverterProps) {
    const {setErrorMessage} = props.states
    const {setKukaValues} = props.states
    const {siemensValues, setSiemensValues} = props.states
    const {siemensOffsetValue, setSiemensOffsetValue} = props.states

    const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSiemensValues(value)
        localStorage.setItem(LOCAL_STORAGE_SIEMENS_FIELD_NAME, value)
    }

    const onChangeOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        // const numericValue = parseInt(value)
        // console.log(value)
        //
        // if(numericValue) {
        //     value = numericValue + ".0"
        // }

        setSiemensOffsetValue(value)
        localStorage.setItem(LOCAL_STORAGE_SIEMENS_FIELD_NAME, value)
    }

    useEffect(() => {
        const initialValueAddress = localStorage.getItem(LOCAL_STORAGE_SIEMENS_FIELD_NAME)
        const initialValueOffset = localStorage.getItem(LOCAL_STORAGE_SIEMENS_OFFSET_FIELD_NAME)

        if (initialValueAddress) setSiemensValues(initialValueAddress)
        if (initialValueOffset) setSiemensOffsetValue(initialValueOffset)

    }, [setSiemensValues, setSiemensOffsetValue])

    const convertToKuka = () => {
        const siemensAddresses = parseSiemensAddressList(siemensValues)
        const offset = parseSiemensAddress(siemensOffsetValue)

        if(isNaN(offset)) {
            setErrorMessage("Offset is not set or has incorrect format")
            return
        }

        const kukaAddresses = siemensAddresses.map(
            address => {
                const kukaAddr = address - offset + 1
                if(kukaAddr < 0) return NaN
                else return kukaAddr
            }
        )

        setKukaValues(serializeKukaAddressList(kukaAddresses))
        setErrorMessage("")
    }

    return (
        <>
            <h1 className="labels">
                Siemens
            </h1>
            <Form.Control
                as="textarea"
                rows={10}
                onChange={onChangeAddress}
                value={siemensValues}
            />
            <Button className="convert-button"
                    variant="secondary"
                    onClick={convertToKuka}> To KUKA &gt;&gt;
            </Button>
            <Form.Control
                type="text" placeholder="Siemens offset"
                onChange={onChangeOffset}
                value={siemensOffsetValue}
            />
        </>
    )
}