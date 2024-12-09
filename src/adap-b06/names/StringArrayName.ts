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

    public doSetComponent(i: number, c: string): Name {
        return this.clone().setComponent(i, c);
    }

    public doInsert(i: number, c: string): Name {
        const newItems = [
            ...this.components.slice(0, i),
            c,
            ...this.components.slice(i)
        ];
        return new StringArrayName(newItems);
    }

    public doAppend(c: string): Name {
        const newItems = [
            ...this.components,
            c
        ]
        return new StringArrayName(newItems);
    }

    public doRemove(i: number): Name {
        const newItems = [
            ...this.components.splice(i, 1)
        ]
        return new StringArrayName(newItems);
    }
    
}