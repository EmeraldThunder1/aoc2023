import assert from "assert";
import { readFileSync } from "fs";

enum Types {
    Five = 7,
    Four = 6,
    FullHouse = 5,
    Three = 4,
    TwoPairs = 3,
    Pair = 2,
    HighCard = 1
}

const cardStrengths = "AKQT98765432J"

function getTotals(cards: string[]): number[] {
    const totals = new Map<string, number>();

    cards.forEach(card => {
        const total = totals.get(card) || 0;
        totals.set(card, total + 1);
    });

    if (totals.get("J") !== 5) {
        if (totals.has("J")) {
            const totalsWithoutJ = new Map<string, number>(totals);
            totalsWithoutJ.delete("J");
            const greatest = Array.from(totalsWithoutJ.keys()).reduce((a: string, b: string) => { return totalsWithoutJ.get(a)! > totalsWithoutJ.get(b)! ? a : b });
            totals.set(greatest, totals.get(greatest)! + totals.get("J")!);
            totals.delete("J");
        }
    }

    return Array.from(totals.values()).sort((a, b) => b - a);
}

class Hand {
    constructor(public cards: string[]) {}

    get type(): Types {
        const totals = getTotals(this.cards);

        if (totals[0] === 5) {
            return Types.Five;
        } else if (totals[0] === 4) {
            return Types.Four;
        } else if (totals[0] === 3) {
            if (totals[1] === 2) {
                return Types.FullHouse;
            } else {
                return Types.Three;
            }
        } else if (totals[0] === 2 && totals[1] === 2) {
            return Types.TwoPairs;
        } else if (totals[0] === 2) {
            return Types.Pair;
        }
        
        return Types.HighCard;
    }
}

function compareHands(hand1: Hand, hand2: Hand): Hand {
    if (hand1.type > hand2.type) {
        return hand1;
    } else if (hand1.type < hand2.type) {
        return hand2;
    }

    for (let i = 0; i < hand1.cards.length; i++) {
        const card1 = hand1.cards[i];
        const card2 = hand2.cards[i];

        if (cardStrengths.indexOf(card1) < cardStrengths.indexOf(card2)) {
            return hand1;
        } else if (cardStrengths.indexOf(card1) > cardStrengths.indexOf(card2)) {
            return hand2;
        }
    }

    return hand1;
}

function orderHands(hands: Hand[]): Hand[] {
    return hands.sort((a, b) => compareHands(a, b) === a ? 1 : -1);
}

const handWithBid = new Map<Hand, number>();

const input = readFileSync("day7.txt", "utf8").split("\r\n").forEach(line => {
    const [hand, bid] = line.split(" ");
    handWithBid.set(new Hand(hand.split("")), parseInt(bid));
});

const orderedHands = orderHands(Array.from(handWithBid.keys()));
let winnings = 0;

for (let i = 0; i < orderedHands.length; i++) {
    winnings += handWithBid.get(orderedHands[i])! * (i + 1);
}

console.log(winnings)
