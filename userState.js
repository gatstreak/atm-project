export let activeUser = null;
import { clients } from "./clients.js";
    export function setActiveUser(userName) {
    activeUser = clients.find(client => client.userName.toLowerCase() === userName.toLowerCase());
        if (activeUser) {
        console.log("Active user set to:", activeUser.userName);
        document.getElementById("messageLine").textContent = `Welcome, ${activeUser.userName}!`;
    }
    
};