import { readFileSync } from "fs";

const sequences = readFileSync("day9.txt", "utf8").split("\r\n").map(x => x.split(" ").map(x => parseInt(x)));

function differenceSequence(sequence: number[]): number[] {
    const result = [];

    for (let i = 0; i < sequence.length - 1; i++) {
        result.push(sequence[i + 1] - sequence[i]);
    }

    return result;
}

function predictNextTopLevelValue(structure: number[][]): number {
    let tempStructure = structure;
    tempStructure.reverse();
    tempStructure[0].push(0);

    for (let i = 0; i < tempStructure.length - 1; i++) {
        tempStructure[i + 1].push(tempStructure[i][tempStructure[i].length - 1] + tempStructure[i + 1][tempStructure[i + 1].length - 1]);
    }

    return tempStructure[tempStructure.length - 1][tempStructure[tempStructure.length - 1].length - 1];
}

function predictPreviousTopLevelValue(structure: number[][]): number {
    let tempStructure = structure;

    tempStructure.reverse();
    tempStructure[0] = [0, ...tempStructure[0]];

    for (let i = 0; i < tempStructure.length - 1; i++) {
        tempStructure[i + 1] = [tempStructure[i + 1][0] - tempStructure[i][0], ...tempStructure[i + 1]];
    }

    return tempStructure[tempStructure.length - 1][0];
}

let sum = 0;

for (const sequence of sequences) {
    const structure = [sequence];

    while (true) {
        const difference = differenceSequence(structure[structure.length - 1]);
        structure.push(difference);

        if (difference.filter(x => !x).length === difference.length) {
            break;
        }
    }

    sum += predictPreviousTopLevelValue(structure);
}

console.log(sum);