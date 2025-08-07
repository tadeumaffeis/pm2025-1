
import { TaskSet } from './TaskSet.js';
import { Task } from './Task.js';
import { TaskInputOutput } from './TaskInputOutput.js';
import { SourceCode } from './SourceCode.js';
import { FileSystem } from './FileSystem.js';
import { AssignmentIndex } from './AssignmentIndex.js';
import { StringBuffer } from './StringBuffer.js';
import fs from 'fs';
import path from 'path';

export class Assignment {
  static ASSIGNMENT_TYPE_JAVA = 'java';
  static ASSIGNMENT_TYPE_CCPLUS = 'ccplus';
  static ASSIGNMENT_TYPE_TEST = 'test';

  constructor(jsonString = null) {
    this.id = '';
    this.initialDate = new Date();
    this.finalDate = new Date();
    this.tasks = new TaskSet();
    this.index = new AssignmentIndex();
    this.concluded = false;
    this.fsDirectory = null;
    this.assignmentType = Assignment.ASSIGNMENT_TYPE_JAVA;

    if (jsonString) this.fromJsonString(jsonString);
  }

  fromJsonString(jsonString) {
    const jsonObject = JSON.parse(jsonString);
    this.id = jsonObject.id;
    this.initialDate = this.#parseDate(jsonObject.initial_date);
    this.finalDate = this.#parseDate(jsonObject.final_date);

    const taskItems = jsonObject.itens[0].tasks;
    for (const taskEntry of taskItems) {
      const task = new Task();
      const jo = taskEntry;

      task.setId(jo[0].id);
      task.setUrl(jo[1].url);
      task.setConcluded(jo[2].concluded === true);

      for (const io of jo[3].inputoutputs) {
        const tio = new TaskInputOutput();
        tio.setInput(tio.base642String(io[0].input));
        tio.setOutput(tio.base642String(io[1].output));
        task.addTaskInputOutput(tio);
      }

      for (const sc of jo[4].sourcecodes) {
        const sourceCode = new SourceCode();
        sourceCode.setName(sc[0].name);
        sc[1].attribute === 'readwrite' ? sourceCode.setRW() : sourceCode.setRO();
        sourceCode.setCode(sourceCode.base642String(sc[2].code));
        task.addCode(sourceCode);
      }

      this.tasks.add(task);
    }
  }

  #parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  getId() {
    return this.id.replace(/"/g, '');
  }

  setId(id) {
    this.id = id;
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTaskSet() {
    return this.tasks;
  }

  getInitialDate() {
    return this.initialDate;
  }

  setInitialDate(date) {
    this.initialDate = date;
  }

  getFinalDate() {
    return this.finalDate;
  }

  setFinalDate(date) {
    this.finalDate = date;
  }

  removeAllTasks() {
    this.tasks = new TaskSet();
  }

  setConcluded(concluded) {
    this.concluded = concluded;
  }

  getConcluded() {
    return this.concluded;
  }

  getFSDirectory() {
    return this.fsDirectory;
  }

  setAssignmentType(type) {
    this.assignmentType = type;
  }

  getAssignmentType() {
    return this.assignmentType;
  }

  toJsonString() {
    const obj = {
      id: this.getId(),
      initial_date: this.initialDate.toLocaleDateString('pt-BR'),
      final_date: this.finalDate.toLocaleDateString('pt-BR'),
      concluded: this.getConcluded(),
      type: this.assignmentType,
      itens: JSON.parse(this.tasks.toJsonArrayString())
    };

    let str = JSON.stringify(obj);
    str = str.replace(/\\n/g, '/n');
    str = str.replace(/\\/g, '');
    str = str.replace(/\/n/g, '\\n');
    str = str.replace(/\""/g, '"');
    str = str.replace(/\"\[/g, '[');
    str = str.replace(/\]"/g, ']');
    return str;
  }

  getFormattedJSON(json, startPos = 0, tabs = 0) {
    let buf = '';
    const indent = (level) => ' '.repeat(level);

    for (let i = startPos; i < json.length; i++) {
      const char = json[i];
      if (char === '[' || char === '{') {
        buf += char + '\n' + indent(tabs + 4);
        tabs += 4;
      } else if (char === ']' || char === '}') {
        tabs -= 4;
        buf += '\n' + indent(tabs) + char;
      } else if (char === ',') {
        buf += char + '\n' + indent(tabs);
      } else {
        buf += char;
      }
    }
    return buf;
  }

  async saveInFileSystem(directoryPath) {
    if (!directoryPath) throw new Error('Path is null or not set');

    if (fs.existsSync(directoryPath)) {
      await FileSystem.delete(directoryPath);
    }

    fs.mkdirSync(directoryPath);
    for (const task of this.tasks.tasks) {
      await this.saveTaskInFileSystem(task, directoryPath);
    }

    this.fsDirectory = directoryPath;
    return directoryPath;
  }

  async saveTaskInFileSystem(task, directory) {
    if (!directory) throw new Error('Directory is null');

    const taskPath = path.join(directory, task.getId());
    if (!fs.existsSync(taskPath)) fs.mkdirSync(taskPath);

    for (const sc of task.code) {
      const codePath = path.join(taskPath, sc.getName());
      fs.writeFileSync(codePath, sc.getCode().toString());
    }

    for (const io of task.ioFile) {
      const inputPath = path.join(taskPath, 'input.txt');
      const outputPath = path.join(taskPath, 'output.txt');
      fs.writeFileSync(inputPath, io.base642String(io.getBase64Input().toString()).toString());
      fs.writeFileSync(outputPath, io.base642String(io.getBase64Output().toString()).toString());
    }

    return taskPath;
  }
}
