import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

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
export interface Name extends Cloneable, Printable, Equality {

    /**
     * Returns true, if number of components == 0; else false
     */
    isEmpty(): boolean;

    /** 
     * Returns number of components in Name instance
     */
    getNoComponents(): number;

    /**
     * Returns component at index i
     * Expects that index i points to an existing component
     */
    getComponent(i: number): string;

    /** 
     * Sets (replaces) component at index i
     * Expects that index i points to an existing component
     * Expects that component c does not contain delimiter as regular character
     * Expects that component c is properly masked
     */
    setComponent(i: number, c: string): void;

    /** 
     * Inserts component at index i, pushing later components one out
     * Expects that index i points to an existing component
     * Expects that component c does not contain delimiter as regular character
     * Expects that component c is properly masked
     */
    insert(i: number, c: string): void;

    /** 
     * Appends component to Name instance
     * Expects that component c does not contain delimiter as regular character
     * Expects that component c is properly masked
     */
    append(c: string): void;

    /** 
     * Removes component at index i
     * Expects that index i points to an existing component
     */
    remove(i: number): void;
    
    /**
     * Appends (concats) other Name instance to this one
     * @param other Name instance to append
     */
    concat(other: Name): void;
    
}