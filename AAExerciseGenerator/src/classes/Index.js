
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

  add(key, information) {
    throw new Error("Method 'add' must be implemented by subclass");
  }

  search(key) {
    throw new Error("Method 'search' must be implemented by subclass");
  }
}
