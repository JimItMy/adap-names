import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);

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

    public clone(): Name {
        return new StringName(this.name);
    }

    public asDataString(): string {
        return this.name;
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

}