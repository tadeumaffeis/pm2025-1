
import { BTree } from './BTree.js';

export class Index {
  constructor() {
    if (new.target === Index) {
      throw new TypeError("Cannot instantiate abstract class Index directly");
    }
    this.index = new BTree();
  }

  clear() {
    this.index = new BTree();
  }

  getIndex() {
    return this.index;
  }

  // eslint-disable-next-line no-unused-vars
  add(_key, _information) {
    throw new Error("Method 'add' must be implemented by subclass" . _information);
  }

  // eslint-disable-next-line no-unused-vars
  search(_key) {
    throw new Error("Method 'search' must be implemented by subclass");
  }

  // eslint-disable-next-line no-unused-vars
  remove(_key) {
    throw new Error("Method 'remove' must be implemented by subclass");
  }
}
