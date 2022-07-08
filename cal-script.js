const DEFAULT = 0;

/*Display on screen */
var disp = document.querySelector("p");
disp.innerHTML = `${DEFAULT}`;

/* Clear and Backspace */
const AC = document.getElementById("AC");
const backSpc = document.getElementById("backSpc");

/* Arithmetic operators: + , - , * , / */
const mult = document.getElementById("mult");
const divi = document.getElementById("divi");
const sum = document.getElementById("sum");
const diff = document.getElementById("diff");

/* Other operators: = , +/- , % , . */
const equ = document.getElementById("equ");
const sign = document.getElementById("sign");
const percent = document.getElementById("percent");
const decimal = document.getElementById("decimal");

/* Numbers */
const num = document.getElementsByClassName("num");


