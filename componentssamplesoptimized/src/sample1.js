import { changeState } from './sample.js'

const [value, setValue] = changeState(0);
console.log(value); // 0
setValue(1);
console.log(value); // 1