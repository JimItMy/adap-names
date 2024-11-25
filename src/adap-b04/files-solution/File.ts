import { Exception } from "../common/Exception";
import { InvalidStateException } from "../common/InvalidStateException";
import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        // @todo this.assertIsInFileState(FileState.CLOSED);

        // do something

        // @todo this.assertClassInvariants();

        // @todo this.assertIsInFileState(FileState.OPEN);
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}