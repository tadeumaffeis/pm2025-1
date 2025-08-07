
export class BTreeNode {
  constructor(key = null, information = null) {
    this.salt = "AXBYCW#@!443366";
    this.key = key;
    this.information = information;
    this.leftNode = null;
    this.rightNode = null;
  }

  getKey() {
    return this.key;
  }

  setKey(key) {
    this.key = key;
  }

  getInformation() {
    return this.information;
  }

  setInformation(information) {
    this.information = information;
  }

  getLeftNode() {
    return this.leftNode;
  }

  setLeftNode(node) {
    this.leftNode = node;
  }

  getRightNode() {
    return this.rightNode;
  }

  setRightNode(node) {
    this.rightNode = node;
  }
}
