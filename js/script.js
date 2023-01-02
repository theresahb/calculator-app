const output = document.querySelector('.screen-input input');
const form = document.querySelector(".form");
const operandBtns = document.querySelectorAll("button[data-type=operand]");
const operatorBtns = document.querySelectorAll("button[data-type=operator]"); 
const clear = document.querySelector("button[data-type=clear]");
const delBtn = document.querySelector("button[data-type=delete]");
const themeValue = document.querySelector('.theme-input input')
const body = document.querySelector('body')
const themeDark = document.querySelector('.dark-theme')
const themeLight = document.querySelector('.light-theme')
const themePurple = document.querySelector('.purple-theme')

form.addEventListener("submit", (e) => {   
    e.preventDefault(); 
}); 

let is_operator = false;
let equation = []; 
const remove_active = () => {   
    operatorBtns.forEach((btn) => {     
        btn.classList.remove("active");   
    }); 
}; 

delBtn.addEventListener('click', () => {
    output.value = output.value.slice(0, -1)
})

operandBtns.forEach((btn) => {   
    btn.addEventListener("click", (e) => {   
        remove_active();     
        if (output.value == "0") {       
            output.value = e.target.value;     
        } 
        // else if (output.value.includes(".")) {       
        //     output.value = '0.' + output.value;     
        // } 
        else if (is_operator) {       
            is_operator = false;       
            output.value = e.target.value;     
        } 
        else {
            output.value = output.value + "" + e.target.value;     
        }   
    }); 
}); 

operatorBtns.forEach((btn) => {   
    btn.addEventListener("click", (e) => {     
        remove_active();     
        e.currentTarget.classList.add("active");      
        switch (e.target.value) {
            case "%":         
            output.value = parseFloat(output.value) / 100;         
            break;       
            case "invert":         
            output.value = parseFloat(output.value) * -1;         
            break;       
            case "=":         
            equation.push(output.value);         
            output.value = eval(equation.join(""));         
            equation = [];         
            break;       
            default:         
            let last_item = equation[equation.length - 1];         
            if (["/", "*", "+", "-"].includes(last_item) && is_operator) {           
                equation.pop();           
                equation.push(e.target.value);         
            } else {           
                equation.push(output.value);           
                equation.push(e.target.value);         
            }         
            is_operator = true;         
            break;     
        }   
    }); 
});


// theme

const setTheme = theme => document.documentElement.className = theme;

document.addEventListener('DOMContentLoaded', () => {
    themeValue.value = '1'
    setTheme('dark-theme', true)
})


themeValue.addEventListener("change", () => {
    if (themeValue.value === "1") setTheme("dark-theme", true);
    else if (themeValue.value === "2") setTheme("light-theme", true);
    else setTheme("purple-theme", true);
});
