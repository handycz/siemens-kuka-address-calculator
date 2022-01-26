import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";


export default function StorageArea() {
    const LOCAL_STORAGE_FIELD_NAME = "STORAGE_AREA_CONTENTS"

    const [contents, setContents] = useState(undefined as string | undefined)

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setContents(value)
        localStorage.setItem(LOCAL_STORAGE_FIELD_NAME, value)
    }

    useEffect(() => {
        if(contents === undefined) {
            const data = localStorage.getItem(LOCAL_STORAGE_FIELD_NAME)
            if(data) setContents(data)
            else setContents("")
        }
    }, [contents])

    return (
        <Form.Control className="lay-aside-area"
            as="textarea" rows={10} placeholder="You can lay aside stuff here"
            onChange={onValueChange} value={contents}
        />
    )


}