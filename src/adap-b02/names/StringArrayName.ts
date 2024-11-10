import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.delimiter = delimiter || DEFAULT_DELIMITER;
        this.components = other.slice();
    }

    public asString(delimiter: string = this.delimiter): string {
        const escapedComponents: string[] = [];

        for (let component of this.components) {

            let escapedComponent = "";

            for (let char of component) {
                if (char == delimiter) {
                    escapedComponent += ESCAPE_CHARACTER + char;
                }
                else {
                    escapedComponent += char;
                }
            }

            escapedComponents.push(escapedComponent);
        }
        return escapedComponents.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}