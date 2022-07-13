const DEFAULT = 0;  // Default value for x anf y
const MAXLEN = 12;  // Maximum length a number can be displayed
// Stores numbers corresponding to these operations
const OP = {'backSpc':1, 'negSign':2, 'percent':3, 'decimal':4, 
            'mult':5, 'divi':6, 'sum':7, 'diff':8, 'equ':9};

var x, y;         // Take in 1st and 2nd number to calculate
var operand_2nd;  // If true, new degits typed belong to y
var op_2nd_typed; // Check whether y is typed
var curr_Op;      // Operaton flag corresponding to OP object

/*Display on screen */
var disp = document.querySelector("p");
/* Numbers */
const nums = document.getElementsByClassName("num");
/* Arithmetic operators: * , / , + , - , = */
const mult = document.getElementById("mult");
const divi = document.getElementById("divi");
const sum = document.getElementById("sum");
const diff = document.getElementById("diff");
const equ = document.getElementById("equ");
/* Other operators: +/- , % , . */
const negSign = document.getElementById("negSign");
const percent = document.getElementById("percent");
const decimal = document.getElementById("decimal");
/* Clear and Backspace */
const backSpc = document.getElementById("backSpc");
const AC = document.getElementById("AC");


// ----------------------------------------------------------------------------
window.onload = DefaultState;

// Go through the numpad for any pressed num button
for(var i=0; i<nums.length; i++)
    nums[i].onclick = (e) => OperationUtil(0, e.target.value);

// When any of the operation buttons is pressed
mult.onclick = () => {OperationUtil(OP['mult'])}; // *
divi.onclick = () => {OperationUtil(OP['divi'])}; // /
sum .onclick = () => {OperationUtil(OP['sum'])};  // +
diff.onclick = () => {OperationUtil(OP['diff'])}; // -
equ.onclick = () => {OperationUtil(OP['equ'])};   // =

decimal.onclick = () => {OperationUtil(OP['decimal'])}; // .
percent.onclick = () => {OperationUtil(OP['percent'])}; // %
negSign.onclick = () => {OperationUtil(OP['negSign'])}; // +/-
backSpc.onclick = () => {OperationUtil(OP['backSpc'])}; // bckSpc
AC.onclick = DefaultState;


// ---- OperationUtil ---------------------------------------------------------
// Helper function to determine if the value being worked on is x or y.
// @Param: op - integer as mapped in OP, if an operation button is pressed
//         num - integer of the num button being pressed. default to 0.
// @return: none
// ----------------------------------------------------------------------------
function OperationUtil(op, num = 0) {
    if(!operand_2nd) {  // x
        if(op == 0)        // When digits are typed
            x = getNum(x, num);    
        else if(op < 5)    // Operations from 1-4
            x = NumOperation(x, op);  
        else if(op < 9) {  // Operations from 5-8
            curr_Op = op;
            operand_2nd = true;
        } else             // Operations from 9
            Displayer(x);
    } else {            // y 
        if(op == 0) {      // When digits are typed
            op_2nd_typed = true;  // Flag that y is typed
            y = getNum(y, num);
        } else if(op < 5)  // Operations from 1-4
            y = NumOperation(y, op);
        else if(op < 9) {  // Operations from 5-8
            ArithmeticOperation(curr_Op);
            curr_Op = op;
        } else {           // Operations from 9
            ArithmeticOperation(curr_Op);
            y = x = 0;
        }
    }
}


// ---- getNum ----------------------------------------------------------------
// Function to take a digit and append it to the current number 
// @param: curnum - a string of either float or integer on the screen
//         digit  - an integer value to be appended to curnum
// @return: a string representing the current number
// ----------------------------------------------------------------------------
function getNum(currnum, digit) {
    // Base case, if the currnum is 0, retuns digit
    if(currnum === 0) {
        Displayer(digit);
        return digit;
    }

    let ret = currnum;  // Value to be returned
    // Only append the new digit if the total length < MAXLEN
    if((ret+digit).length < MAXLEN)
        ret = ret + digit;
    // Return ret
    Displayer(ret);
    return ret;
}


// ---- NumOperation ----------------------------------------------------------
// This function takes in current num and any of these operations :
// backSpc, negSign, percent, dec - and changes the number accordingly
// @param: num - a string of curent integer or float
//         op - an integer correspond to values mapped in OP
// @return: a string of updated integer/float
// ----------------------------------------------------------------------------
function NumOperation(num, op) {
    var ret = num;
    // Go through cases 1-4 for operations on 1 number
    switch(op) {
        case OP['backSpc']:
            ret = backSpaceUtil(num);
            break;
        case OP['negSign']:
            ret *= (-1);
            break;
        case OP['percent']:
            ret /= 100;
            break;
        case OP['decimal']:
            if(ret % 1 === 0 || ret === 0) 
                ret += '.';
            break;
        default:
            break;
    }

    // Return the updated number
    Displayer(ret);
    return ret;
}


// ---- backSpaceUtil ---------------------------------------------------------
// This function deletes the last number in the string when invoked.
// @param: num - a string of integer or float. The current number on screen
// @return: a string of float/integer.
// ----------------------------------------------------------------------------
function backSpaceUtil(num) {
    ret = num.toString();
    // Base case, num is 0, or if there is only 1 digit return 0
    if((ret.length == 1 && ret === 0) || ret.length == 1) 
        return 0;

    // Get value from start up to before the last digit
    ret = ret.substr(0, ret.length -1);
    return ret;
}


// ---- ArithmeticOperation ---------------------------------------------------
// This function takes in any of these operations : mult, divi, sum, diff
// and operates on x anf y accordingly
// @param: op - an integer correspond to values mapped in OP
// @return: none
// ----------------------------------------------------------------------------
function ArithmeticOperation(op) {
    // Return if y is not typed yet
    if(!op_2nd_typed) {
        Displayer(x);
        return;
    }
    let num1 = parseFloat(x);   // Get number from string x
    let num2 = parseFloat(y);   // Get number from string y
    // Go through cases 5-8 for operations between 2 numbers
    switch(op) {
        case OP['mult']:
            num1*=num2;
            break;
        case OP['divi']:
            num1/=num2;
            break;
        case OP['sum']:
            num1+=num2;
            break;
        case OP['diff']:
            num1-=num2;
            break;
        default:
            break;
    }

    // Update x to the result, reset y and display
    y = DEFAULT;
    x = num1;
    Displayer(x);
}


// ---- Displayer -------------------------------------------------------------
// This function displays the number on screen. If the number is too long,
// scientic notation will be used.
// @param: num - string of float/integer to be displayed
// @return: none
// ----------------------------------------------------------------------------
function Displayer(num) {
    // If number length > MAXLEN
    if(num.toString().length >= MAXLEN)
        // Round to 6 decimals if the number has long decimal
        if(num >= 0.001 && num < 1000)
            disp.innerHTML = Number(Math.round(num+'e6')+'e-6');
        // Use scientific notation if the number is too small or too big
        else
            disp.innerHTML = num.toExponential(2);
    // Else display the number as normal
    else 
        disp.innerHTML = num;
}

// ---- DefaultState ----------------------------------------------------------
// This function sets a default state for the calculator
// @param: none
// @return: none
// ----------------------------------------------------------------------------
function DefaultState() {
    curr_Op = 0;
    x = y = DEFAULT;
    operand_2nd = op_2nd_typed = false;
    disp.innerHTML = x;
}