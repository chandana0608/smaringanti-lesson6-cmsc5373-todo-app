import { homePageView } from "../view/home_page.js"
import { Menu2PageView } from "../view/menu2_page.js"

export const routePathenames = {
    HOME: '/',
    MENU2: '/menu2',
}

export const routes = [
    {path:routePathenames.HOME,page:homePageView},
    {path:routePathenames.MENU2,page:Menu2PageView}
];

export function routing(pathname) {
    const route = routes.find(r => r.path == pathname);
    if(route) {
        route.page();
    } else {
        route[0].page();
    }
}
