import { attachAuthStateChangeObserver } from "./controller/firebase_auth.js";
import { onClickHomeMenu, onClickMenu2Menu, onClickSignOutMenu } from "./controller/menueventhandlers.js";
import { routing } from "./controller/route_controller.js";

//menu button handler
document.getElementById('menu-home').onclick= onClickHomeMenu;
document.getElementById('menu-menu2').onclick= onClickMenu2Menu;
document.getElementById('menu-signOut').onclick= onClickSignOutMenu;

attachAuthStateChangeObserver();


window.onload = function(e){
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    //console.log(pathname,hash);
    routing(pathname, hash);
}