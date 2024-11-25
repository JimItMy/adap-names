import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        // @todo IllegalArgumentException.assertCondition(cn.getParentNode() == this, "duplicate parent node");
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        // @todo IllegalArgumentException.assertCondition(this.childNodes.has(cn), "unknown child node");
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodesWithAccumulator(bn: string, result: Set<Node>) {
        super.findNodesWithAccumulator(bn, result);
        this.childNodes.forEach((co: Node) => co.findNodesWithAccumulator(bn, result));
    }

}