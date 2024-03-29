/**
 * myDBFirebase class, get, add, remove, update items data from database
 * Functions: initializeFirebase, getItems, updateItems, addItem, removeItem, modifyItem, searchItems
 */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  writeBatch,
} from "firebase/firestore/lite";
import moment from "moment/moment";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default class myDBFirebase {
  db = null;

  constructor(){
    this.initializeFirebase();
  }
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig = {
    apiKey: "AIzaSyDgW7QaHCfmPCe_OnAngwnkilL0MOjt7k4",
    authDomain: "dailytrack-a5348.firebaseapp.com",
    projectId: "dailytrack-a5348",
    storageBucket: "dailytrack-a5348.appspot.com",
    messagingSenderId: "989681757572",
    appId: "1:989681757572:web:dd5039f64aa833314441d1",
    measurementId: "G-KBFLKFLCJT"
  };

  // init firebase and set db
  initializeFirebase() {
    // Initialize Firebase
    const app = initializeApp(this.firebaseConfig);
    const analytics = getAnalytics(app);
    console.log("Firebase initialized!", app, analytics);
    this.db = getFirestore();
  }

  // Retrieve the items data from Firebase, not expired using >=, expired using <
  async getItems(operator) {
    if (!this.db) {
      console.error("Database not initialized!");
      return [];
    }
    const itemsCollection = collection(this.db, "Items");
    // Set query select items order by expiration
    const q = query(itemsCollection, orderBy("expiration"), where("expiration", operator, moment().format("YYYY-MM-DD")));
    // Retrieve items data from db
    const res = await getDocs(q);
    const items = [];
    // push data to items
    for (let doc of res.docs) {
      const item = doc.data();
      item.id = doc.id;
      items.push(item);
    }
    return items;
  }

  // update expired items which period are not day
  async updateItems() {
    if (!this.db) {
      console.error("Database not initialized!");
      return;
    }
    const items = await this.getItems("<");
    // Get a new write batch
    const batch = writeBatch(this.db);
    items.forEach((item) => {
      switch(item.period) {
        case "Week":
          item.expiration = moment(item.expiration).add(1, "weeks").format("YYYY-MM-DD");
          batch.set(doc(this.db, "Items", item.id), item);
          break;
        case "Month":
          item.expiration = moment(item.expiration).add(1, "months").format("YYYY-MM-DD");
          batch.set(doc(this.db, "Items", item.id), item);
          break;
        case "Year":
          item.expiration = moment(item.expiration).add(1, "years").format("YYYY-MM-DD");
          batch.set(doc(this.db, "Items", item.id), item);
          break;
        default: 
          break;
      }
    });
    await batch.commit();
  }

  // Add item into db
  async addItem(item) {
    if (!this.db) {
      console.error("Database not initialized!");
      return;
    }
    const itemsCollection = collection(this.db, "Items");
    await addDoc(itemsCollection, item);
  }

  // Remove item from db by id
  async removeItem(id) {
    if(!this.db) {
      console.error("Database not initialized!");
      return;
    }
    await deleteDoc(doc(this.db, "Items", id));
  }

  // Modify item from db by id
  async modifyItem(item) {
    if(!this.db) {
      console.error("Database not initialized!");
      return;
    }
    await updateDoc(doc(this.db, "Items", item.id), item);
  }

  // Search items (not expired) from db by name and tag
  async searchItems(name, tag, operator) {
    if(!this.db) {
      console.error("Database not initialized!");
      return;
    }
    // Get collection Items
    const itemsCollection = collection(this.db, "Items");
    // Set query select items with name and tag order by expiration
    let q;
    // Search by tag first, then filter data by name
    if(tag){
      q = query(itemsCollection, orderBy("expiration"), where("expiration", operator, moment().format("YYYY-MM-DD")), where("tags", "array-contains", tag));
    } else {
      q = query(itemsCollection, orderBy("expiration"), where("expiration", operator, moment().format("YYYY-MM-DD")));
    }
    // Retrieve items data from db
    const res = await getDocs(q);
    // push data to items
    let items = [];
    name = name.toLowerCase();
    if(name){
      res.docs.forEach((doc) => {
        const item = doc.data();
        if(item.name.toLowerCase().includes(name)) {
          item.id = doc.id;
          items.push(item);
        }
      });
    } else {
      for (let doc of res.docs) {
        const item = doc.data();
        item.id = doc.id;
        items.push(item);
      }
    }
    return items;
  }
}