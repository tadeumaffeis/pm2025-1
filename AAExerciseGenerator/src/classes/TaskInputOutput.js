
import { StringBuffer } from './StringBuffer.js';
import fs from 'fs';
import path from 'path';

export class TaskInputOutput {
  constructor(input = null, output = null) {
    this.input = input;
    this.output = output;
    this.hasInput = !!input;
    this.hasOutput = !!output;
    this.inputFile = null;
    this.outputFile = null;
  }

  hasInputOutput() {
    return this.hasInput && this.hasOutput;
  }

  readFile(filePath) {
    try {
      return new StringBuffer(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      console.error('Error reading file:', err);
      return new StringBuffer();
    }
  }

  setInputFile(filePath) {
    this.inputFile = filePath;
    this.input = this.readFile(filePath);
  }

  setOutputFile(filePath) {
    this.outputFile = filePath;
    this.output = this.readFile(filePath);
  }

  getInputFileName() {
    return this.inputFile ? path.basename(this.inputFile) : null;
  }

  getOutputFileName() {
    return this.outputFile ? path.basename(this.outputFile) : null;
  }

  reset() {
    this.input = null;
    this.output = null;
    this.hasInput = false;
    this.hasOutput = false;
    this.inputFile = null;
    this.outputFile = null;
  }

  getInput() {
    return this.input;
  }

  getBase64Input() {
    return this.string2Base64(this.input?.toString() || '');
  }

  setInput(input) {
    this.hasInput = true;
    this.input = input;
  }

  getOutput() {
    return this.output;
  }

  getBase64Output() {
    return this.string2Base64(this.output?.toString() || '');
  }

  setOutput(output) {
    this.hasOutput = true;
    this.output = output;
  }

  string2Base64(str) {
    return new StringBuffer(Buffer.from(str, 'utf-8').toString('hex'));
  }

  base642String(hexStr) {
    return new StringBuffer(Buffer.from(hexStr, 'hex').toString('utf-8'));
  }

  toJsonArrayString() {
    return JSON.stringify([
      { input: this.getBase64Input().toString() },
      { output: this.getBase64Output().toString() }
    ]);
  }
}
