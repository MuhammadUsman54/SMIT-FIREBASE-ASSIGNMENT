import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./config.js";
import { getUser } from "./login.js"; // ✅ Ensure this exists or remove if not used

// DOM elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");

// ✅ Save user data to Firestore
async function saveDataToDb(firstName, lastName, email, phoneNumber, userId) {
    console.log("Saving user data to Firestore...");
    try {
        await setDoc(doc(db, "users", userId), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            userId: userId,
            friendRequests: [], // initialize arrays
            friends: [],
            createdAt: new Date().toISOString(),
        });
        console.log("✅ User data saved successfully!");
        alert("Account created successfully!");
        window.location.href = "./login.html";
    } catch (error) {
        console.error("❌ Error saving user data:", error);
        alert("Error saving data to Firestore. Check console for details.");
    }
}

// ✅ Signup function
window.signUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created successfully:", user);

            // Save user data
            saveDataToDb(
                firstName.value,
                lastName.value,
                email.value,
                phoneNumber.value,
                user.uid
            );
        })
        .catch((error) => {
            console.error("❌ Signup error:", error.message);
            alert(error.message);
        });
};

// Optionally run getUser if needed
getUser?.();
