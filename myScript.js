const numButtons = document.querySelectorAll('.number');
const outerDisplay = document.getElementById('outerDisplay');
const innerDisplay = document.getElementById('innerDisplay');

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