function analyze() {
    txt = document.getElementById("text").value;
    if (txt == null || txt == '') {
        setErr('Please input a word or phrase');
    } else {
        removeErr();
        numberOfVowel = 0;
        isPalindrome = true;

        // count letter "l"
        var mL = txt.match(/[lL]/gi)
        document.getElementById("result1").innerHTML = '"' + txt + '" contains ' + (mL === null ? 0 : mL.length) + 'xL characters';

        var m = txt.match(/[aeiouåäö]/gi);
        document.getElementById("result2").innerHTML = '"' + txt + '" contains ' + (m === null ? 0 : m.length) + ' vowels';

        var re = /[^A-Za-z0-9]/g;
        var txtLow = txt.toLowerCase().replace(re, '');
        var len = txtLow.length;
        for (var i = 0; i < len / 2; i++) {
            if (txtLow[i] !== txtLow[len - 1 - i]) {
                isPalindrome = false;
            }
        }
        document.getElementById("result3").innerHTML = '"' + txt + '" is ' + (isPalindrome ? '' : 'not ') + ' palindrome.';

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