// Select the display element
const display = document.getElementById('display');

// Initialize variables to store inputs and the chosen operation
let currentInput = '';
let previousInput = '';
let operation = undefined;

// Add event listeners to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '←') {
            deleteLast();
        } else if (value === '=') {
            calculate();
        } else {
            chooseOperation(value);
        }
    });
});

/**
 * Appends a number or decimal to the current input
 * @param {string} number 
 */
function appendNumber(number) {
    // Prevent multiple decimals
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

/**
 * Sets the chosen operation
 * @param {string} operator 
 */
function chooseOperation(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operation = operator;
    previousInput = currentInput;
    currentInput = '';
}

/**
 * Performs the calculation based on the chosen operation
 */
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            // Handle division by zero
            if (curr === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

/**
 * Clears all inputs and resets the display
 */
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = undefined;
    updateDisplay();
}

/**
 * Deletes the last character from the current input
 */
function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

/**
 * Updates the display with the current input or result
 */
function updateDisplay() {
    display.textContent = currentInput || '0';
}

