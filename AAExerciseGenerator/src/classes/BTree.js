
import { BTreeNode } from './BTreeNode.js';

export class BTree {
  constructor() {
    this.rootNode = null;
  }

  getRootNode() {
    return this.rootNode;
  }

  addNode(node) {
    this.rootNode = this.#add(this.rootNode, node);
    return this.rootNode;
  }

  add(node) {
    this.rootNode = this.addNode(node);
  }

  search(key) {
    return this.#searchNode(this.rootNode, key);
  }

  #add(root, node) {
    if (!root) return node;

    if (node.getKey().localeCompare(root.getKey()) <= 0) {
      root.setLeftNode(this.#add(root.getLeftNode(), node));
    } else {
      root.setRightNode(this.#add(root.getRightNode(), node));
    }

    return this.#balanceTree(root, node);
  }

  #balanceTree(root, node) {
    if (!root) return null;

    const balanceFactor = this.#height(root.getLeftNode()) - this.#height(root.getRightNode());

    if (balanceFactor > 1) {
      if (node.getKey().localeCompare(root.getLeftNode().getKey()) <= 0) {
        return this.#rotateRight(root);
      } else {
        return this.#rotateLeftRight(root);
      }
    }

    if (balanceFactor < -1) {
      if (node.getKey().localeCompare(root.getRightNode().getKey()) > 0) {
        return this.#rotateLeft(root);
      } else {
        return this.#rotateRightLeft(root);
      }
    }

    return root;
  }

  #height(node) {
    if (!node) return 0;
    return Math.max(this.#height(node.getLeftNode()), this.#height(node.getRightNode())) + 1;
  }

  #rotateLeft(node) {
    const newRoot = node.getRightNode();
    node.setRightNode(newRoot.getLeftNode());
    newRoot.setLeftNode(node);
    return newRoot;
  }

  #rotateRight(node) {
    const newRoot = node.getLeftNode();
    node.setLeftNode(newRoot.getRightNode());
    newRoot.setRightNode(node);
    return newRoot;
  }

  #rotateLeftRight(node) {
    node.setLeftNode(this.#rotateLeft(node.getLeftNode()));
    return this.#rotateRight(node);
  }

  #rotateRightLeft(node) {
    node.setRightNode(this.#rotateRight(node.getRightNode()));
    return this.#rotateLeft(node);
  }

  #searchNode(root, key) {
    if (!root) return null;
    if (key === root.getKey()) return root;
    return key.localeCompare(root.getKey()) < 0
      ? this.#searchNode(root.getLeftNode(), key)
      : this.#searchNode(root.getRightNode(), key);
  }

  show(root = this.rootNode, tabs = '') {
    if (!root) return;
    this.show(root.getLeftNode(), tabs + '    ');
    console.log(tabs + root.getKey());
    this.show(root.getRightNode(), tabs + '    ');
  }
}
