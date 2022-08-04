import {CryptoType} from "./cryptoType";
import {CipherType} from "./cipherType";

export default class Ransom {
    private _id: string = "";
    private _name: string | null = null;

    private _encryptKey: string = "";
    private _cipherType: CipherType = CipherType.XOR;

    private _cryptoAddress: string = "";
    private _cryptoAmount: number = 0;
    private _cryptoType: CryptoType = CryptoType.BTC;

    private _extension: string = ".benz";
    private _maxEncrypt: number = 4194304;

    private _message: string = "";
    private _paid: boolean = false;
    private _description: string = "";
    private _active: boolean = false;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string | null {
        return this._name;
    }

    set name(value: string | null) {
        this._name = value;
    }

    get encryptKey(): string {
        return this._encryptKey;
    }

    set encryptKey(value: string) {
        this._encryptKey = value;
    }

    get cipherType(): CipherType {
        return this._cipherType;
    }

    set cipherType(value: CipherType) {
        this._cipherType = value;
    }

    get cryptoAddress(): string {
        return this._cryptoAddress;
    }

    set cryptoAddress(value: string) {
        this._cryptoAddress = value;
    }

    get cryptoAmount(): number {
        return this._cryptoAmount;
    }

    set cryptoAmount(value: number) {
        this._cryptoAmount = value;
    }

    get cryptoType(): CryptoType {
        return this._cryptoType;
    }

    set cryptoType(value: CryptoType) {
        this._cryptoType = value;
    }

    get extension(): string {
        return this._extension;
    }

    set extension(value: string) {
        this._extension = value;
    }

    get maxEncrypt(): number {
        return this._maxEncrypt;
    }

    set maxEncrypt(value: number) {
        this._maxEncrypt = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }


    get paid(): boolean {
        return this._paid;
    }

    set paid(value: boolean) {
        this._paid = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}