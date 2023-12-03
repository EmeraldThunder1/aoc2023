import { readFileSync } from "fs";

const redMax = 12;
const greenMax = 13;
const blueMax = 14;

const games = readFileSync("day2.txt", "utf-8").split("\r\n");

let sum = 0;

for (const game of games) {
    const [name, data] = game.split(": ");
    const id = parseInt(name.split(" ")[1]);

    let maxExceeded = false;

    for (const set of data.split("; ")) {
        for (const type of set.split(", ")) {

            const [value, color] = type.split(" ");

            if (color === "red" && parseInt(value) > redMax) {
                maxExceeded = true;
            } else if (color === "green" && parseInt(value) > greenMax) {
                maxExceeded = true;
            } else if (color === "blue" && parseInt(value) > blueMax) {
                maxExceeded = true;
            }
        }
    }

    if (!maxExceeded) {
        sum += id;
    }
}

console.log(sum); 