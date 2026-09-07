const MIN_VALUE: number = 100;
const MAX_VALUE: number = 999;
const ALLOWED_divisors: number[] = [3, 4, 5, 6, 7, 11];

const getNumberAndDivisors = () => {
	try {
		var number = -1;
		let divisors: number[] = [];
		let notDivisors: number[] = [];
		let choices: number[] = [];

		// Iteration until a suitable number (has divisors but not most of them) is generated
		do {
			divisors = [];
			notDivisors = [];

			number = Math.round(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);

			// Select a random valid multiple as answer
			for (const possibleMultiple of ALLOWED_divisors) {
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

		let indexDivisors = Math.round(Math.random() * (divisors.length - 1));
		let randomdivisorsPosition = divisors[indexDivisors];
		choices.push(randomdivisorsPosition);

		while (choices.length < 3) {
			let indexnotDivisors = Math.round(Math.random() * (notDivisors.length - 1));
			let randomnotDivisorsPosition = notDivisors[indexnotDivisors];
			const randomChoice = randomnotDivisorsPosition;

			if (choices.length === 0 || !choices.includes(randomChoice)) {
				choices.push(randomChoice);
			}
		}

		choices.sort(() => Math.random() - 0.5);
		return { number, choices };
	} catch (error) {
		console.log('Error: ', error);
	}
};

export { getNumberAndDivisors };
