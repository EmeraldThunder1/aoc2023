import { readFileSync } from "fs";

const games = readFileSync("day2.txt", "utf-8").split("\r\n");

let powerSum = 0;

for (const game of games) {
    const [name, data] = game.split(": ");

    let greatestRed = 0;
    let greatestGreen = 0;
    let greatestBlue = 0;

    for (const set of data.split("; ")) {
        for (const type of set.split(", ")) {

            const [value, color] = type.split(" ");

            if (color === "red" && parseInt(value) > greatestRed) {
                greatestRed = parseInt(value);
            } else if (color === "green" && parseInt(value) > greatestGreen) {
                greatestGreen = parseInt(value);
            } else if (color === "blue" && parseInt(value) > greatestBlue) {
                greatestBlue = parseInt(value);
            }
        }
    }

    powerSum += greatestRed * greatestGreen * greatestBlue;
}

console.log(powerSum);