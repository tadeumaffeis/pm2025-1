
import { SourceCodeIndex } from './SourceCodeIndex.js';
import { StringBuffer } from './StringBuffer.js';

export class Task {
  constructor(id = '', url = '') {
    this.id = id;
    this.url = url;
    this.ioFile = [];
    this.code = [];
    this.sourceCodeOpened = [];
    this.index = new SourceCodeIndex();
    this.concluded = false;
  }

  getId() {
    return this.id.replace(/"/g, '');
  }

  setId(id) {
    this.id = id;
  }

  addOpenedSourceCode(name) {
    this.sourceCodeOpened.push(name);
  }

  removeOpenedSourceCode(name) {
    this.sourceCodeOpened = this.sourceCodeOpened.filter(n => n !== name);
  }

  getTasksOpen() {
    return this.sourceCodeOpened.length;
  }

  isOpenedSourceCode(name) {
    return this.sourceCodeOpened.includes(name);
  }

  addCode(sourceCode) {
    if (this.index.search(sourceCode.getName()) !== null) {
      throw new Error('Source code name exists');
    }
    this.code.push(sourceCode);
    this.index.add(sourceCode.getName(), sourceCode);
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  addTaskInputOutput(ioFile) {
    this.ioFile.push(ioFile);
  }

  clearTaskInputOutput() {
    this.ioFile = [];
  }

  clearCode() {
    this.code = [];
    this.index.clear();
  }

  getSourceCode(codeName) {
    return this.index.search(codeName);
  }

  getAllSourceCodes() {
    return this.code.values();
  }

  getAllInputOutputs() {
    return this.ioFile.values();
  }

  setConcluded(value = true) {
    this.concluded = value;
  }

  getConcluded() {
    return this.concluded ? 'true' : 'false';
  }

  toJsonArrayString() {
    const jsonArray = [];
    jsonArray.push({ id: this.getId() });
    jsonArray.push({ url: this.getUrl() });
    jsonArray.push({ concluded: this.getConcluded() });

    const jsonIO = [...this.ioFile].map(io => JSON.parse(io.toJsonArrayString()));
    jsonArray.push({ inputoutputs: jsonIO });

    const jsonCodes = [...this.code].map(sc => JSON.parse(sc.toJsonArrayString()));
    jsonArray.push({ sourcecodes: jsonCodes });

    return JSON.stringify(jsonArray);
  }
}
