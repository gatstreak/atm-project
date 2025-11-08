// keypad.js
export const pinPad = "pinPad";
import { activeUser } from "./userState.js";
document.addEventListener("DOMContentLoaded", () => {
     const pinInput = document.getElementById("pinInput");
     const amountInput = document.getElementById("amountInput");
     const keypadButtons = document.querySelectorAll(".keyBtn");
     const messageLine = document.getElementById("messageLine");

  // makes sure pin input is focusable even if read-only
  if (pinInput) pinInput.tabIndex = 0;

  // focus behavior
  pinInput.addEventListener("click", () => pinInput.focus());

  // target tracking (start with pin) as soon as page loads
  let target = pinInput;
  console.log(focus, target);
  target.focus();

  // helper to centralize switching target and logging
  function setTarget(input) {
    if (!input) return;
    if (target !== input) {
      console.log(
        "setTarget -> from",
        target?.id || "none",
        "to",
        input.id,
        "value before:",
        input.value
      );
    }
    target = input;
    target.focus();
    // visual indicator
    pinInput.classList.toggle("active", target === pinInput);
    amountInput.classList.toggle("active", target === amountInput);
  }

  // insertion logic for keypad characters (digits and decimal)
  function insertToTarget(ch) {
    if (!target) target = pinInput;

    if (target === pinInput) {
      // PIN: digits only, respect max_length
      if (!/^\d$/.test(ch)) return;
      if (target.maxLength && target.value.length >= Number(target.maxLength))
        return;
      target.value = (target.value || "") + ch;
      messageLine.textContent = "*".repeat(target.value.length); // visual indicator of pin input (*)
      return;
    }
    // Amount rules: single '.', max 2 decimals
    const v = target.value || "";
    if (ch === ".") {
      if (v.includes(".")) return;
      target.value = v === "" ? "0." : v + ".";
      messageLine.textContent = "amount:" + target.value;
      return;
    }
    if (!/^\d$/.test(ch)) return;
    if (v.includes(".")) {
      const decimals = v.split(".")[1] || "";
      if (decimals.length >= 2) return;
    }
    if (v === "0" && ch !== ".") target.value = ch;
    else target.value = v + ch;
    messageLine.textContent = "amount:" + target.value;
  }

  // clear current target
  function clearTarget() {
    if (!target) target = pinInput;
    target.value = "";
    console.log("clearTarget ->", target.id);
    messageLine.textContent =
      target === pinInput ? "PIN cleared" : "Amount cleared";
  }

  // wire input clicks/focus to change target
  pinInput.addEventListener("click", () => setTarget(pinInput));
  pinInput.addEventListener("focus", () => setTarget(pinInput));
  amountInput.addEventListener("click", () => setTarget(amountInput));
  amountInput.addEventListener("focus", () => setTarget(amountInput));
  //   handlers
  keypadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.value?.toString();
      if (!target) setTarget(pinInput);

      //keep focus on current target
      target.focus();

      if (!val) return;
      if (val === "clear" || val.toLowerCase() === "c") {
        clearTarget();
        return;
      }
      // Submission function
      if (val.toLowerCase() === "enter") {
         const PIN_LENGTH =4;
        const enteredPin = String(pinInput.value).trim();
        const activeUserPin = String(activeUser.pin).trim();
       if (enteredPin.length !== PIN_LENGTH) {
         messageLine.textContent = `Please enter a ${PIN_LENGTH}-digit PIN`;
         return;
    }
        console.log("amount:", amountInput.value, "pin:", pinInput.value, enteredPin);

         if (enteredPin === activeUserPin){
        messageLine.textContent = `Pin Correct! Welcome, ${activeUser.userName}.`;
        console.log("Pin correct ")
      } else {
        messageLine.textContent = "Incorrect!"
        return
      }    
    }
      insertToTarget(val);
    });
});
});

//   debugger
  document.addEventListener("focusing", () => {
    console.log(
      "focusing -> activeElement:",
      document.activeElement.id || document.activeElement.tagName
    );
  });