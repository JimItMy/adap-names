import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        let a = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            a.push(this.getComponent(i));
        }
        return a.join(delimiter);
    }

    public toString(): string {
        return this.asString();
    }

    public asDataString(): string {
        return this.asString(ESCAPE_CHARACTER + DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        return (this.getDelimiterCharacter() === other.getDelimiterCharacter()) &&
        (this.asString() === other.asString());
    }

    public getHashCode(): number {
        const prime = 31;
        let hash = 0;

        for (let i = 0; i< this.getNoComponents(); i++) {
            const component = this.getComponent(i);
            for (let j = 0; j < component.length; j++) {
                hash = (hash * prime + component.charCodeAt(j)) || 0
            }
        }

        return hash;
    }

    public clone(): Name {
        return JSON.parse(JSON.stringify(this));
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}