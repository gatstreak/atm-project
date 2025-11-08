export const main = "main.js"
import { setActiveUser } from "./userState.js";
import { activeUser } from "./userState.js";
import { clients } from "./clients.js";
import "./pinPad.js"; // if it self-registers listeners
import "./clients.js";
import "./userState.js";

document.addEventListener("DOMContentLoaded", () => {
    //   card picking
  const cardSlot = document.getElementById("cardSlot");
  const closePopupBtn = document.getElementById("closePopup");
  // card slot click to open popup
  cardSlot.addEventListener("click", function () {
    document.getElementById("accountPopup").classList.remove("hidden");
    console.log("clicked");
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
});