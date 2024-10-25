import { currentUser } from "../controller/firebase_auth.js";
import{ root } from "./elements.js";
import { protectedView } from "./protected_view.js";
import {onSubmitCreateForm,onClickExpandButton,
onKeydownNewItemInput,
 } from "../controller/home_controller.js";

export async function homePageView() {
    if(!currentUser) {
       root.innerHTML = await protectedView();
       return;
    }
    const response = await fetch('/view/templates/home_page_template.html',
         {cache: 'no-store'});
         const divWrapper = document.createElement('div');
         divWrapper.innerHTML = await response.text();
         divWrapper.classList.add('m-4','p-4')
         const form = divWrapper.querySelector('form');
         form.onsubmit = onSubmitCreateForm;
      

         root.innerHTML = '';
         root.appendChild(divWrapper);
}

export function buildCard(todoTitle){
   const div=document.createElement('div');
   div.classList.add('card','d-inline-block');
   div.style = "width: 25rem;";
   div.innerHTML=`
   <div id="${todoTitle.docId}" class="card-body">
       <button class = "btn btn-outline-primary">+</button>
       <span class ="fs-3 card-title">${todoTitle.title}</span>
    </div>
   `;

   const expandButton = div.querySelector('button');
    expandButton.onclick = onClickExpandButton;
   return div;
}

export function buildCardText(titleDocId) {
   const p= document.createElement('p');
   p.classList.add('card-text');
   const ul = document.createElement('ul');
   p.appendChild(ul);

const newItemInput = document.createElement('input');
newItemInput.size = "40";
newItemInput.id="input" + titleDocId;
newItemInput.placeholder= "Enter an item";
newItemInput.onkeydown = function(e) {
    onKeydownNewItemInput(e,titleDocId);
}
p.appendChild(newItemInput);

   return p;
}