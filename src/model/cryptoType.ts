export enum CryptoType {
    BTC = 1,
}

export function cryptoTypeFromString(value: string): CryptoType {
    switch (value) {
        case "BTC":
            return CryptoType.BTC;
        default:
            throw new Error(`Unknown CryptoType: ${value}`);
    }
}