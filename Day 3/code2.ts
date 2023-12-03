import { readFileSync } from "fs";

// Split the rows into an array of rows and each row into an array of characters
const rows: string[] = readFileSync("day3.txt", "utf-8").split("\r\n");
const columns: string[][] = rows.map((line) => line.split(""));

const symbolTokens = [];
const numberTokens = [];

interface rectangle {
    p1: { x: number, y: number },
    p2: { x: number, y: number },
    p3: { x: number, y: number },
    p4: { x: number, y: number }
}

interface straightLine {
    x1: number,
    x2: number,
    y: number
}

function rectanglesIntersectWithLine (r1: rectangle, line: straightLine): boolean {
    const { p1, p2, p3, p4 } = r1;
    const { x1, x2, y } = line;

    // Check if the line intersects with any of the sides of the rectangle
    if (x1 >= p1.x && x1 <= p2.x && y >= p1.y && y <= p4.y) {
        return true;
    } else if (x2 >= p1.x && x2 <= p2.x && y >= p1.y && y <= p4.y) {
        return true;
    } else if (x1 >= p1.x && x1 <= p2.x && y >= p1.y && y <= p4.y) {
        return true;
    } else if (x2 >= p1.x && x2 <= p2.x && y >= p1.y && y <= p4.y) {
        return true;
    }

    return false;
}

for (let y = 0; y < columns.length; y++) {
    let x = 0;
    while (x < columns[y].length) {
        if (columns[y][x] === ".") {
            x++
        } else if (columns[y][x].match(/\d/)) {
            const start: number = x;
            let number: string = "";

            while (columns[y][x].match(/\d/)) {
                number += columns[y][x];
                x++;

                if (x >= columns[y].length) {
                    break;
                }
            }

            numberTokens.push({ number: parseInt(number), y, start, end: x - 1 });
        } else {
            symbolTokens.push({ x, y, symbol: columns[y][x] });
            x++;
        }
    }
}

let ratioSum = 0;

// Loop through the symbol tokens and create a 1px bounding box around each
for (const symbol of symbolTokens) {
    const { x, y } = symbol;

    const p1 = { x: x - 1, y: y - 1 };
    const p2 = { x: x + 1, y: y - 1 };
    const p3 = { x: x + 1, y: y + 1 };
    const p4 = { x: x - 1, y: y + 1 };

    const r1 = { p1, p2, p3, p4 };

    const numbers: number[] = [];
    // Loop through the number tokens and check if they intersect with the symbol token
    for (const number of numberTokens) {
        const { start, end, y} = number;

        const line = { x1: start, x2: end, y };


        if (rectanglesIntersectWithLine(r1, line)) {
            numbers.push(number.number);
        }
    }

    if (symbol.symbol === "*" && numbers.length == 2) {
        ratioSum += numbers[0] * numbers[1];
    }
}

console.log(ratioSum);