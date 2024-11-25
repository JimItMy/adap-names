import { Exception } from "../common/Exception";
import { ExceptionType, AssertionDispatcher } from "../common/AssertionDispatcher";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names-solution/Name";
import { StringName } from "../names-solution/StringName";

import { Node } from "./Node";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

    /**
     * Root node instance serves as service boundary
     * @param bn base name
     * @returns result set of nodes found
     */
    public findNodes(bn: string): Set<Node> {
        try {
            return super.findNodes(bn);
        } catch(er) {
            const ex: Exception = er as Exception; // @todo unguarded cast
            throw new ServiceFailureException("node search failed", ex);
        }
    }

    protected assertIsValidBaseName(bn: string, et: ExceptionType): void {
        const condition: boolean = (bn == ""); // Root must have "" as base name
        AssertionDispatcher.dispatch(et, condition, "invalid base name");
    }

}