const numButtons = document.querySelectorAll('.number');
const opButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deciButton = document.getElementById('decimal');
const delButton = document.getElementById('delete');
const outerDisplay = document.getElementById('outerDisplay');
const innerDisplay = document.getElementById('innerDisplay');
let storedValue = '';
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
    if(!storedValue && !currValue){
        innerDisplay.textContent = '0';
        return;
    }
    else if(!storedValue){
        innerDisplay.textContent = currValue;
        return;
    }
    else if(!currValue){
        innerDisplay.textContent = storedValue;
        return;
    }
    if(parseInt(currValue) === 0 && operateWith === '÷'){
        alert(`Hey now, you KNOW you can't divide by 0! Resetting..`);
        clearCalc();
        return;
    }
    outerDisplay.textContent += innerDisplay.textContent + '=';
    let result = operate(operateWith, parseFloat(storedValue), parseFloat(currValue));
    currValue = (Math.round(result * 100000000) / 100000000).toString();
    storedValue = '';
    operateWith = '';
    innerDisplay.textContent = currValue;
}

function clearCalc(){
    storedValue = '';
    currValue = '';
    operateWith = '';
    innerDisplay.textContent = '0';
    outerDisplay.textContent = '';
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(operateWith){

        }
        currValue += button.textContent;
        innerDisplay.textContent = currValue;
    });
});

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(!storedValue){
            if(!currValue) return;
            storedValue = currValue;
            currValue = '';
        }
        computeCurrNums();
        if(!operateWith){
            outerDisplay.textContent = innerDisplay.textContent + button.textContent;
            if(!currValue){
                innerDisplay.textContent = '0';
            }
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

deciButton.addEventListener('click', () => {
    if(!currValue.includes('.')){
        currValue += '.';
        innerDisplay.textContent = currValue;
    }
});

delButton.addEventListener('click', () => {
    if(currValue){
        currValue = currValue.slice(0, -1);
        innerDisplay.textContent = currValue;
    }
    if(!currValue){
        innerDisplay.textContent = '0';
    }
});

