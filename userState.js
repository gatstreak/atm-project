// export const userState = "userState";
export let activeUser = null;
import { clients } from "./clients.js";
// document,addEventListener("DOMContentLoaded", () => {
    // let activeUser = null;
    export function setActiveUser(userName) {
    activeUser = clients.find(client => client.userName.toLowerCase() === userName.toLowerCase());
        if (activeUser) {
        console.log("Active user set to:", activeUser.userName);
        document.getElementById("messageLine").textContent = `Welcome, ${activeUser.userName}!`;
    }
    
};
window.setActiveUser = setActiveUser;
// return activeUser;
// })

// export function getActiveUser() {
//   return activeUser;
// }