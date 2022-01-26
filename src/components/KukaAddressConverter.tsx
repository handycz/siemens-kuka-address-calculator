import React, {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import {LOCAL_STORAGE_KUKA_FIELD_NAME} from "../constants";
import {parseKukaAddressList, parseSiemensAddressList, serializeSiemensAddressList} from "../converterUtils";
import {States} from "../types";

interface KukaAddressConverterProps {
    states: States
}

export default function KukaAddressConverter(props: KukaAddressConverterProps) {
    const {setErrorMessage} = props.states
    const {setSiemensValues} = props.states
    const {kukaValues, setKukaValues} = props.states
    const {siemensOffsetValue} = props.states

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setKukaValues(value)
        localStorage.setItem(LOCAL_STORAGE_KUKA_FIELD_NAME, value)
    }

    useEffect(() => {
        const initialValue = localStorage.getItem(LOCAL_STORAGE_KUKA_FIELD_NAME)

        if (initialValue) {
            setKukaValues(initialValue)
        }
    }, [setKukaValues])

    const convertToSiemens = () => {
        const kukaAddresses = parseKukaAddressList(kukaValues)
        const offset = parseSiemensAddressList(siemensOffsetValue)[0]

        if (isNaN(offset)) {
            setErrorMessage("Offset is not set or has incorrect format")
            return
        }

        const siemensAddresses = kukaAddresses.map(
            address => {
                const kukaAddr = address + offset - 1
                if (kukaAddr < 0) return NaN
                else return kukaAddr
            }
        )

        setSiemensValues(serializeSiemensAddressList(siemensAddresses))
        setErrorMessage("")
    }

    return (
        <>
            <h1 className="labels">
                KUKA
            </h1>
            <Form.Control
                as="textarea"
                rows={10}
                onChange={onChange}
                value={kukaValues}
            />
            <Button className="convert-button"
                    variant="secondary"
                    onClick={convertToSiemens}> &lt;&lt; To
                Siemens
            </Button>
        </>
    )
}