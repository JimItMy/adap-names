import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delChar?: string) {
        super(delChar);

        this.components = [...other];
    }

    public clone(): Name {
        return new StringArrayName(this.components);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    protected doGetComponent(i: number): string {
        return this.components[i];
    }

    public doSetComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public doInsert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    public doAppend(c: string): void {
        this.components.splice(this.components.length, 0, c);
    }

    public doRemove(i: number): void {
        this.components.splice(i, 1);
    }
    
}