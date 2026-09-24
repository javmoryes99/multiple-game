const MIN_VALUE = 100;
const MAX_VALUE = 999;
const ALLOWED_DIVISORS: number[] = [3, 4, 5, 6, 7, 11];

export class NumberAndDivisors {
    readonly number: number;
    readonly choices: number[];

    constructor(number: number, choices: number[]) {
        this.number = number;
        this.choices = choices;
    }

    isCorrect(choice: number): boolean {
        return this.number % choice === 0;
    }
}

function pickRandom<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    const value = arr[index];
    if (value === undefined) {
        throw new Error('pickRandom: array vacío');
    }
    return value;
}

function generateNumberWithDivisors(): { number: number; divisors: number[]; notDivisors: number[] } {
    let number = -1;
    let divisors: number[] = [];
    let notDivisors: number[] = [];

    do {
        divisors = [];
        notDivisors = [];

        number = Math.round(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);

        for (const possibleMultiple of ALLOWED_DIVISORS) {
            if (number % possibleMultiple === 0) {
                divisors.push(possibleMultiple);
            } else {
                notDivisors.push(possibleMultiple);
            }
        }

        if (divisors.length === 0 || notDivisors.length < 2) {
            number = -1;
        }
    } while (number === -1);

    return { number, divisors, notDivisors };
}

export function getNumberAndDivisors(): NumberAndDivisors {
    const { number, divisors, notDivisors } = generateNumberWithDivisors();

    const choices: number[] = [pickRandom(divisors)];

    while (choices.length < 3) {
        const candidate = pickRandom(notDivisors);
        if (!choices.includes(candidate)) {
            choices.push(candidate);
        }
    }

    choices.sort(() => Math.random() - 0.5);

    return new NumberAndDivisors(number, choices);
}