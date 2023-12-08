import { readFileSync } from "fs";
const [time, record] = readFileSync("./day6.txt", "utf-8").split("\r\n").map(line => parseInt(line.split(/\s+/).map(x => parseInt(x)).filter(x => x).join("")));
console.log(Math.ceil(0.5*(time + Math.sqrt(Math.pow(time, 2) - 4 * record)) - 1) - Math.floor(0.5*(time - Math.sqrt(Math.pow(time, 2) - 4 * record)) + 1) + 1);