import { 
    getFirestore,
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"

const TODO_TITLE_COLLECTION = 'todo_titles';
const TODO_ITEM_COLLECTION = 'todo_items';

import{app} from "./firebase_core.js";


const db = getFirestore(app);

export async function addToDoTitle(todoTitle) {
   const docRef= await addDoc(collection(db,TODO_TITLE_COLLECTION),todoTitle.toFirestore());
   return docRef.id;
}
