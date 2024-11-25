import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }

        this.components = [...other];
    }

    /** @todo Remove any escaping */
    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        let noComponents = this.getNoComponents();

        /** @todo If delimiter char is not the default this will break */
        for (let i:number = 0; i < noComponents; i++) {
            result += this.getComponent(i);
            if (i < (noComponents - 1)) {
                result += delimiter;
            }
        }
        return result;
    }

    /** @todo Needs correct implementation */
    public asDataString(): string {
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
        return this.components.length == 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.splice(this.components.length, 0, c);
    }

    public remove(i: number): void {
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}