// minimal keypad wiring (put inside DOMContentLoaded)
const pinInput = document.getElementById("pinInput");
const amountInput = document.getElementById("amountInput");
const messageLine = document.getElementById("messageLine");
const keypadButtons = document.querySelectorAll(".keyBtn");

// make readonly inputs focusable
if (pinInput) pinInput.tabIndex = 0;

let target = pinInput; // default target

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
  // optional: visual indicator
  pinInput.classList.toggle("active", target === pinInput);
  amountInput.classList.toggle("active", target === amountInput);
}

// insertion logic for keypad characters (digits and decimal)
function insertToTarget(ch) {
  if (!target) target = pinInput;

  if (target === pinInput) {
    // PIN: digits only, respect maxlength
    if (!/^\d$/.test(ch)) return;
    if (target.maxLength && target.value.length >= Number(target.maxLength))
      return;
    target.value = (target.value || "") + ch;
    messageLine.textContent = `PIN: ${"*".repeat(target.value.length)}`; // short status
    return;
  }

  // Amount rules: single '.', max 2 decimals
  const v = target.value || "";
  if (ch === ".") {
    if (v.includes(".")) return;
    target.value = v === "" ? "0." : v + ".";
    messageLine.textContent = `Amount: ${target.value}`;
    return;
  }
  if (!/^\d$/.test(ch)) return;
  if (v.includes(".")) {
    const decimals = v.split(".")[1] || "";
    if (decimals.length >= 2) return;
  }
  if (v === "0" && ch !== ".") target.value = ch;
  else target.value = v + ch;

  messageLine.textContent = `Amount: ${target.value}`;
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

// attach keypad handlers (Clear handled here; ignore Enter for now)
keypadButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.value?.toString();
    if (!target) setTarget(pinInput);

    // keep focus on current target
    target.focus();

    if (!val) return;
    if (val === "clear" || val.toLowerCase() === "c") {
      clearTarget();
      return;
    }
    // ignore enter here; you'll add submission later
    if (val.toLowerCase() === "enter") return;

    insertToTarget(val);
  });
});

// optional: log every native focus change (useful while debugging)
document.addEventListener("focusin", () => {
  console.log(
    "focusin -> activeElement:",
    document.activeElement.id || document.activeElement.tagName
  );
});
