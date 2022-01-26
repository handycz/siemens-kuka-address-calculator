export function parseSiemensAddress(rawFormat: string): number {
    const [rawBytes, rawBits] = rawFormat.trim().split(".")
    const bytes = parseInt(rawBytes)
    const bits = parseInt(rawBits)

    if(bytes < 0)
        return NaN

    if(bits < 0 || bits > 7)
        return NaN

    return bytes * 8 + bits
}

export function parseKukaAddressList(rawData: string): Array<number> {
    return rawData.trim().split("\n").map(
        val => parseInt(val)
    )
}

export function parseSiemensAddressList(rawData: string): Array<number> {
    return rawData.trim().split("\n").map(val => parseSiemensAddress(val))
}

export function serializeSiemensAddressList(data: Array<number>): string {
    return data.map(val => {
        const bytes = Math.floor(val / 8)
        const bits = val % 8

        return bytes + "." + bits
    }).join("\n").trim()
}

export function serializeKukaAddressList(data: Array<number>): string {
    return data.join("\n").trim()
}