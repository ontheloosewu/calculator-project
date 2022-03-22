const numButtons = document.querySelectorAll('.number');
const opButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const outerDisplay = document.getElementById('outerDisplay');
const innerDisplay = document.getElementById('innerDisplay');
let firstValue = '';
let currValue = '';
let operateWith = '';

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, firstNum, secondNum){
    if(operator === '+'){
        return add(firstNum, secondNum);
    }
    else if(operator === '-'){
        return subtract(firstNum, secondNum);
    }
    else if(operator === '*'){
        return multiply(firstNum, secondNum);
    }
    else{
        return divide(firstNum, secondNum);
    }
}

function computeCurrNums(){
    let result = operate(operateWith, parseInt(firstValue), parseInt(currValue));
    firstValue = result;
    currValue = '';
    innerDisplay.textContent = result;
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(operateWith.length !== 0){
            outerDisplay.textContent += button.textContent;
            let temp = button.textContent;
            currValue += temp;
        }
        else{
            outerDisplay.textContent += button.textContent;
            firstValue = outerDisplay.textContent;
        }
    });
});

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(firstValue && currValue){
            computeCurrNums();
        }
        operateWith = button.textContent;
        outerDisplay.textContent += operateWith;
    });
});

equalButton.addEventListener('click', () => {
    computeCurrNums();
});

clearButton.addEventListener('click', () => {
    firstValue = '';
    currValue = '';
    operateWith = '';
    innerDisplay.textContent = '';
    outerDisplay.textContent = '';
});

