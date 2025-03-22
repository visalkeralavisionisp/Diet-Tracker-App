// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let totalCalories = 0;

function addFood() {
    let food = document.getElementById("food").value;
    let calories = parseInt(document.getElementById("calories").value);

    if (food && calories) {
        let listItem = document.createElement("li");
        listItem.textContent = `${food} - ${calories} calories`;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function () {
            totalCalories -= calories;
            document.getElementById("total-calories").textContent = totalCalories;
            listItem.remove();
        };

        listItem.appendChild(deleteBtn);
        document.getElementById("food-list").appendChild(listItem);

        totalCalories += calories;
        document.getElementById("total-calories").textContent = totalCalories;

        // Save to Firestore with .then() to check for success
        db.collection("calories").add({
            food: food,
            calories: calories,
            date: new Date().toISOString()
        }).then(() => {
            console.log("Data added successfully!");
        }).catch(error => {
            console.error("Error adding data: ", error);
            alert("Failed to save data. Check the console.");
        });

        // Clear input fields
        document.getElementById("food").value = "";
        document.getElementById("calories").value = "";
    } else {
        alert("Please enter both food item and calories");
    }
}
