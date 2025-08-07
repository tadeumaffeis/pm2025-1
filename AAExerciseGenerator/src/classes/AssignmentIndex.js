
import { Index } from './Index.js';
import { BTreeNode } from './BTreeNode.js';

export class AssignmentIndex extends Index {
  constructor() {
    super();
  }

  add(key, information) {
    this.getIndex().add(new BTreeNode(key, information));
  }

  search(key) {
    const node = this.getIndex().search(key);
    return node ? node.getInformation() : null;
  }
}
