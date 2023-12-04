import { readFileSync } from "fs";

const cards: number[][] = [];

function getCardScore (winningNumbers: Set<string>, numbers: Set<string>) {
    return (winningNumbers.size + numbers.size - new Set([...winningNumbers, ...numbers]).size)
}

for (const card of readFileSync("day4.txt", "utf-8").split("\r\n")) {
    const data = card.split(": ")[1].split(" | ")
    const winningNumbers = new Set(data[0].split(" ").filter(x => x));
    const numbers = new Set(data[1].split(" ").filter(x => x));

    cards.push([getCardScore(winningNumbers, numbers), 1]);
}

let sum = 0;

for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < cards[i][1]; j++) {
        for (let k = 0; k < cards[i][0]; k++) {
            if (cards[i + k + 1]) cards[i + k + 1][1]++;
        }
    }
    if (cards[i][0] > 0) sum += Math.pow(2, cards[i][0] - 1);
}

console.log(sum, cards.reduce((a, b) => a + b[1], 0));