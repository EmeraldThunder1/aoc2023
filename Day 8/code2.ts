import { readFileSync } from "fs";

const input = readFileSync("day8.txt", "utf8").split("\r\n").filter(x => x);

interface Instruction {
    id: string;
    left: string;
    right: string;
}

function leastCommonMultiple(a: number, b: number): number {
    return a * b / greatestCommonDivisor(a, b);
}

function leastCommonMultipleOfArray(numbers: number[]): number {
    return numbers.reduce(leastCommonMultiple);
}

function greatestCommonDivisor(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}

const instructionFormat = input[0].split("");
const instructions = new Map<string, Instruction>();

for (const instruction of input.slice(1)) {
    const match = instruction.matchAll(/[0-9A-Z]{3}/gm);

    if (match) {
        const [id, left, right] = Array.from(match).map(x => x[0]);
        instructions.set(id, { id, left, right });
    }
}

const startPostitions = Array.from(instructions.keys()).filter(x => x[x.length-1] === "A");
const endIndices = [];

for (const startPosition of startPostitions) {
    let currentLocation = startPosition;
    let currentIndex = 0;

    while (currentLocation[currentLocation.length - 1] !== "Z") {
        const instruction = instructions.get(currentLocation)!;
        const next = instructionFormat[currentIndex % instructionFormat.length] === "R" ? instruction.right : instruction.left;

        currentLocation = next;
        currentIndex++;
    }

    endIndices.push(currentIndex);
}

console.log(leastCommonMultipleOfArray(endIndices));
