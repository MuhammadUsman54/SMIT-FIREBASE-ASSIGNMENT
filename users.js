import { 
    auth, 
    db, 
    collection, 
    getDocs, 
    doc, 
    updateDoc, 
    arrayUnion, 
    onAuthStateChanged, 
    signOut 
} from "./config.js";

// 🔹 When user is logged in
function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("✅ Logged in user:", user.uid);
            getUsers(user.uid);
        } else {
            console.log("⚠️ No user logged in");
            window.location.href = "./login.html";
        }
    });
}

// 🔹 Fetch all users from Firestore
async function getUsers(currentUserId) {
    const usersContainer = document.getElementById("users-container");
    if (!usersContainer) return;

    usersContainer.innerHTML = `
        <div class="flex justify-center items-center py-12">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p class="mt-4 text-gray-600">Loading users...</p>
            </div>
        </div>`;

    try {
        const snapshot = await getDocs(collection(db, "users"));
        let html = "";

        snapshot.forEach((docSnap) => {
            const user = docSnap.data();

            // Skip the current logged-in user
            if (user.userId === currentUserId) return;

            const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "");
            html += `
                <div class="user-card p-6 hover:bg-gray-50 border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                ${initials || "U"}
                            </div>
                            <div>
                                <p class="font-medium">${user.firstName || "Unknown"} ${user.lastName || ""}</p>
                                <p class="text-sm text-gray-500">${user.email || "No email"}</p>
                            </div>
                        </div>
                        <button onclick="handleAddFriend('${user.userId}', '${currentUserId}')"
                            class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                            ➕ Add Friend
                        </button>
                    </div>
                </div>`;
        });

        usersContainer.innerHTML = html || `<div class="text-center py-12 text-gray-500">No users found</div>`;

    } catch (error) {
        console.error("❌ Error fetching users:", error);
        usersContainer.innerHTML = `<div class="text-center py-12 text-red-600">Error loading users</div>`;
    }
}

// 🔹 Add friend (send friend request)
window.handleAddFriend = async (friendId, currentUserId) => {
    try {
        const friendRef = doc(db, "users", friendId);
        await updateDoc(friendRef, {
            friendRequests: arrayUnion(currentUserId)
        });

        alert("✅ Friend request sent!");
    } catch (error) {
        console.error("❌ Error sending friend request:", error);
        alert("Failed to send friend request");
    }
};

// 🔹 Log out
window.logOut = () => {
    signOut(auth)
        .then(() => {
            window.location.href = "./login.html";
        })
        .catch((error) => console.error("Logout error:", error));
};

// Run
getUser();
