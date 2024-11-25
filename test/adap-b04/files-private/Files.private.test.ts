import { describe, it, expect } from "vitest";

import { StringName } from "../../../src/adap-b04/names-solution/StringName";
import { StringArrayName } from "../../../src/adap-b04/names-solution/StringArrayName";

import { File } from "../../../src/adap-b04/files-solution/File";
import { Directory } from "../../../src/adap-b04/files-solution/Directory";
import { RootNode } from "../../../src/adap-b04/files-solution/RootNode";

describe("Basic structure test", () => {
  it("test construction", () => {
    let rn: RootNode = RootNode.getRootNode();
    let dir1: Directory = new Directory("usr", rn);
    let dir2: Directory = new Directory("bin", dir1);
    let ed: File = new File("vi", dir2);
    expect(ed.getFullName() == new StringArrayName(["usr", "bin", "vi"], '/'));
    expect(ed.getFullName().isEqual(new StringName("/usr/bin/vi", '/')));
  });
});
