import { currentUser } from "./firebase_auth.js";
import { addToDoTitle } from "./firestore_controller.js";
import { ToDoTitle } from "../model/ToDoTitle.js";
import { DEV } from "../model/constants.js";
export async  function onSubmitCreateForm(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const uid = currentUser.uid;
    const timestamp = Date.now();
    const todoTitle = new ToDoTitle({title,uid,timestamp});

    let docId;
    try{
        docId = await addToDoTitle(todoTitle);
        todoTitle.set_docId(docId);
    } catch(e) {
        if(DEV) console.log('failed to create:',e);
        alert('Failed to create' + JSON.stringify(e));
        return;
    }
}