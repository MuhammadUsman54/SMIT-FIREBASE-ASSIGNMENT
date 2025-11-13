import { auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "./config.js";

window.signIn = (event) => {
    event.preventDefault()
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("user", user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
}
// In login.js - Update getUser function
function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User is signed in:", user);
            
            // Redirect immediately to dashboard
            window.location.href = "./dashboard.html";
        } else {
            console.log("User is signed out");
            // Stay on login page
        }
    });
}



getUser()

export{
    getUser
}