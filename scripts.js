
// pin pad functionality
const pinInput = document.getElementById("pinInput");
const Keys = document.querySelectorAll("Key");

Keys.forEach(key => {
    key.addEventListener('click', () => {
    
        pinInput.value += key.dataset.num;
        pinInput.focus();
  });
});

pinInput.addEventListener('click', () => pinInput.focus());
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
