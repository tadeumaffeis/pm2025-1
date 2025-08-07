
import { TasksIndex } from './TasksIndex.js';

export class TaskSet {
  constructor() {
    this.tasks = [];
    this.index = new TasksIndex();
  }

  async add(task) {
    if (this.index.search(task.getId()) !== null) {
      throw new Error('Task already exists');
    }
    this.tasks.push(task);
    this.index.add(task.getId(), task);
  }

  getExercise(id) {
    return this.index.search(id);
  }

  getSize() {
    return this.tasks.length;
  }

  toJsonArrayString() {
    const jsonArray = [];
    const jsonTasks = this.tasks.map(task => JSON.parse(task.toJsonArrayString()));
    jsonArray.push({ tasks: jsonTasks });

    let str = JSON.stringify(jsonArray);
    str = str.replace(/\\n/g, '/n');
    str = str.replace(/\\/g, '');
    str = str.replace(/\/n/g, '\\n');
    str = str.replace(/\""/g, '"');
    str = str.replace(/\"\[/g, '[');
    str = str.replace(/\]"/g, ']');
    str = str.replace(/\"\{/g, '{');
    str = str.replace(/\}\"/g, '}');

    return str;
  }

  getAllTasks() {
    return this.tasks.values();
  }

  string2Json() {
    return JSON.parse(this.toJsonArrayString())[0];
  }
}
