import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter != undefined) {
            this.delimiter = delimiter; 
        } else {
            delimiter = DEFAULT_DELIMITER;
        }
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        this.assertIsValidDelimiter(delimiter);

        let result: string = "";
        const noComponents: number = this.getNoComponents();
        for (let i: number = 0; i < noComponents; i++) {
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
        return this.asString(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEqual(other: Name): boolean {
        const condition: boolean = other != null && other != undefined;
        IllegalArgumentException.assert(condition, "argument is null or undefined");

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

    public getComponent(i: number): string {
        this.assertIsValidIndex(i);
        
        return this.doGetComponent(i);
    }

    protected abstract doGetComponent(i: number): string;

    public setComponent(i: number, c: string) {
        this.assertIsValidIndex(i);
        this.assertDoesNotContainDelChar(c);
        this.assertIsProperlyMasked(c);

        return this.doSetComponent(i, c);
    }

    protected abstract doSetComponent(i: number, c: string): Name;

    public insert(i: number, c: string): Name {
        this.assertIsValidIndex(i);
        this.assertDoesNotContainDelChar(c);
        this.assertIsProperlyMasked(c);
        
        const newName = this.doInsert(i, c);

        this.assertClassInvariants();

        const condition: boolean = newName.getNoComponents() == this.getNoComponents() + 1;
        MethodFailedException.assert(condition);
        return newName;
    }

    protected abstract doInsert(i: number, c: string): Name;

    public append(c: string): Name {
        this.assertDoesNotContainDelChar(c);
        this.assertIsProperlyMasked(c);
        
        return this.doAppend(c);
    }

    protected abstract doAppend(c: string): Name;

    public remove(i: number): Name {
        this.assertIsValidIndex(i);
        
        return this.doRemove(i);
    }

    protected abstract doRemove(i: number): Name;

    public concat(other: Name): Name {
        const condition: boolean = other != null && other != undefined;
        IllegalArgumentException.assert(condition, "argument is null or undefined");
        
        let newName = this.clone();
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            newName = newName.append(other.getComponent(i));
        }
        return newName;
    }

    protected assertIsValidDelimiter(d: string) {
        let condition: boolean = (d.length == 1);
        IllegalArgumentException.assert(condition, "invalid delimiter character");
    }

    protected assertIsValidIndex(i: number) {
        let condition: boolean = (i >= 0) && (i < this.getNoComponents());
        IllegalArgumentException.assert(condition, "invalid index supplied");
    }

    protected assertDoesNotContainDelChar(c: string) {
        // @todo
    }

    protected assertIsProperlyMasked(c: string) {
        // @todo
    }

    protected assertClassInvariants(): void {
        // @todo
    }

}
