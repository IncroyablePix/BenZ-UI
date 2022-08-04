export enum CipherType {
    XOR = 1,
}

export function cipherTypeFromString(value: string): CipherType {
    switch (value) {
        case "XOR":
            return CipherType.XOR;
        default:
            throw new Error(`Unknown CipherType: ${value}`);
    }
}