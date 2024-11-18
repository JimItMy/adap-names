import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {
    
    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = other.split(this.delimiter).length;
    }

    getNoComponents(): number {
        return this.name.split(this.delimiter).length;
    }

    getComponent(i: number): string {
        let nameArray = this.name.split(this.delimiter);
        if (i < 0 || i >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        return nameArray[i];
    }
    setComponent(i: number, c: string) {
        let nameArray = this.name.split(this.delimiter);
        if (i < 0 || i >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        nameArray[i] = c;
        this.name = nameArray.join(this.delimiter);
    }

    insert(i: number, c: string) {
        let nameArray = this.name.split(this.delimiter);
        if (i < 0 || i >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        nameArray.splice(i, 0, c);
        this.name = nameArray.join(this.delimiter);
    }
    append(c: string) {
        if (this.length === 0) {
            this.name = c;
        }
        else {
            this.name = this.name + this.delimiter + c;
        }
        this.length++;
    }
    remove(i: number) {
        let nameArray = this.name.split(this.delimiter);
        if (i < 0 || i >= nameArray.length) {
            throw new Error("Array index out of bounds");
        }
        nameArray.splice(i, 1);
        this.name = nameArray.join(this.delimiter);
    }
}