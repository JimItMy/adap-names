import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter; // @todo Can delimiter be undefined?
    }

    public abstract clone(): Name;
    
    public asString(delimiter: string = this.delimiter): string {
        let result:string = "";
        const noComponents: number = this.getNoComponents();
        for (let i:number = 0; i < noComponents; i++) {
            result += this.getComponent(i);
            if (i < (noComponents - 1)) {
                result += delimiter;
            }
        }
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        // @todo Components need masking depending on delimiter character
        return this.asString(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEqual(other: Name): boolean {
        return this.asDataString() == other.asDataString();
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i: number = 0; i < s.length; i++) {
            let c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() == 0;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}