// ===== Imports =====
import { 
  auth, db, doc, getDoc, setDoc, updateDoc, arrayUnion, onAuthStateChanged 
} from "./config.js";

// ===== Send Friend Request =====
async function sendFriendRequest(receiverId) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Please log in first!");
      window.location.href = "./login.html";
      return;
    }

    const senderId = user.uid;

    if (senderId === receiverId) {
      alert("You cannot send a friend request to yourself!");
      return;
    }

    try {
      const receiverRef = doc(db, "users", receiverId);
      const receiverSnap = await getDoc(receiverRef);

      // ✅ Ensure receiver exists in Firestore
      if (!receiverSnap.exists()) {
        alert("User not found!");
        return;
      }

      // ✅ Ensure receiver’s doc has friendRequests array
      const receiverData = receiverSnap.data();
      const existingRequests = receiverData.friendRequests || [];

      if (existingRequests.includes(senderId)) {
        alert("Friend request already sent!");
        return;
      }

      // ✅ Ensure sender also has a user document
      const senderRef = doc(db, "users", senderId);
      const senderSnap = await getDoc(senderRef);
      if (!senderSnap.exists()) {
        // create a doc for sender if missing
  await setDoc(doc(db, "users", userId), {
  firstName,
  lastName,
  email,
  phoneNumber,
  userId,
  friendRequests: [],
  friends: [],
  createdAt: new Date().toISOString()
});
}
      // ✅ Send friend request
      await updateDoc(receiverRef, {
        friendRequests: arrayUnion(senderId)
      });

      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Error sending friend request. Please try again.");
    }
  });
}

// ===== Make function accessible to HTML =====
window.sendFriendRequest = sendFriendRequest;
