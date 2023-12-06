import { readFileSync } from "fs";

const [times, records] = readFileSync("./day6.txt", "utf-8").split("\r\n").map(line => line.split(/\s+/).map(x => parseInt(x)).filter(x => x));

let prod = 1;

for (let i = 0; i < times.length; i++) {
    const t = times[i];
    const r = records[i];

    prod *= Math.ceil(0.5*(t + Math.sqrt(Math.pow(t, 2) - 4 * r)) - 1) - Math.floor(0.5*(t - Math.sqrt(Math.pow(t, 2) - 4 * r)) + 1) + 1;
}

console.log(prod);