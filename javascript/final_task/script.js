const listOfControlNumber = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
    16: 'H',
    17: 'J',
    18: 'K',
    19: 'L',
    20: 'M',
    21: 'N',
    22: 'P',
    23: 'R',
    24: 'S',
    25: 'T',
    26: 'U',
    27: 'V',
    28: 'W',
    29: 'X',
    30: 'Y',
}

function analyze() {
    txt = document.getElementById("text").value;
    if (txt == null || txt == '') {
        setErr('Please input Personal ID');
    } else {
        removeErr();
        document.getElementById("input").innerHTML = 'input: ' + txt;
        document.getElementById("isValid").innerHTML = 'is valid: ' + checkPersonalID(txt);
        if (checkPersonalID(txt)) {
            document.getElementById("age").innerHTML = 'age: ' + getAge(txt);
            document.getElementById("age_detail").innerHTML = diffDate(txt);
        }
    }
}

function create() {
    txt = document.getElementById('new_text').value;
    if (txt == null || txt == '') {
        document.getElementById("control_number").innerHTML = 'Please input Personal ID';
        document.getElementById("control_number").style.color = '#FF0000';
    } else {
        document.getElementById("control_number").style.color = '#FF0000';
        document.getElementById("new_input").innerHTML = 'input: ' + txt;
        if (txt.length != 10) { // lenght of the init personal ID is 10 characters
            document.getElementById("control_number").innerHTML = 'invalid string';
            document.getElementById("control_number").style.color = '#FF0000';
            return false;
        } else {
            document.getElementById("control_number").innerHTML = '';
            document.getElementById("control_number").style.color = '#000000';
            if (checkDateCenturyIndividual(txt)) {
                document.getElementById("control_number").innerHTML = 'output: ' + calculateControlNumber(txt);
            }
        }
    }
}

function checkPersonalID(txt) {
    if (txt.length != 11) { // lenght of personal ID is 11 characters
        setErr('is valid: false');
        return false;
    } else {
        if (checkDateCenturyIndividual(txt)) {
            var controlNumber = txt.substring(10, 11);
            if (!checkControlNumber(txt, controlNumber)) {
                setErr('is valid: false, control number is not valid');
                return false;
            } else {
                return true
            }
        }
    }
}

function checkDateCenturyIndividual(txt) {
    if (!getCentery(txt)) { // get Centery
        setErr('is valid: false');
        return false;
    } else {
        var day = txt.substring(0, 2);
        var month = txt.substring(2, 4);
        var year = getCentery(txt) + txt.substring(4, 6);

        if (day > 31) { // day is greater than 31 is wrong day
            setErr('is valid: false, day is wrong');
        } else {
            if (!isValidDate(year, month, day)) { // date is not valid
                setErr('is valid: false, day or month is incorrect');
                return false;
            } else { // date is valid
                var individualNumber = txt.substring(7, 10);
                if (!checkIndividualNumber(individualNumber)) { // individualNumber is not valid
                    setErr('is valid: false, individual number is not valid');
                    return false;
                } else { // individualNumber is valid
                    return true;
                }
            }
        }
    }
}

function getCentery(txt) {
    if (txt[6] == '-') {
        return '19';
    } else if (txt[6] == '+') {
        return '18'
    } else if (txt[6] == 'A') {
        return '20'
    } else {
        return false;
    }
}

function isValidDate(year, month, day) {
    var listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 == 0) { // check leap year
        if (month == '02') {
            return day <= listOfDays[1] + 1
        } else {
            return day <= listOfDays[parseInt(month) - 1]
        }
    } else {
        return day <= listOfDays[parseInt(month) - 1]
    }
}

function checkIndividualNumber(text) {
    var re = new RegExp(/^(\b[0-8][0-9][0-9])\b$/);
    return text.match(re);
}


function checkControlNumber(txt, cNum) {
    var totalNum = txt.substring(0, 6) + txt.substring(7, 10);
    var controlNumber = parseInt(totalNum) % 31;

    if (controlNumber < 10) {
        return controlNumber == cNum;
    } else {
        return listOfControlNumber[controlNumber] == cNum;
    }
}

function calculateControlNumber(txt) {
    var totalNum = txt.substring(0, 6) + txt.substring(7, 10);
    var cNum = parseInt(totalNum) % 31;

    if (cNum < 10) {
        return cNum;
    } else {
        return listOfControlNumber[cNum];
    }
}

function getAge(txt) {
    var year = getCentery(txt) + txt.substring(4, 6);
    return new Date().getFullYear() - year;
}

function diffDate(txt) {
    var dayOfBirth = txt.substring(0, 2);
    var monthOfBirth = txt.substring(2, 4);
    var yearOfBirth = getCentery(txt) + txt.substring(4, 6);

    dob = new Date(yearOfBirth, monthOfBirth, dayOfBirth);
    currentDay = new Date();

    var diff = Math.floor(currentDay.getTime() - dob.getTime());
    var aDay = 1000 * 60 * 60 * 24;
    var diffDays = Math.floor(diff / aDay);

    years = Math.floor(diffDays / (365));
    months = Math.floor((diffDays % 365) / 30);
    days = Math.floor((diffDays % 365) % 30);

    var message = '('
    message += years + ' years '
    message += months + ' months '
    message += days + ' days '
    message += ') this is calculated '
    message += formattedDateString(currentDay);

    return message
}

function formattedDateString(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
}


function setErr(txt) {
    document.getElementsByName("err").forEach(element => {
        element.innerHTML = txt;
        element.style.color = '#FF0000';
    });
    document.getElementById("age").innerHTML = '';
    document.getElementById("age_detail").innerHTML = '';
}

function removeErr() {
    document.getElementsByName("err").forEach(element => {
        element.style.color = '#000000';
    });
}