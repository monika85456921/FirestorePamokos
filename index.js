import { app } from "./firebase.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const db = getFirestore(app);
console.log(db);

//https://firebase.google.com/docs/firestore/manage-data/add-data
//prideti data i firestore

//1.su setDoc

const settingDoc = async () => {
  await setDoc(doc(db, "cars", "1"), {
    brand: "Toyota",
    model: "Yaris",
    years: 2000,
    consumption: 1.5,
  })
    .then(() => {
      alert("added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
settingDoc();

//2.addDoc
const addDocumenent = async () => {
  await addDoc(collection(db, "cars"), {
    brand: "Mercedez ",
    model: "benz",
    years: 2021,
    consumption: 7,
  })
    .then(() => {
      alert("added successfully1");
    })
    .catch((err) => {
      console.log(err);
    });
};
// addDocumenent();

//https://firebase.google.com/docs/firestore/query-data/get-data
//3.get a document , viena documenta

const getOne = async () => {
  const docSnap = await getDoc(doc(db, "cars", "1"));
  console.log("Document Data:", docSnap.data());
};
getOne();

//gauti visus documentus

const getAll = async () => {
  const querySnapshot = await getDocs(collection(db, "cars"));
  const arr = [];
  querySnapshot.forEach((el) => arr.push(el.data()));
  console.log(arr);
};
getAll();

//https://firebase.google.com/docs/firestore/manage-data/add-data
//update a document

const update = async () => {
  await updateDoc(doc(db, "cars", "1"), {
    brand: "Mercedez ",
    model: "BOnz",
    years: 2421,
    consumption: 7,
  })
    .then(() => {
      alert("updated successfully1");
    })
    .catch((err) => {
      console.log(err);
    });
};
update();

//Delete

const deleteCar = async () => {
  await deleteDoc(doc(db, "cars", "1"));
};
deleteCar();
