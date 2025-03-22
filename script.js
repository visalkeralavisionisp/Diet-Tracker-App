// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn-iaVkmFTU_5b8PPxyfWj09xLCUGmPI4",
    authDomain: "diet-tracking-app-c5187.firebaseapp.com",
    projectId: "diet-tracking-app-c5187",
    storageBucket: "diet-tracking-app-c5187.firebasestorage.app",
    messagingSenderId: "381134447195",
    appId: "1:381134447195:web:d3af3f8f4c2902561a557e",
    measurementId: "G-H68WVTZ4QE"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Test Firebase Connection
db.collection("test").add({ message: "Checking Firestore Connection" })
    .then(() => console.log("✅ Firestore connected successfully!"))
    .catch(error => console.error("❌ Firestore connection failed:", error));

let totalCalories = 0;

// Function to Add Food Item
function addFood() {
    let food = document.getElementById("food").value;
    let calories = parseInt(document.getElementById("calories").value);

    if (food && calories) {
        // Save to Firestore
        db.collection("calories").add({
            food: food,
            calories: calories,
            date: new Date().toISOString()
        }).then((docRef) => {
            console.log("✅ Data added successfully!");
            displayFoodItem(docRef.id, food, calories);
        }).catch(error => {
            console.error("❌ Error adding data:", error);
            alert("❌ Failed to save data. Check the console.");
        });

        // Clear input fields
        document.getElementById("food").value = "";
        document.getElementById("calories").value = "";
    } else {
        alert("⚠️ Please enter both food item and calories");
    }
}

// Function to Display Food Item
function displayFoodItem(id, food, calories) {
    let listItem = document.createElement("li");
    listItem.setAttribute("data-id", id);
    listItem.textContent = `${food} - ${calories} calories`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function () {
        deleteFood(id, listItem, calories);
    };

    listItem.appendChild(deleteBtn);
    document.getElementById("food-list").appendChild(listItem);

    totalCalories += calories;
    document.getElementById("total-calories").textContent = totalCalories;
}

// Function to Delete Food Item
function deleteFood(id, listItem, calories) {
    db.collection("calories").doc(id).delete().then(() => {
        console.log("✅ Food item deleted from Firestore.");
        totalCalories -= calories;
        document.getElementById("total-calories").textContent = totalCalories;
        listItem.remove();
    }).catch(error => {
        console.error("❌ Error deleting food item:", error);
    });
}

// 
