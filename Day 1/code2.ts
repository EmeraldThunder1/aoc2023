import { readFileSync } from "fs";

const input = readFileSync('./day1.txt', 'utf8');

const lines = input.split('\r\n');

const digits = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
];

const digits2 = [
    "o1e", "t2o", "t3e", "f4r", "f5e", "s6x", "s7n", "e8t", "n9e"
]

function replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(find, 'g'), replace);
}

let sum = 0;

for (const line of lines) {
    const ints: string[] = [];

    let filtered = line;

    for (let i = 0; i < digits.length; i++) {
        filtered = replaceAll(filtered, digits[i], digits2[i]);
    }

    for (const letter of filtered) {
        if (letter.match(/\d/)) {
            ints.push(letter);
        }
    }

    sum += parseInt(ints[0] + ints[ints.length - 1]);
}

console.log(sum)