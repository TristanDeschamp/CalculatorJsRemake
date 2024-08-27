const resultElement = document.getElementById('result');

const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const divideBtn = document.getElementById('divideBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const substractBtn = document.getElementById('substractBtn');
const addBtn = document.getElementById('addBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalBtn = document.getElementById('equalBtn');

const numberBtns = document.querySelectorAll('.number');

// Initialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

// Function to append number
const appendNumber = (number) => {
	if (number === '.' && result.includes('.')) return;
	result += number;
	updateDisplay();
}

// Function to update display
const updateDisplay = () => {
	if (operation) {
		resultElement.innerText = `${previousOperand} ${operation} ${result}`;
	} else {
		resultElement.innerText = result;
	}
}

// Function to select operators
const selectOperator = (operatorValue) => {
	if (result === '') return;

	if (operation !== '' && previousOperand !== '') {
		calculateResult();
	}

	operation = operatorValue;
	previousOperand = result;
	result = '';
	updateDisplay();
}

// Function to calculate result
const calculateResult = () =>  {
	let evalutedResult;
	const prev = parseFloat(previousOperand);
	const current = parseFloat(result);

	if (isNaN(prev) || isNaN(current)) return;

	switch (operation) {
		case '+':
			evalutedResult = prev + current;
			break
		case '-':
			evalutedResult = prev - current;
			break
		case '*':
			evalutedResult = prev * current;
			break
		case '/':
			evalutedResult = prev / current;
			break

		default:
			return;
	}

	result = evalutedResult.toString();
	operation = '';
	previousOperand = '';
}

// Add event listener to numer buttons
numberBtns.forEach(button => {
	button.addEventListener('click', () => {
		appendNumber(button.innerText);
	});
});

// Function to clear the screen
const clearDisplay = () => {
	result = '';
	previousOperand = '';
	operation = '';
	updateDisplay();
}

// Function to delete last digit on dispaly
const deleteLastDigit = () => {
	if (result === '') return;
	result = result.slice(0, -1);
	updateDisplay();
}

decimalBtn.addEventListener('click', () => appendNumber('.'));
addBtn.addEventListener('click', () => selectOperator('+'));
substractBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
equalBtn.addEventListener('click', () => {
	if (result === '') return;
	calculateResult();
	updateDisplay();
});

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);