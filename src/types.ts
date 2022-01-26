export interface States {
    errorMessage: string
    setErrorMessage: (message: string) => void

    siemensValues: string
    setSiemensValues: (values: string) => void

    siemensOffsetValue: string
    setSiemensOffsetValue: (values: string) => void

    kukaValues: string
    setKukaValues: (values: string) => void
}