const MIN_VALUE: number = 100;
const MAX_VALUE: number = 999;
const ALLOWED_MULTIPLES: number[] = [3, 4, 5, 6, 7, 11];

const getNumberAndMultiples = () => {
	try {
		var number = -1;
		let multiples: number[] = [];
		let notMultiples: number[] = [];
		let choices: number[] = [];

		// Iteration until a suitable number (has multiples but not most of them) is generated
		do {
			multiples = [];
			notMultiples = [];

			number = Math.round(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
			console.log('Número generado: ', number);

			// Select a random valid multiple as answer
			console.log(ALLOWED_MULTIPLES);
			for (const possibleMultiple of ALLOWED_MULTIPLES) {
				if (number % possibleMultiple === 0) {
					multiples.push(possibleMultiple);
				} else {
					notMultiples.push(possibleMultiple);
				}
			}

			console.log('Condiciones: ', multiples.length === 0, notMultiples.length < 2);
			if (multiples.length === 0 || notMultiples.length < 2) {
				console.log('Entra en if');
				number = -1;
			}
		} while (number === -1);

		// We add one multiple and two notMultiples to the choices
		let indexMultiples = Math.round(Math.random() * (multiples.length - 1));
		let randomMultiplesPosition = multiples[indexMultiples];
		console.log("Multiple position: ", indexMultiples)
		choices.push(randomMultiplesPosition);
		while (choices.length < 3) {
			let indexNotMultiples = Math.round(Math.random() * (notMultiples.length - 1));
			let randomNotMultiplesPosition = notMultiples[indexNotMultiples];
			console.log("Not Multiple position: ", indexNotMultiples)
			const randomChoice = randomNotMultiplesPosition;
			console.log(randomChoice)

			if (choices.length === 0 || !choices.includes(randomChoice)) {
				choices.push(randomChoice);
			}
		}

		choices.sort(() => Math.random() - 0.5);
		console.log('Números aleatorios generados: ', number, multiples, notMultiples, choices);
	} catch (error) {
		console.log('Error: ', error);
	}
};

export { getNumberAndMultiples };
