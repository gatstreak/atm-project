// Back End

 let activeUser = null;
    
  //---------------//
    // *** users *** //
    //---------------//
  const clients = [
    // user #1 (jenny)
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
    // user #2 (mike)
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
    // user #3 (sara)
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

function setActiveUser(userName) {
    activeUser = clients.find(client => client.userName.toLowerCase() === userName.toLowerCase());
        if (activeUser) {
        console.log("Active user set to:", activeUser.userName);
        document.getElementById("messageLine").textContent = `Welcome, ${activeUser.userName}!`;
    }
    
};
window.setActiveUser = setActiveUser;
// end of back end 

    //-------------------------------//
    // *** pin pad functionality *** //
    //-------------------------------//
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

    //---------------------------------------------------------------------------//
   // *** attach keypad handlers (clear handled here; enter for submission) *** //
  //---------------------------------------------------------------------------//
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
        // simple console.log of current values 
        // >>> will need to take pinInput.value and compare it to user pin on submission <<< //
        console.log("amount:", amountInput.value, "pin:", pinInput.value, enteredPin);
        // messageLine.textContent = "Submitted";s

         if (enteredPin === activeUserPin){
        messageLine.textContent = `Pin Correct! Welcome, ${activeUser.userName}.`;
        console.log("Pin correct ")
      } else {
        messageLine.textContent = "Incorrect!"
        return
      }

       
      }

                    //============================================================================//
                    //>>>>>>>>>>>>>>>>>>>>>>>>>TODO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<// 
                    // Fix pin compare its currently broken it now wont type from pinpad          //
                    // this is likely because we are playing around with pinInput.value           //
                    // we are trying to take it from its value to a string however its not waiting//
                    //============================================================================//

//         const PIN_LENGTH =4;
//         const enteredPin = String(pinInput.value).trim();
//         const activeUserPin = String(activeUser.pin).trim();
//        if (enteredPin.length !== PIN_LENGTH) {
//          messageLine.textContent = `Please enter a ${PIN_LENGTH}-digit PIN`;
//          return;
//   }
     
      insertToTarget(val);
    });
  });
  
  // ***debugger*** //
  document.addEventListener("focusing", () => {
    console.log(
      "focusing -> activeElement:",
      document.activeElement.id || document.activeElement.tagName
    );
  });
   //---------------------------------//
  // ***card picker functionality*** //
 //---------------------------------//
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
  
  // account popup buttons
const accountButtons = document.querySelectorAll("#accountOptions .accountBtn");

accountButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedName = btn.dataset.account; // e.g., "Jenny"
    if (!selectedName) return;

    // find user and set activeUser
    setActiveUser(selectedName);

    // clear PIN input when user changes
    const pinInput = document.getElementById("pinInput");
    if (pinInput) pinInput.value = "";

    // close the popup
    document.getElementById("accountPopup").classList.add("hidden");

    // log for debugging
    console.log("Selected account:", selectedName, "Active user:", activeUser);
  });
});

  
  window.clients = clients; // expose globally for testing
  console.log("clients loaded:", userNames = clients.map(c => c.userName));
  
}); // **********************! end of dom container !********************** //
