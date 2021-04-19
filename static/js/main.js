import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    if (path === '/'){
        dom.loadBoards();
    }
}

init();
