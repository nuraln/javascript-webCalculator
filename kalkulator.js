// membuat objek
const calculator = {
    displayNumber : "0",
    operator : null,
    firstNumber : null,
    waitingForSecondNumber : false
}

// Function update angka
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Function hapus data
function clearCalculator() {
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false
}

// Function memasukkan angka
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

// Memfungsikan tombol minus/plus
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return
    }
     calculator.displayNumber = calculator.displayNumber * -1;
 }

// Memfungsikan operator penjumlahan dan pengurangan
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';

    } else {
        alert('Operator sudah ditetapkan')
    }
}

// Membuat fungsi kalkulasi
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null){
        alert ("Anda belum menetapkan operator");
        return
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    // objek yyang akan dikirimkan sebagai argumen fungsi putHistory
    const history = {
        firstNumber : calculator.firstNumber,
        secondNumber : calculator.displayNumber,
        operator : calculator.operator,
        result : result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

// buat variabel button
const buttons = document.querySelectorAll(".button");
    for (let button of buttons) {
        button.addEventListener('click', function(event) {
            // Mendapatkan objek elemen yang di klik
            const target = event.target

            // memberikan fungsi hapus pd tombol CE
            if (target.classList.contains('clear')){
                clearCalculator();
                updateDisplay();
                return
            }

            if (target.classList.contains('negative')){
                inverseNumber();
                updateDisplay();
                return
            }

            if (target.classList.contains('equals')){
                performCalculation();
                updateDisplay();
                return
            }

            if (target.classList.contains('operator')){
                handleOperator(target.innerText);
                return
            }

            inputDigit(target.innerText);
            updateDisplay()
        });

    }