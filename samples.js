// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const pinInput = document.getElementById("pinInput");
  const amountInput = document.getElementById("amountInput");
  const keypadButtons = document.querySelectorAll(".keyBtn");
  const messageLine = document.getElementById("messageLine");

  // Ensure inputs are focusable even if readonly
  if (pinInput) pinInput.tabIndex = 0;

  // Focus behavior
  pinInput.addEventListener('click', () => pinInput.focus());

  // Simple target tracking: start with PIN
  let target = pinInput;

  // Allow clicking amount to switch target
  amountInput.addEventListener('focus', () => { target = amountInput; });
  amountInput.addEventListener('click', () => amountInput.focus());
  pinInput.addEventListener('focus', () => { target = pinInput; });

  // Helper functions
  function insertToTarget(ch) {
    if (!target) target = pinInput;
    if (target === pinInput) {
      // only digits for PIN
      if (!/^\d$/.test(ch)) return;
      if (target.maxLength && target.value.length >= Number(target.maxLength)) return;
      target.value = (target.value || '') + ch;
    } else {
      // amount: accept digits and single decimal, max two decimal places
      const v = target.value || '';
      if (ch === '.') {
        if (v.includes('.')) return;
        target.value = v === '' ? '0.' : v + '.';
        return;
      }
      if (!/^\d$/.test(ch)) return;
      if (v.includes('.')) {
        const decimals = v.split('.')[1] || '';
        if (decimals.length >= 2) return;
      }
      if (v === '0' && ch !== '.') target.value = ch;
      else target.value = v + ch;
    }
  }

  function clearTarget() {
    if (!target) target = pinInput;
    target.value = '';
  }

  function handleEnter() {
    // example simple handler: validate PIN and amount
    const pin = pinInput.value;
    const amount = amountInput.value;
    if (!pin || pin.length < 4) {
      messageLine.textContent = 'Please enter a 4+ digit PIN';
      pinInput.focus();
      target = pinInput;
      return;
    }
    if (!amount || Number(amount) <= 0) {
      messageLine.textContent = 'Enter a valid amount';
      amountInput.focus();
      target = amountInput;
      return;
    }
    amountInput.value = Number(amount).toFixed(2);
    messageLine.textContent = `Submitted PIN: ${pin} Amount: $${amountInput.value}`;
    setTimeout(() => {
      pinInput.value = '';
      amountInput.value = '';
      messageLine.textContent = 'Welcome! Please enter your PIN.';
      pinInput.focus();
      target = pinInput;
    }, 800);
  }

  // Attach click handlers to keypad buttons
  keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.value; // uses your current HTML value attribute
      if (val === 'clear' || val === 'C') {
        clearTarget();
        return;
      }
      if (val === 'enter' || val.toLowerCase() === 'enter') {
        handleEnter();
        return;
      }
      // digits or '.' go here
      insertToTarget(val);
      pinInput.focus();
    });
  });

  // Optional keyboard support
  window.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (/^\d$/.test(k) || k === '.') {
      insertToTarget(k);
      e.preventDefault();
      return;
    }
    if (k === 'Backspace') {
      if (!target) target = pinInput;
      target.value = (target.value || '').slice(0, -1);
      e.preventDefault();
      return;
    }
    if (k === 'Enter') {
      handleEnter();
      e.preventDefault();
    }
  });
});

// Account class (unchanged structure, fixed showBalance)
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
    } else {
      this.balance -= amount;
    }
  }
  showBalance() {
    // build string properly instead of using commas inside template literal
    document.getElementById("balanceDisplay").innerText = `${this.accountType} ${this.accountNumber} $${this.balance.toFixed(2)}`;
  }
}
