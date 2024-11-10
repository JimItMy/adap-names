export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    // @methodtype initialization-method (mutation)
    constructor(other: string[], delimiter?: string) {
        this.delimiter = delimiter || this.DEFAULT_DELIMITER;
        this.components = other.slice();
    }

    // @methodtype conversion-method (query)
    public asNameString(delimiter: string = this.delimiter): string {
        const escapedComponents: string[] = [];

        for (let component of this.components) {

            let escapedComponent = "";

            for (let char of component) {
                if (char == delimiter) {
                    escapedComponent += this.ESCAPE_CHARACTER + char;
                }
                else {
                    escapedComponent += char;
                }
            }

            escapedComponents.push(escapedComponent);
        }
        return escapedComponents.join(delimiter);
    }

    // @methodtype get-method (query)
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        return this.components[i];
    }

    // @methodtype set-method (mutation)
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        this.components[i] = c;
    }

    // @methodtype get-method (query)
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype command-method (mutation)
    public insert(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method (mutation)
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method (mutation)
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Array index out of bounds");
        }
        this.components.splice(i, 1);
    }

}
