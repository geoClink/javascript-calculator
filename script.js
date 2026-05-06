let num1 = "";
let operator = null;
let num2 = "";
let resultDisplayed = false;

const keyPad = document.querySelectorAll(".key-pad button");
const answerScreen = document.querySelector(".answer-screen");
answerScreen.textContent = "0";

const clearButton = document.querySelector(".clear-button");
let powerTimer;
let isOff = false;

clearButton.addEventListener("mousedown", function() {
    playClick();
powerTimer = setTimeout(function() {
    isOff = !isOff;
    if (isOff) {
        answerScreen.style.backgroundColor = "black";
        answerScreen.textContent = "";
    } else {
        answerScreen.style.backgroundColor = "#c8f5c8";
        answerScreen.textContent = "0";
    }
}, 1000)
});

clearButton.addEventListener("mouseup", function() {
    clearTimeout(powerTimer);
});

for (let i = 0; i < keyPad.length; i++) {
    keyPad[i].addEventListener("click", function () {
        if (isOff) return;
        playClick()
        let buttonValue = keyPad[i].textContent;
        if (buttonValue === "Back") {
            if (operator === null) {
                num1 = num1.slice(0, -1);
            } else {
                num2 = num2.slice(0, -1);
            }
        } else if (buttonValue === "Clear") {
            num1 = "";
            operator = null;
            num2 = "";
            result = null;
        } else if (buttonValue === "=") {
            let result = operate(num1, operator, num2);
            result = parseFloat(result.toFixed(4))
            answerScreen.textContent = result;
            num1 = result;
            operator = null;
            num2 = "";
            resultDisplayed = true;
        } else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
            operator = buttonValue;
        } else if (operator !== null) {
            if (buttonValue === "." && num2.includes(".")) {

            } else {
                num2 = num2 + buttonValue;
            }
        } else if (operator === null) {
            if (buttonValue === "." && num1.includes(".")) {

            } else {
                if (resultDisplayed === true) {
                    num1 = ""
                    resultDisplayed = false;
                }
                num1 = num1 + buttonValue;
            }
        }
        answerScreen.textContent = operator === null ? num1 : num2;
    })
}




function add(num1, num2) {
    let sum = num1 + num2;
    return sum;
}
function subtract(num1, num2) {
    let difference = num1 - num2;
    return difference;
}

function multiply(num1, num2) {
    let product = num1 * num2;
    return product;
}

function divide(num1, num2) {
    if (num2 === 0) return "Cannot divide by zero!";
    let quotient = num1 / num2;
    return quotient;
}

function operate(num1, operator, num2) {

    num1 = Number(num1);
    num2 = Number(num2);

    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    };
}  

function playClick() {
    const audioCtx = new AudioContext();
    const bufferSize = audioCtx.sampleRate * 0.02;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    
    source.start();
}