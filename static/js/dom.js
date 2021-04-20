// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <section class="board">
                    <div class="board-header"><span class="board-title">Example Board</span>
                        <div class="board-specific hidden">
                            <button class="card-add btn btn-outline-dark btn-sm board-add" type="button">Add Card</button>
                                <span class="card-add-form hidden">
                                    <input type="text" class="card-add-input" value="">
                                    <button class="card-save-btn btn btn-outline-dark btn-sm board-add">Save</button>
                                </span>
                            <button class="column-add btn btn-outline-dark btn-sm board-add" type="button">Add Column</button>
                                <span class="column-add-form hidden">
                                    <input type="text" class="column-add-input" value="">
                                    <button class="save-status-btn btn btn-outline-dark btn-sm board-add">Save</button>
                                </span>
                            <button class="board-toggle btn btn-outline-dark btn-sm" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <div class="collapse board-columns" id="collapseExample">
                        </div>
                    </div>
            </section> 
            `;
        }

        const outerHtml = `
            <ul class="container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};