function calculator(task) {
    result = 0;
    if (task == 1) {
        num1 = parseInt(document.getElementById("num1").value);
        num2 = parseInt(document.getElementById("num2").value);
        operator = document.getElementById("operator1").value
        if (num1 && num2) {
            document.getElementById("result1").innerHTML = action(operator, num1, num2);
        } else {
            document.getElementById("result1").innerHTML = "Please fill number!"
        }
    }

    if (task == 2) {
        num1 = parseInt(document.getElementById("num3").value);
        num2 = parseInt(document.getElementById("num4").value);
        operators = document.getElementsByName("operator2");
        operator = "";
        for (var i = 0, length = operators.length; i < length; i++) {
            if (operators[i].checked) {
                operator = operators[i].value;
                break;
            }
        }
        if (num1 && num2) {
            document.getElementById("result2").innerHTML = action(operator, num1, num2);
        } else {
            document.getElementById("result2").innerHTML = "Please fill number!"
        }
    }

    if (task == 3) {
        num1 = parseInt(document.getElementById("num5").value);
        num2 = parseInt(document.getElementById("num6").value);
        operator = document.getElementById("operator3").value
        if (num1 && num2) {
            document.getElementById("result3").innerHTML = action(operator, num1, num2);
        } else {
            document.getElementById("result3").innerHTML = "Please fill number!"
        }
    }
}

function action(operator, num1, num2) {
    if (operator == "+") {
        result = num1 + num2;
    }
    if (operator == "-") {
        result = num1 - num2;
    }
    if (operator == "*") {
        result = num1 * num2;
    }
    if (operator == "/") {
        result = num1 / num2;
    }
    return result;
}

function increment(id) {
    var value = parseInt(document.getElementById(id).value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(id).value = value;
}

function decrement(id) {
    var value = parseInt(document.getElementById(id).value);
    value = isNaN(value) ? 0 : value;
    value--;
    document.getElementById(id).value = value;
}