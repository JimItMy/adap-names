import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        this.name = other;
        this.delimiter = delimiter || DEFAULT_DELIMITER;
        this.length = other.split(this.delimiter).length;
        
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.replace(this.delimiter, delimiter);
    }

    public asDataString(): string {
        let nameArray = this.name.split(this.delimiter);
        return nameArray.join(ESCAPE_CHARACTER + DEFAULT_DELIMITER);
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.name.split(this.delimiter).length;
    }

    public getComponent(x: number): string {
        let nameArray = this.name.split(this.delimiter);
        if (x < 0 || x >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        return nameArray[x];
    }

    public setComponent(n: number, c: string): void {
        let nameArray = this.name.split(this.delimiter);
        if (n < 0 || n >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        nameArray[n] = c;
        this.name = nameArray.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        let nameArray = this.name.split(this.delimiter);
        if (n < 0 || n >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        nameArray.splice(n, 0, c);
        this.name = nameArray.join(this.delimiter);
    }

    public append(c: string): void {
        if (this.length === 0) {
            this.name = c;
        }
        else {
            this.name = this.name + this.delimiter + c;
        }
        this.length++;
    }

    public remove(n: number): void {
        let nameArray = this.name.split(this.delimiter);
        if (n < 0 || n >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        nameArray.splice(n, 1);
        this.name = nameArray.join(this.delimiter);
    }

    public concat(other: Name): void {
        this.name += other.asString();
        this.length += other.getNoComponents();
    }

}