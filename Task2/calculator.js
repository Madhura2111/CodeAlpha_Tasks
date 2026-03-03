const expressionInput = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let expression = "";


function updateDisplay() {
    expressionInput.value = expression;
    calculateLiveResult();
}


function calculateLiveResult() {
    try {
        if (expression !== "") {
            resultDisplay.textContent = eval(expression);
        } else {
            resultDisplay.textContent = "";
        }
    } catch {
        resultDisplay.textContent = "";
    }
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("number") || button.classList.contains("operator")) {
            expression += value;
        }

        if (button.classList.contains("clear")) {
            expression = "";
        }

        if (button.classList.contains("delete")) {
            expression = expression.slice(0, -1);
        }

        if (button.classList.contains("equal")) {
            try {
                expression = eval(expression).toString();
            } catch {
                expression = "";
            }
        }

        updateDisplay();
    });
});


document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        expression += key;
    }

    if (key === "Enter") {
        try {
            expression = eval(expression).toString();
        } catch {
            expression = "";
        }
    }

    if (key === "Backspace") {
        expression = expression.slice(0, -1);
    }

    if (key === "Escape") {
        expression = "";
    }

    updateDisplay();
});