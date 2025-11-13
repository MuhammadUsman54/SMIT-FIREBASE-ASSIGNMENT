import { auth, onAuthStateChanged, signOut } from "./config.js";

window.logOut = () => {
    signOut(auth).then(() => {
        console.log("log out ho chuka he")
        window.location.href = "./login.html"
        // Sign-out successful.
    }).catch((error) => {
        console.log(error, "error agaya he ")
        // An error happened.
    });
}
// In dashboard.js - Update getUser function
function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User is signed in:", user);
            
            // Display user info
            displayUserInfo(user);
        } else {
            console.log("User is signed out");
            window.location.href = './login.html';
        }
    });
}

function displayUserInfo(user) {
    const avatar = document.querySelector('.user-avatar');
    const displayName = document.querySelector('.user-display-name');
    const displayEmail = document.querySelector('.user-display-email');
    
    if (displayName) {
        displayName.textContent = user.displayName || user.email.split('@')[0] || 'User';
    }
    
    if (displayEmail) {
        displayEmail.textContent = user.email || 'No email';
    }
    
    // You can also fetch additional user data from Firestore here
}


getUser()


// small scripts for demo behavior
document.getElementById('year').textContent = new Date().getFullYear();
const btn = document.getElementById('mobile-menu-btn');
const mobile = document.getElementById('mobile-sidebar');
const close = document.getElementById('mobile-close');
btn?.addEventListener('click', () => mobile.classList.remove('hidden'));
close?.addEventListener('click', () => mobile.classList.add('hidden'));
mobile?.addEventListener('click', (e) => { if (e.target === mobile) mobile.classList.add('hidden') });