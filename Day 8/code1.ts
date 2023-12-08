import assert from "assert";
import { readFileSync } from "fs";

const input = readFileSync("day8.txt", "utf8").split("\r\n").filter(x => x);

interface Instruction {
    id: string;
    left: string;
    right: string;
}

const instructionFormat = input[0].split("");
const instructions = new Map<string, Instruction>();

for (const instruction of input.slice(1)) {
    const match = instruction.matchAll(/[A-Z]{3}/gm);

    if (match) {
        const [id, left, right] = Array.from(match).map(x => x[0]);
        instructions.set(id, { id, left, right });
    }
}

let currentLocation = "AAA";
let currentIndex = 0;

while (currentLocation !== "ZZZ") {
    const instruction = instructions.get(currentLocation)!;
    const next = instructionFormat[currentIndex % instructionFormat.length] === "R" ? instruction.right : instruction.left;

    currentLocation = next;
    currentIndex++;
}

console.log(currentIndex);