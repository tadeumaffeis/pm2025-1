
import { StringBuffer } from './StringBuffer.js';

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
    // Em ambiente web, apenas armazena o caminho
    return new StringBuffer(filePath);
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
    if (!this.inputFile) return null;
    return this.inputFile.split(/[\\/]/).pop();
  }

  getOutputFileName() {
    if (!this.outputFile) return null;
    return this.outputFile.split(/[\\/]/).pop();
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
    return new StringBuffer(btoa(str));
  }

  base642String(base64Str) {
    return new StringBuffer(atob(base64Str));
  }

  toJsonArrayString() {
    return JSON.stringify([
      { input: this.getBase64Input().toString() },
      { output: this.getBase64Output().toString() }
    ]);
  }
}
