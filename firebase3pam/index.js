import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

const regLogForm = document.getElementById("regLogForm");
const emailInput = document.getElementById("regEmail");
const passwInput = document.getElementById("passwInput");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(emailInput.value, passwInput.value);
  const email = emailInput.value.trim();
  const password = passwInput.value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const registerTime = new Date();

      set(ref(db, "/users/" + user.uid), {
        email: email,
        role: "simple",
        timestamp: `${registerTime}`,
      });
      console.log("new user created!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(emailInput.value, passwInput.value);
  const email = emailInput.value.trim();
  const password = passwInput.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in!", user);

      const loginTime = new Date();

      update(ref(db, "/users/" + user.uid), {
        timestamp: `${loginTime}`,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
const loginContainer = document.getElementById("loginContainer");
const greetingImage = document.createElement("img");
greetingImage.alt = "greeting";
greetingImage.id = "panelImg";
loginContainer.appendChild(greetingImage);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    get(child(ref(db), "/users/" + uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersDataFromDB = snapshot.val();
          const userRole = usersDataFromDB.role;

          if (userRole === "admin") {
            console.log("Tu esi admin'as!Tau viskas galima!");
            greetingImage.src =
              "https://images.fineartamerica.com/images/artworkimages/medium/3/the-best-admin-you-are-cute-baby-alien-funny-gift-for-coworker-present-gag-office-joke-sci-fi-fan-funnygiftscreation-transparent.png";
          } else {
            console.log("Tu esi paprastas vartotojas. Nusileisk ant zemes");
            greetingImage.src =
              "https://cdn.langeek.co/photo/37170/original/greetings";
          }
        } else {
          console.log("no data");
        }
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    console.log("you have logged out, cya!");
    //pav logout'o
    greetingImage.src =
      "https://www.shutterstock.com/shutterstock/photos/2155853693/display_1500/stock-vector-goodbye-quote-flat-high-quality-vector-2155853693.jpg";
  }
});
logoutBtn.addEventListener("click", (event) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      const panelImg = document.getElementById("panelImg");
      panelImg.remove();
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});

// let form = document.getElementById("form");
// let carBrand = document.getElementById("carBrandInput");
// let carModel = document.getElementById("carModelInput");
// let carYear = document.getElementById("carYearInput");
// let carPrice = document.getElementById("carPriceInput");
// let favCarPhoto = document.getElementById("favoriteCarPhotoInput");

// let insertBtn = document.getElementById("insertBtn");
// let updateBtn = document.getElementById("updateBtn");
// let deleteBtn = document.getElementById("deleteBtn");

// //sukurti duomenis su unique ID
// insertBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   set(push(ref(db, "cars/")), {
//     brand: carBrand.value,
//     model: carModel.value,
//     year: carYear.value,
//     price: carPrice.value,
//     photo: favCarPhoto.value,
//   })
//     .then(() => {
//       alert("Added!");
//       form.reset();
//       getData();
//     })
//     .catch((error) => {
//       alert(error);
//     });
// });

// //gauti visus duomenis i console
// const containerForData = document.getElementById("container");

// const getData = function () {
//   get(child(ref(db), `cars/`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         console.log(data);

//         for (const car in data) {
//           const carData = data[car];
//           console.log("car data", carData);
//           containerForData.innerHTML += `
//             <div>
//             <img src="${carData.photo}" alt="car">
//             <h3>Brand:${carData.brand}</h3>
//             <h4>Model:${carData.model}</h4>
//             <h5>Year:${carData.year}</h5>
//             <h6>Price:${carData.price}$</h6>
//             </div>`;
//         }
//       } else {
//         console.log("No data");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// getData();

//auth
