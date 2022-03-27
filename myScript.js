const calcPage = document.getElementById('mainpage');
const numButtons = document.querySelectorAll('.number');
const opButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deciButton = document.getElementById('decimal');
const delButton = document.getElementById('delete');
const outerDisplay = document.getElementById('outerDisplay');
const innerDisplay = document.getElementById('innerDisplay');
const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const opList = ['+', '-', '*', '/'];
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
    else if(operator === '÷'){
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

function opButtonFunc(operatorKey){
    if(!storedValue){
        if(!currValue) return;
        storedValue = currValue;
        currValue = '';
    }
    if(operatorKey === '/'){
        operatorKey = '÷';
    }
    computeCurrNums();
    if(!operateWith){
        outerDisplay.textContent = innerDisplay.textContent + operatorKey;
        if(currValue){
            storedValue = currValue;
            currValue = '';
        }
    }
    else{
        let temp = outerDisplay.textContent.slice(0, -1);
        outerDisplay.textContent = temp + operatorKey;
    }
    innerDisplay.textContent = '0';
    operateWith = operatorKey;
}

function deletePrevNum(){
    if(currValue){
        currValue = currValue.slice(0, -1);
        innerDisplay.textContent = currValue;
    }
    if(!currValue){
        innerDisplay.textContent = '0';
    }
}

function numKeyFunc(numKeyVal){
    currValue += numKeyVal;
    if(parseFloat(currValue) === 0 && !currValue.includes('.')){
        currValue = '';
        return;
    }
    innerDisplay.textContent = currValue;
}

function addDecimal(){
    if(!currValue.includes('.') && (currValue === '' || currValue === '0')){
        currValue = '0.';
        innerDisplay.textContent = currValue;
    }
    else if(!currValue.includes('.')){
        currValue += '.';
        innerDisplay.textContent = currValue;
    }
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        numKeyFunc(button.textContent);
    });
});

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        opButtonFunc(button.textContent);
    });
});

equalButton.addEventListener('click', () => {
    computeCurrNums();
});

clearButton.addEventListener('click', () => {
    clearCalc();
});

deciButton.addEventListener('click', () => {
    addDecimal();
});

delButton.addEventListener('click', () => {
    deletePrevNum();
});

calcPage.addEventListener('keydown', (event) => {
    if(numList.includes(event.key)){
        numKeyFunc(event.key);
    }
    else if(opList.includes(event.key)){
        opButtonFunc(event.key);
    }
    else if(event.key === '.'){
        addDecimal();
    }
    else if(event.key === 'Backspace'){
        deletePrevNum();
    }
    else if(event.key === 'Escape'){
        clearCalc();
    }
    else if(event.key === '=' || event.key === 'Enter'){
        computeCurrNums();
    }
})