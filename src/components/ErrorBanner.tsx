import {Alert} from "react-bootstrap";
import React from "react";

interface ErrorBannerProps {
    errorMessage: string
}

export default function ErrorBanner(props: ErrorBannerProps) {
    const errorMessage = props.errorMessage
    if (errorMessage === "")
        return <></>

    return (
        <Alert variant="danger" className="message-banner">
            {errorMessage}
        </Alert>
    )

}