
import { StringBuffer } from './StringBuffer.js';

export class SourceCode {
  static RO = 0;
  static RW = 1;

  constructor(name = '', content = '', id = null) {
    this.id = id || Date.now().toString();
    this.name = name;
    this.attribute = SourceCode.RW;
    this.code = content;
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
    return this.string2Base64(this.getCode());
  }

  str2Hex(str) {
    // 1. Converte para bytes UTF-8
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
  
    // 2. Converte para string hexadecimal
    return Array.from(bytes)
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');
  }
  
  hex2Str(hex) {
    // 1. Divide o hex em pares de dois dígitos
    const bytes = hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
  
    // 2. Converte para string usando UTF-8
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
  }

  base642String(str) {
    return this.hex2Str(str);
  }

  string2Base64(str) {
    return this.str2Hex(str);
  }

  setCode(code) {
    this.code = this.str2Hex(code);
  }

  toJsonArrayString() {
    const json =   JSON.stringify([
      { name: this.getName() },
      { attribute: this.getAttribute() },
      { code: this.getBase64Code()}
    ]);
    console.log("CODE: ", this.str2Hex(this.getCode()));
    return json;
  }
}
