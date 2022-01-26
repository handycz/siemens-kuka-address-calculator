import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import StorageArea from "./StorageArea";
import React, {useEffect, useState} from "react";

function convertSiemensToBits(rawFormat: string): number {
    const [rawBytes, rawBits] = rawFormat.trim().split(".")
    const bytes = parseInt(rawBytes)
    const bits = parseInt(rawBits)

    if(bytes < 0)
        return NaN

    if(bits < 0 || bits > 7)
        return NaN

    return bytes * 8 + bits
}

function parseKuka(rawData: string): Array<number> {
    return rawData.trim().split("\n").map(
        val => parseInt(val)
    )
}

function parseSiemens(rawData: string): Array<number> {
    return rawData.trim().split("\n").map(val => convertSiemensToBits(val))
}

function serializeSiemens(data: Array<number>): string {
    return data.map(val => {
        const bytes = Math.floor(val / 8)
        const bits = val % 8

        return bytes + "." + bits
    }).join("\n").trim()
}

function serializeKuka(data: Array<number>): string {
    return data.join("\n").trim()
}

export default function Converter() {
    const LOCAL_STORAGE_SIEMENS_FIELD_NAME = "SIEMENS_VALUES"
    const LOCAL_STORAGE_SIEMENS_OFFSET_FIELD_NAME = "SIEMENS_OFFSET"
    const LOCAL_STORAGE_KUKA_FIELD_NAME = "KUKA_VALUES"

    const [errorMessage, setErrorMessage] = useState("")
    const [siemensValues, setSiemensValues] = useState("")
    const [kukaValues, setKukaValues] = useState("")
    const [siemensOffset, setSiemensOffset] = useState("")

    const onChangeSiemens = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSiemensValues(value)
        localStorage.setItem(LOCAL_STORAGE_SIEMENS_FIELD_NAME, value)
    }
    const onChangeOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSiemensOffset(value)
        localStorage.setItem(LOCAL_STORAGE_SIEMENS_OFFSET_FIELD_NAME, value)
    }

    const onChangeKuka = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setKukaValues(value)
        localStorage.setItem(LOCAL_STORAGE_KUKA_FIELD_NAME, value)
    }

    useEffect(() => {
        const siemensInitValue = localStorage.getItem(LOCAL_STORAGE_SIEMENS_FIELD_NAME)
        const siemensOffsetInitValue = localStorage.getItem(LOCAL_STORAGE_SIEMENS_OFFSET_FIELD_NAME)
        const kukaInitValue = localStorage.getItem(LOCAL_STORAGE_KUKA_FIELD_NAME)

        if(siemensInitValue) {
            setSiemensValues(siemensInitValue)
        }

        if(kukaInitValue) {
            setKukaValues(kukaInitValue)
        }

        if(siemensOffsetInitValue) {
            setSiemensOffset(siemensOffsetInitValue)
        }
    }, [])

    const convertToKuka = () => {
        const siemensAddresses = parseSiemens(siemensValues)
        const offset = parseSiemens(siemensOffset)[0]

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

        setKukaValues(serializeKuka(kukaAddresses))
        setErrorMessage("")
    }

    const convertToSiemens = () => {
        const kukaAddresses = parseKuka(kukaValues)
        const offset = parseSiemens(siemensOffset)[0]

        if(isNaN(offset)) {
            setErrorMessage("Offset is not set or has incorrect format")
            return
        }

        const siemensAddresses = kukaAddresses.map(
            address => {
                const kukaAddr = address + offset - 1
                if(kukaAddr < 0) return NaN
                else return kukaAddr
            }
        )

        setSiemensValues(serializeSiemens(siemensAddresses))
        setErrorMessage("")
    }

    return (
        <Container>
            <Row className="labels">
                <Col>
                    Siemens
                    <Form.Control
                        type="text" placeholder="Siemens offset"
                        onChange={onChangeOffset}
                        value={siemensOffset}
                    />
                </Col>
                <Col>Kuka</Col>
            </Row>
            <Row className="inputs">
                <Col>
                    <Form.Control
                        as="textarea" rows={10}
                        onChange={onChangeSiemens}
                        value={siemensValues}
                    />
                </Col>
                <Col>
                    <Form.Control
                        as="textarea" rows={10}
                        onChange={onChangeKuka}
                        value={kukaValues}
                    />
                </Col>
            </Row>
            <Row className="buttons">
                <Col>
                    <Button className="convert-button" variant="secondary" onClick={convertToKuka}>To KUKA &gt;&gt;</Button>
                </Col>
                <Col>
                    <Button className="convert-button" variant="secondary" onClick={convertToSiemens}>&lt;&lt; To Siemens</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert variant="danger" className={errorMessage === "" ? "hidden" : "error-message"}>
                        {errorMessage}
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <StorageArea />
                </Col>
            </Row>
        </Container>
    )
}