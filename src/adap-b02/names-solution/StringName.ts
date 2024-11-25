import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }

        this.name = other;

        this.noComponents = 0;
        if (other.length > 0) {
            this.noComponents++;
            for (let i: number = 0; i < other.length; i++) {
                let c: string = other[i];
                if (c == ESCAPE_CHARACTER) {
                    i++;
                } else if (c == this.delimiter) {
                    this.noComponents++;
                }
            }
        }
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
        return this.name.length == 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        let count: number = 0;
        let start: number = 0;
        let end: number = 0;

        let isInComponent: boolean = false;
        let hasFinished: boolean = false;

        let length = this.name.length;
        
        for (let i: number = 0; !hasFinished && (i < length); i++) {
            if (!isInComponent && (x == count)) {
                start = i;
                isInComponent = true;
            }

            let c: string = this.name[i];
            if (c == ESCAPE_CHARACTER) {
                i++;
            } else if (c == this.delimiter) {
                count++;
            };

            if (isInComponent && (x != count)) {
                end = i;
                hasFinished = true;
            }
        }

        if (!isInComponent) { // finished without starting = delimiter at end of string
            start = end = length;
        } else if (!hasFinished) { // started but didn't finish = last component in string
            end = length;
        }

        return this.name.substring(start, end);
    }

    public setComponent(n: number, c: string): void {
        let result = "";
        const noComponents: number = this.getNoComponents();
        for (let i: number = 0; i < noComponents; i++) {
            if (i != n) {
                result += this.getComponent(i);
            } else {
                result += c;
            }

            if (i < (noComponents - 1)) {
                result += this.delimiter;
            }
        }
        this.name = result;
    }

    public insert(n: number, c: string): void {
        let result:string = "";
        const noComponents: number = this.getNoComponents();
        let offset:number = 0;
        for (let i: number = 0; i < (noComponents + offset); i++) {
            if (i != n) {
                result += this.getComponent(i - offset);
            } else {
                result += c;
                offset++;
            }

            if (i < (noComponents - 1 + offset)) {
                result += this.delimiter;
            }
        }
        this.name = result;
        this.noComponents++;
    }

    public append(c: string): void {
        this.name += this.delimiter;
        this.name += c;
        this.noComponents++;
    }

    public remove(n: number): void {
        let result:string = "";
        const noComponents: number = this.getNoComponents();
        for (let i: number = 0; i < noComponents; i++) {
            if (i != n) {
                result += this.getComponent(i);

                if (i < (noComponents - 1)) {
                    result += this.delimiter;
                }
            }
        }
        this.name = result;
        this.noComponents--;
    }

    public concat(other: Name): void {
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}