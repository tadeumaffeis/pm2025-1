
export class StringBuffer {
  constructor(str = '') {
    this.buffer = str;
  }
  append(str) {
    this.buffer += str;
    return this;
  }
  toString() {
    return this.buffer;
  }
}
