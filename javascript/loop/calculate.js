function calculate() {
    if (document.getElementById("number").value == null || document.getElementById("number").value == '') {
        setErr('Please input the number at least 1');
    } else {
        number = parseInt(document.getElementById("number").value);
        if (number < 0) {
            setErr('N = Unspecified');
        } else if (number == 0) {
            removeErr();
            document.getElementById("result1").innerHTML = 'N = 1';
            document.getElementById("result2").innerHTML = 'N = 0';
            document.getElementById("result3").innerHTML = 'N = 0';
            document.getElementById("result4").innerHTML = 'N = 0';
        } else {
            removeErr();
            cal(number);
        }
    }
}

function setErr(txt) {
    document.getElementsByName("err").forEach(element => {
        element.innerHTML = txt;
        element.style.color = '#FF0000';
    });
}

function removeErr() {
    document.getElementsByName("err").forEach(element => {
        element.style.color = '#000000';
    });
}

function cal(num) {
    // init variables

    stringFactorial = ''
    stringSum = '';
    stringOddSum = ''
    stringEvenSum = ''
    factorial = 1;
    sum = 0;
    sumOdd = 0;
    sumEven = 0;

    for (let i = 0; i < num; i++) {
        stringFactorial += (i + 1);
        stringSum += (i + 1);

        // check odd and even
        if ((i + 1) % 2 == 0) {
            if ((i + 2) >= num) {
                stringEvenSum += i + 1;
            } else {
                stringEvenSum += i + 1 + ' + ';
            }
            sumEven = sumEven + (i + 1);
        } else {
            if ((i + 2) >= num) {
                stringOddSum += i + 1;
            } else {
                stringOddSum += i + 1 + ' + ';
            }
            sumOdd = sumOdd + (i + 1);
        }
        // if before last number add string + or * after number string
        if (i < (num - 1)) {
            stringFactorial += ' * ';
            stringSum += ' + ';
        }
        factorial = factorial * (i + 1);
        sum = sum + (i + 1);
    }
    // calculate the results
    stringFactorial += ' = <b>' + factorial + '</b>';
    stringSum += ' = <b>' + sum + '</b>';
    stringEvenSum += ' = <b>' + sumEven + '</b>';
    stringOddSum += ' = <b>' + sumOdd + '</b>';

    // set innerHTML for displaying the results
    document.getElementById("result1").innerHTML = 'N = ' + number + '! = ' + stringFactorial;
    document.getElementById("result2").innerHTML = 'N = ' + number + ' : ' + stringSum;
    document.getElementById("result3").innerHTML = 'N = ' + number + ' : ' + stringOddSum;
    document.getElementById("result4").innerHTML = 'N = ' + number + ' : ' + stringEvenSum;
}