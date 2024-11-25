export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

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
