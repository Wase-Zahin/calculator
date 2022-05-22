const buttons_container = document.querySelector('.buttons-container');

// create all buttons //
for (let i = 0; i < 19; i++) {
    let button = document.createElement('p');
    if (i == 16) {
        let zero = document.createElement('div');
        zero.classList.add('zero_container');
        buttons_container.appendChild(zero);
        zero.appendChild(button);
        button.classList.add('button');
        button.classList.add('zero');
    }

    else {
        button.classList.add('button');
        buttons_container.appendChild(button);
    };
    switch (i) {
        case 0:
            button.textContent = 'AC';
            break;
        case 1:
            button.textContent = 'X';
            button.style.color = '#E83A14';
            break;
        case 2:
            button.textContent = '+/-';
            break;
        case 3:
            button.textContent = '/';
            break;
        case 4:
            button.textContent = 7;
            button.style.background = '#6A67CE'
            break;
        case 5:
            button.textContent = 8;
            button.style.background = '#6A67CE'
            break;
        case 6:
            button.textContent = 9;
            button.style.background = '#6A67CE'
            break;
        case 7:
            button.textContent = '*';
            break;
        case 8:
            button.textContent = 4;
            button.style.background = '#6A67CE'
            break;
        case 9:
            button.textContent = 5;
            button.style.background = '#6A67CE'
            break;
        case 10:
            button.textContent = 6;
            button.style.background = '#6A67CE'
            break;
        case 11:
            button.textContent = '-';
            break;
        case 12:
            button.textContent = 1;
            button.style.background = '#6A67CE'
            break;
        case 13:
            button.textContent = 2;
            button.style.background = '#6A67CE'
            break;
        case 14:
            button.textContent = 3;
            button.style.background = '#6A67CE'
            break;
        case 15:
            button.textContent = '+';
            break;
        case 16:
            button.textContent = 0;
            button.style.background = '#6A67CE'
            break;
        case 17:
            button.textContent = '.';
            break;
        case 18:
            button.textContent = '=';
            button.style.background = '#00C897';
    }

}

const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');

// variables and array used for the calculations
// when clicked an operator store it in the array variable and later use it in the
// switch case statements with the reduce functions to do the calculations.
let arr = [];
let operator = [];
let numStr = '';
let initialVal = 0; 


// function to display calculator results
function display(e) {
    
    // remove digits when clicked 'X'
    if (numStr != '' && e.target.textContent == 'X') {
        numStr = numStr.slice(0, -1);
        result.textContent = result.textContent.slice(0, -1);
        if (numStr == '') result.textContent = 0;
    }

    // add negative operator to a number.
    if (e.target.textContent == '+/-' && result.textContent[0] != '-') {
        numStr = '-' + numStr;
        result.textContent = '-' + result.textContent;
    };  

    
    // numStr becomes empty when an operator is invoked. So when numStr is empty
    // remove the textcontent of results and display new numbers onclick.
    if (numStr == '') result.textContent = '';
    if (numStr.length < 8 && !isNaN(e.target.textContent) || e.target.textContent == '.' && !result.textContent.includes('.')) result.textContent += e.target.textContent;

    // clear all the variables and array when clicked AC
    if (e.target.textContent == 'AC') {
        result.textContent = 0;
        arr.length = 0;
        operator=[];
        result.textContent = 0;
        numStr = '';
    };
    
    if (result.textContent == '') result.textContent = 0;
    if (numStr == '0' && e.target.textContent == '0') {
        numStr = '';
        result.textContent = '';
    }
    

};

// the actual function that calculate the results
function add(e) {

    // numStr is used for pushing multiple digit numbers into array without
    // breaking into individuals. Also when an operator is clicked empty the 
    // value of numStr and push it to arr
    if (e.target.textContent != 'AC' && e.target.textContent != 'X' && e.target.textContent != '+/-') {
        if (numStr.length < 8 && !isNaN(e.target.textContent) || e.target.textContent == '.' && !numStr.includes('.') ) {
            numStr += e.target.textContent;
        };

        if (isNaN(e.target.textContent) && e.target.textContent != '.') {
            // when '=' operator is clicked
            if (arr.length == 1 && operator.length == 0) {
                operator.push(e.target.textContent);
                numStr = '';
            }
            else { 
                operator.push(e.target.textContent);
                arr.push(Math.round(numStr * 10)/10);
                numStr = '';
            }
        };
    };

    //reduce functions for calculations
    let calcAdd = arr.reduce((prev, curr) => arr[0] + arr[1], initialVal);
    let calcMin = arr.reduce((prev, curr) => arr[0] - arr[1], initialVal);
    let calcProd = arr.reduce((prev, curr) => arr[0] * arr[1], initialVal);
    let calcDiv = arr.reduce((prev, curr) => arr[0] / arr[1], initialVal);

    // when there is 2 elements in array delete the first operator and calculate
    // on that operator. 
    if (arr.length >= 2) {
        switch (operator[0]) {
            case '+' || '=':
                arr = [Math.round(calcAdd * 10) / 10];
                operator.splice(0,1);
                result.textContent = Math.round(calcAdd * 10) / 10;
                break;
            case '-' || '+/-' || '=':
                arr = [Math.round(calcMin * 10) / 10];
                operator.splice(0,1);
                result.textContent = Math.round(calcMin * 10) / 10;
                break;
            case '*' || '=':
                arr = [Math.round(calcProd * 10) / 10];
                operator.splice(0,1);
                result.textContent = Math.round(calcProd * 10) / 10;
                break;
            case '/' || '=':
                arr = [Math.round(calcDiv * 10) / 10];
                operator.splice(0,1);
                result.textContent = Math.round(calcDiv * 10) / 10;
                break;
        }
    }

    // if the operator array contains '=' immediately delete it because the
    // reduce functions can't use it to do calculations and errors will occur.
    if (operator.includes('=')) operator.splice(operator.indexOf('='),1);
    if (arr.includes(NaN)) {
        result.textContent = 0;
        arr.length = 0;
        operator=[];
        result.textContent = 0;
        numStr = '';
    }
    
    // clear all variables and show error message if number length exceeds 9!
    if (arr.length > 0 && arr[0].toString().length > 9) {
        result.textContent = 'Error!'
        arr.length = 0;
        operator=[];
        result.textContent = 0;
        numStr = '';
        
    };
    console.log(numStr);
    console.log(operator);
    console.log(arr);
}

// eventlisteners for buttons
buttons.forEach((buttons) => buttons.addEventListener('click', display));
buttons.forEach((buttons) => buttons.addEventListener('click', add));
