// TODO: Multithreading?

import { readFileSync } from "fs";

interface SeedMap {
    id: string;
    ranges: Range[];
}

interface Range {
    destinationStart: number;
    sourceStart: number;
    rangeLength: number;
}

function getMapValue(ranges: Range[], key: number): number {
    let result = key;

    for (const range of ranges) {
        if (key >= range.sourceStart && key < range.sourceStart + range.rangeLength) {
            result = range.destinationStart + (key - range.sourceStart);
            break;
        }
    }

    return result;
}

const file: string = readFileSync("./day5.txt", "utf-8");

const lines = file.split("\r\n").filter(x => x);

const seeds: number[] = lines[0].split(" ").slice(1).map(x => parseInt(x));

const maps: SeedMap[] = [];

let mapId = "";
let ranges: Range[] = [];

for (const line of lines.slice(1)) {
    if (line[0].match(/[a-z]/)) {
        if (mapId) {
            maps.push({ id: mapId, ranges } as SeedMap);
            mapId = "";
        }

        mapId = line.split(" ")[0];
        ranges = [];
    } else {
        const [destinationStart, sourceStart, rangeLength] = line.split(" ").map(x => parseInt(x));
        ranges.push({ destinationStart, sourceStart, rangeLength } as Range);
    }
}

maps.push( {id: mapId, ranges } as SeedMap);

let minResult = Infinity;

for (let i = 0; i < seeds.length; i+=2) {
    for (let j = seeds[i]; j <= seeds[i] + seeds[i + 1]; j++) {
        let result = j;

        for (const map of maps) {
            result = getMapValue(map.ranges, result);
        }

        if (result < minResult) {
            minResult = result;
        }
    }

    console.log(`Done processing seed range`)
}

console.log(minResult);