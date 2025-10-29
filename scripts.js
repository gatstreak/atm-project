
// pin pad functionality
document.addEventListener("DOMContentLoaded", () => {
    const pinInput = document.getElementById("pinInput");
    const amountInput = document.getElementById("amountInput");
    const keypadButtons = document.querySelectorAll(".keyBtn");
    const messageLine = document.getElementById("messageLine");

    // makes sure pin input is focusable even if readonly
    if (pinInput) pinInput.tabIndex = 0;

    // focus behavior
    pinInput.addEventListener('click', () => pinInput.focus());

    // target tracking (start with pin)
    let targetInput = pinInput;

    //allow clicking amount to switch targets 
    amountInput.addEventListener('focus', () => {target = amountInput; });
    amountInput.addEventListener('click', () => amountInput.focus());
    pinInput.addEventListener('focus', () => {target = pinInput; });

    //helper function 
    function insertToTarget(ch) {
        if (!target) target = pinInput;
        if (target === pinInput) {
            // only digits for pin 
            if (!/^\d$/.test(ch)) return;
            if (target.maxLength && target.value.maxLength >= Number(target.maxLength)) return;
            target.value = (target.value || '') + ch;
    }   else {
         // amount: accept digits and single decimal, max two decimal places
         const v = target.value || '';
         if (ch === '.'){
            if (v.includes('.'))return;
            target.value = v === '' ? '0.' : v+'.';
            return;
         }
         if (!/^\d$/.test(ch)) return;
         if (v.includes('.')); {
            const decimals = v.split('.')[1] || '';
            if (decimals.maxLength >= 2) return;
         }
         if (v === '0' && ch !== '.') target.value = ch;
         else target.value = v + ch;
    }
}
function clearTarget() {
    if (!target) target = pinInput;
    target.value ='';
    console.log('clear target called');
}
function handleEnter(){
    //handler validate pin and amount 
    const pin = pinInput.value;
    const amount = amountInput.value;
    if (!pin || pin.length < 4){
        messageLine.textContent = 'please enter a 4+ digit pin';
        pinInput.focus();
        target = pintInput;
        return;
    }
    if (!amount || isNaN(number(amount)) || Number(amount) <= 0){
        messageLine.textContent = 'please enter a valid amount';
        amountInput.focus();
        target = amountInput;
        return;
    }
    amountInput.value = parseFloat(amount).toFixed(2);
    messageLine.textContent = 'Transaction approved';
   setTimeout(() => {
      pinInput.value = '';
      amountInput.value = '';
      messageLine.textContent = 'Welcome! Please enter your PIN.';
      pinInput.focus();
      target = pinInput;
    }, 800);

}

// attach click handlers to keypad buttons


});// end of dom container

//  end pin pad functionality

class account {
    constructor(accountNumber, balance, accountType, cardholderName) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.accountType = accountType;
        this.cardholderName = cardholderName;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
        }
        else {
            this.balance -= amount;

    }
}

    showBalance() {
        document.getElementById("balanceDisplay").innerText = `$${this.accountType,this.accountNumber,this.balance.toFixed(2)}`;
}
}
