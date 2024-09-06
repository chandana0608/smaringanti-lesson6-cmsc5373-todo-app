import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";

export function Menu2PageView() {
    if(!currentUser) {
        root.innerHTML = '<h1>protected page</h1>'
        return;
     }
    root.innerHTML = '<h1>Menu2 Page</h1>';
}