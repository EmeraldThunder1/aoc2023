import { readFileSync } from "fs";

const input = readFileSync('./day1.txt', 'utf8');

const lines = input.split('\r\n');


let sum = 0;

for (const line of lines) {
    const ints: string[] = [];

    for (const letter of line) {
        if (letter.match(/\d/)) {
            ints.push(letter);
        }
    }

    sum += parseInt(ints[0] + ints[ints.length - 1]);
}

console.log(sum)