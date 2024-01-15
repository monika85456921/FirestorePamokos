import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const enterID = document.getElementById("productID");
const enterName = document.getElementById("enterName");
const enterQuantity = document.getElementById("enterQuantity");

const insertBtn = document.getElementById("insert");
const updateBtn = document.getElementById("update");
const removeBtn = document.getElementById("remove");

insertBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const productName = enterName.value;
  const productQuantity = enterQuantity.value;
  const productID = enterID.value;

  set(ref(db, "product/" + productID), {
    name: productName,
    quantity: productQuantity,
    id: productID,
  })
    .then(() => {
      alert("Added!");
    })
    .catch((error) => {
      alert(error);
    });
});
updateBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const productID = enterID.value;

  get(child(ref(db), `product/${productID}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        enterName.value = snapshot.val().name;
        enterQuantity.value = snapshot.val().quantity;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
