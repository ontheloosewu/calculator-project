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
        if(secondNum === 0){
            clearCalc();
            return alert('You cheeky bastard, you broke the calculator! Resetting..');
        }
        return divide(firstNum, secondNum);
    }
}

function computeCurrNums(){
    if(firstValue && !currValue){
        innerDisplay.textContent = firstValue;
        return;
    }
    let result = operate(operateWith, parseFloat(firstValue), parseFloat(currValue));
    firstValue = Math.round(result * 100000000) / 100000000;
    currValue = '';
    operateWith = '';
    innerDisplay.textContent = firstValue;
}

function clearCalc(){
    firstValue = '';
    currValue = '';
    operateWith = '';
    innerDisplay.textContent = '0';
    outerDisplay.textContent = '';
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
        if(!firstValue){
            return;
        }
        if(firstValue && currValue){
            computeCurrNums();
        }
        if(!operateWith){
            outerDisplay.textContent += button.textContent;
        }
        else{
            let temp = outerDisplay.textContent.slice(0, -1);
            outerDisplay.textContent = temp + button.textContent;
        }
        operateWith = button.textContent;
    });
});

equalButton.addEventListener('click', () => {
    computeCurrNums();
});

clearButton.addEventListener('click', () => {
    clearCalc();
});

