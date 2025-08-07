
import fs from 'fs';
import { StringBuffer } from './StringBuffer.js';

export class SourceCode {
  static RO = 0;
  static RW = 1;

  constructor(file = null) {
    this.name = '';
    this.attribute = SourceCode.RW;
    this.code = new StringBuffer();

    if (file) {
      this.name = file;
      this.code = this.readFile(file);
    }
  }

  readFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return new StringBuffer(content);
    } catch (err) {
      console.error(`Error reading file '${filePath}':`, err);
      return new StringBuffer();
    }
  }

  setRO() {
    this.attribute = SourceCode.RO;
  }

  setRW() {
    this.attribute = SourceCode.RW;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getAttributeValue() {
    return this.attribute;
  }

  getAttribute() {
    return this.attribute === SourceCode.RO ? 'readonly' : 'readwrite';
  }

  getCode() {
    return this.code;
  }

  getBase64Code() {
    return this.string2Base64(this.code.toString());
  }

  str2Hex(str) {
    return Buffer.from(str, 'utf-8').toString('hex');
  }

  hex2Str(str) {
    return Buffer.from(str, 'hex').toString('utf-8');
  }

  base642String(str) {
    return new StringBuffer(this.hex2Str(str));
  }

  string2Base64(str) {
    return new StringBuffer(this.str2Hex(str));
  }

  setCode(code) {
    this.code = code;
  }

  toJsonArrayString() {
    return JSON.stringify([
      { name: this.getName() },
      { attribute: this.getAttribute() },
      { code: this.getBase64Code().toString() }
    ]);
  }
}
