// pin pad functionality
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
      messageLine.textContent = "pin:*".repeat(target.value.length); // short status
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

  //attach keypad handlers (clear handled here; ignore enter for now )
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
      // for submission later
      if (val.toLowerCase() === "enter") return;

      insertToTarget(val);
    });
  });
  // ***debugger*** //
  document.addEventListener("focusin", () => {
    console.log(
      "focusin -> activeElement:",
      document.activeElement.id || document.activeElement.tagName
    );
  });

  // ***card picker functionality*** //
  const cardSlot = document.getElementById("cardSlot");
  const closePopupBtn = document.getElementById("closePopup");
  // card slot click to open popup
  cardSlot.addEventListener("click", function () {
    document.getElementById("accountPopup").classList.remove("hidden");
  });
  // card popup close button
  closePopupBtn.addEventListener("click", function () {
    document.getElementById("accountPopup").classList.add("hidden");
  });

  // account type dropdown
  const actionAccountTypeBtn = document.getElementById("actionAccountTypeBtn");

  actionAccountTypeBtn.addEventListener("click", function () {
    document.getElementById("accountMenuDropDown").classList.toggle("hidden");
  });

  // *** users ***
  const clients = [
    {
      userName: "jenny",
      cardNumber: "002-5678-901",
      pin: "0091",
      accounts: [
        { type: "checking", balance: 2500.75, accountNumber: "CHQ-000" },
        { type: "savings", balance: 10500.0, accountNumber: "SVG-001" },
        { type: "credit", balance: -500.0, accountNumber: "CRD-002" },
      ],
    },
    // user #2
    {
      userName: "mike",
      cardNumber: "003-6789-012",
      pin: "1234",
      accounts: [
        { type: "checking", balance: 1500.0, accountNumber: "CHQ-003" },
        { type: "savings", balance: 250.5, accountNumber: "SVG-004" },
        { type: "credit", balance: -1200.0, accountNumber: "CRD-005" },
      ],
    },
    // user #3
    {
      userName: "sara",
      cardNumber: "004-7890-123",
      pin: "5678",
      accounts: [
        { type: "checking", balance: 3200.0, accountNumber: "CHQ-006" },
        { type: "savings", balance: 7800.25, accountNumber: "SVG-007" },
        { type: "credit", balance: -300.0, accountNumber: "CRD-008" },
      ],
    },
  ];
}); // end of dom container
