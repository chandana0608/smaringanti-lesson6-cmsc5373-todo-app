import { currentUser } from "./firebase_auth.js";
import { addToDoItem, addToDoTitle } from "./firestore_controller.js";
import { ToDoTitle } from "../model/ToDoTitle.js";
import { DEV } from "../model/constants.js";
import { progressMessage } from "../view/progress_message.js";
import { buildCard, buildCardText } from "../view/home_page.js";
import { ToDoItem } from "../model/ToDoItem.js";

export async  function onSubmitCreateForm(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const uid = currentUser.uid;
    const timestamp = Date.now();
    const todoTitle = new ToDoTitle({title,uid,timestamp});

    const progress =  progressMessage('Creating...');
    e.target.prepend(progress);
    
    let docId;
    try{
        docId = await addToDoTitle(todoTitle);
        todoTitle.set_docId(docId);
    } catch(e) {
        if(DEV) console.log('failed to create:',e);
        alert('Failed to create' + JSON.stringify(e));
        progress.remove();
        return;

    }
    progress.remove();

    const container= document.getElementById('todo-container');
    container.prepend(buildCard(todoTitle));
    e.target.title.value= '';

}

export function onClickExpandButton(e) {
    const button=e.target;
    const cardBody = button.parentElement;
    if(button.textContent == '+') {
        const cardText = cardBody.querySelector('.card-text');
        if(!cardText) {
            //read all existing todoItems
            cardBody.appendChild(buildCardText(cardBody.id)); //titleDocId
        }
        button.textContent= '-';
    
    } else{
        button.textContent='+';
    }
}

 export async function onKeydownNewItemInput(e,titleDocId) {
     if(e.key!="Enter") return; //only for Enter key
     const content = e.target.value;
     const titleId = titleDocId;
     const uid = currentUser.uid;
     const timestamp = Date.now();
     const todoItem = new ToDoItem({
        titleId,uid,content,timestamp
     });

     try {
        const docId= await addToDoItem(todoItem);
        todoItem.set_docId(docId);
     } catch(e) {
        if(DEV) console.log('Failed to add item',e);
        alert('Failed to save ToDo Item:' + JSON.stringify(e));
        return;
    }

 }