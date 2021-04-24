// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        this.buttonHandler();
        // This function should run once, when the page is loaded.
    },

    loadBoards: function ()
    {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards)
        {
            dom.showBoards(boards);
            dom.buttonHandler();

            for (let board of boards)
            {
                let boardId = board['public_boards_id']
                dom.loadStatuses(boardId);
            }
        });
    },

    loadStatuses: function (boardId)
    {
        dataHandler.getStatuses(boardId,function (statuses)
        {
            dom.showColumns(boardId, statuses);
            dom.buttonHandlerColumns();
            dom.loadCards(boardId, statuses)
        })
    },

    loadCards: function (boardId, statuses)
    {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards)
        {
            for (let status of statuses)
            {
                dom.showCards(cards, status)
            }
        })
    },

    showBoards: function (boards)
    {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards)
        {
            boardList += `
                <section class="board" data-boardid="${board['public_boards_id']}">
                    <div class="board-header"><span class="board-title" data-boardid="${board['public_boards_id']}">${board['name']}</span>
                        <span class="board-specific " data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}">
                            <button class="card-add btn btn-outline-dark btn-sm board-add" type="button" data-boardid="${board['public_boards_id']}" data-boardtitle="${board['name']}">Add Card</button>
                                <span class="card-add-form hidden" data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}">
                                    <input type="text" class="card-add-input" data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}" value="">
                                    <button class="card-save-btn btn btn-outline-dark btn-sm board-add" data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}">Save</button>
                                </span>
                            <button class="column-add btn btn-outline-dark btn-sm board-add" type="button" data-boardid="${board['public_boards_id']}" data-boardtitle="${board['name']}">Add Column</button>
                                <span class="column-add-form hidden" data-boardid="${board['public_boards_id']}">
                                    <input type="text" class="column-add-input" data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}" value="">
                                    <button class="save-status-btn btn btn-outline-dark btn-sm board-add" data-boardtitle="${board['name']}" data-boardid="${board['board_id']}">Save</button>
                                </span>
                            <button class="board-delete btn btn-outline-dark btn-sm" type="button"  data-boardid="${board['public_boards_id']}"><i class="fas fa-trash-alt"></i></button>
                            <button class="board-toggle btn btn-outline-dark btn-sm" type="button"  data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}"><i class="fas fa-chevron-down"></i></button>
                        </span>
                    </div>
                    <div class=" board-columns hidden" id="board-columns${board['public_boards_id']}" data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}">
                    </div>
                    
                </section> 
            `;
            console.log(board['public_boards_id'])
        }

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = boardList;
    },

    showColumns: function (boardId, statuses)
    {
        let boardColumnHTML = ''
        for (let status of statuses)
        {
            boardColumnHTML += `<div class="board-column" data-statusid="${status['public_column_id']}">
                                <div class="board-column-title" data-statusid="${status['public_column_id']}">
                                <text class="column-name" data-statusid="${status['public_column_id']}">${status['name']}</text>
                                <button class="column-remove" data-statusid="${status['public_column_id']}"><i class="fas fa-trash-alt"></i></button>
                                </div>
                                <div class="board-column-content" id="column-cards${status['public_column_id']}" data-statustitle="${status['name']}" data-statusid="${status['public_column_id']}"></div>
                                </div>`

        }
        let columnsContainer = document.getElementById(`board-columns${boardId}`);
        columnsContainer.innerHTML = boardColumnHTML;

    },

    showCards: function (cards, status)
    {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cardsHTML = ''
        for (let card of cards)
        {
            if (card["column"] === status["name"])
            {
                console.log(card['name'])
                cardsHTML += `<div class="card">
                                      <div class="card-title">${card['name']}</div>
                                 <div class="card-icons">
                                      <div class="card-archive"><i class="fas fa-archive"></i></div>
                                      <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                  </div>
                              </div>`
            }
        }
        let cardsContainer = document.querySelector(`#column-cards${status['public_column_id']}`);
        cardsContainer.innerHTML = cardsHTML;

    },

    // BOARD BUTTONS
    buttonHandler: function ()
    {
        // New Board Add Button
        let saveNewBoardBtn = document.querySelector('#save-newboard-btn');
        let newBoardDiv = document.querySelector('.new-board-input');
        saveNewBoardBtn.addEventListener('click', function () {
            let boardTitle = document.querySelector('#new-board-title').value;
            dataHandler.createNewBoard(boardTitle, function (response) {
                dom.loadBoards(response);
                dom.init()
                newBoardDiv.classList.add('hidden');
            })
        })
        // Opening newBoardDiv on click to put new board title in
        let newBoardBtn = document.querySelector('#new-board-btn');
        newBoardBtn.addEventListener('click', function () {
            newBoardDiv.classList.remove('hidden');
        })
        //changing the title of the Board when double clicking
        let boardTitleItems = document.querySelectorAll('.board-title');
        for (let boardTitleItem of boardTitleItems) {
            boardTitleItem.addEventListener('dblclick', function () {
                let old_board_title = boardTitleItem.innerHTML
                boardTitleItem.innerHTML = `<input type="text" value="${old_board_title}" data-oldtitle="${old_board_title}">
                                            <button type="button" class="btn btn-outline-dark btn-sm save-boardname-btn">Save</button>`
                let renameBoardBtns = document.querySelectorAll('.save-boardname-btn')
                let boardId = boardTitleItem.dataset.boardid;
                        console.log(boardId)
                for (let renameBoardBtn of renameBoardBtns) {
                    renameBoardBtn.addEventListener('click', () => {

                        let new_board_title = document.querySelector(`[data-oldtitle='${old_board_title}']`).value;
                        dataHandler.updateBoard(new_board_title, boardId, function (response) {
                            let boardTitle = document.querySelector('.board-title');
                        boardTitle.innerHTML = `${new_board_title}`;
                        })

                    })
                }
            })
        }
        //changing the collapse button image on click depending if content is hidden or not
        let dropDownBtns = document.querySelectorAll('.board-toggle')
        for (let dropDownBtn of dropDownBtns) {
            dropDownBtn.addEventListener('click', function () {
                let boardTitle = dropDownBtn.dataset.boardtitle;

                let boardColumns = document.querySelectorAll(`.board-columns[data-boardtitle="${boardTitle}"]`);
                for (let boardColumn of boardColumns) {
                    boardColumn.classList.toggle('hidden');
                }
                if (dropDownBtn.firstElementChild.classList.contains('fa-chevron-down')) {
                    dropDownBtn.firstElementChild.classList.remove('fa-chevron-down');
                    dropDownBtn.firstElementChild.classList.add('fa-chevron-up');
                } else {
                    dropDownBtn.firstElementChild.classList.remove('fa-chevron-up');
                    dropDownBtn.firstElementChild.classList.add('fa-chevron-down');
                }
            })
        }
        //Adding new column on button click
        let addNewColumnBtns = document.querySelectorAll('.column-add')
        for (let addNewColumnBtn of addNewColumnBtns) {
            addNewColumnBtn.addEventListener('click', function () {
                let boardId = addNewColumnBtn.dataset.boardid;
                let newColumnInput = document.querySelector(`.column-add-form[data-boardid="${boardId}"]`);
                newColumnInput.classList.toggle('hidden')

            })
        }
        // Saving title of the new column
        let saveNewStatusBtns = document.querySelectorAll('.save-status-btn');
        for (let saveNewStatusBtn of saveNewStatusBtns) {
            let boardTitle = saveNewStatusBtn.dataset.boardtitle
            saveNewStatusBtn.addEventListener('click', function () {
                let newStatusName = document.querySelector(`.column-add-input[data-boardtitle="${boardTitle}"]`).value
                dataHandler.createNewStatus(newStatusName, boardTitle, function (response) {
                    dom.loadStatuses();
                })
            })
        }
        //Adding new card when clickin on button Add Card
        let addCardBtns = document.querySelectorAll('.card-add')
        for (let button of addCardBtns) {
            let boardId = button.dataset.boardid
            let cardInput = document.querySelector(`.card-add-form[data-boardid="${boardId}"]`)
            button.addEventListener('click' , function(){
                cardInput.classList.toggle('hidden')
            })
            //Saving the content of the new Card when clicking Save
            let saveNewCardBtns = document.querySelectorAll('.card-save-btn');
        for (let saveNewCardBtn of saveNewCardBtns) {
            let boardId = saveNewCardBtn.dataset.boardid
            // let statuses = document.querySelector()
            // for (status of statuses) {
            //     let firstColumnId = statuses[status[0]] //DO ZROBIENIA TO DO okreslic statuses
            // }

            saveNewCardBtn.addEventListener('click', function () {
                let newCardName = document.querySelector(`.card-add-input[data-boardid="${boardId}"]`).value
                dataHandler.createNewCard(newCardName, firstColumnId, function (response) {
                    dom.loadStatuses();
                })
            })
        }
            //this is for updating/changing card content, but not totally done yet
        //     cardInput.addEventListener('keyup', function(e) {
        //         if(e.keyCode === 13) {
        //             cardInput.classList.toggle('hidden')
        //             let cardTitle = document.querySelector(`.card-add-input[data-boardid="${boardId}"]`).value
        //             let statusName = document.querySelector(`.board-column-content[data-boardid="${boardId}"]`).dataset.statustitle
        //             dataHandler.createNewCard(cardTitle, boardId, statusName, function(response){
        //                 dom.loadStatuses()
        //             })
        //         //leaving old content when clicking Escape
        //         } else if (e.keyCode === 27) {
        //             cardInput.innerHTML = oldCardTitle
        //         }
        //     })
        //
        }
        //Delete Board by clicking on trash icon
        let deleteBoardBtns = document.querySelectorAll('.board-delete');
        for (let deleteBoardBtn of deleteBoardBtns) {
            deleteBoardBtn.addEventListener('click', function (event) {
                let boardId = deleteBoardBtn.dataset.boardid
                dataHandler.deleteBoard(boardId, function() {
                    this.loadBoards()
                })
            })
        }

    },

    // COLUMN BUTTONS
    //Changing the title of the column
    buttonHandlerColumns: function () {
        let columnTitles = document.querySelectorAll('.column-name')
        for (let columnTitle of columnTitles) {
            //Changing into input on double clicking
            let oldColumnTitle = columnTitle.innerHTML
            columnTitle.addEventListener('dblclick', function () {
                columnTitle.innerHTML = `<input type="text" value="${oldColumnTitle}" data-oldcolumntitle="${oldColumnTitle}">
                                         <button type="button" class="btn btn-outline-dark btn-sm save-columnname-btn">Save</button>`
                let renameColumnBtns = document.querySelectorAll('.save-columnname-btn')
                let columnId = columnTitle.dataset.statusid;
                for (let renameColumnBtn of renameColumnBtns) {
                    renameColumnBtn.addEventListener('click', () => {
                        let newColumnTitle = document.querySelector(`[data-oldcolumntitle="${oldColumnTitle}"]`).value;
                        dataHandler.updateStatus(newColumnTitle, columnId, function (response) {
                            let columnTitle = document.querySelector('.column-name');
                        columnTitle.innerHTML = `${newColumnTitle}`;
                        })
                    })
                }
            })
        };
        //Delete Board by clicking on trash icon
        let deleteColumnBtns = document.querySelectorAll('.column-remove');
        for (let deleteColumnBtn of deleteColumnBtns)
        {
            deleteColumnBtn.addEventListener('click', function (event)
            {
                let columnId = deleteColumnBtn.dataset.columnid;
                dataHandler.deleteStatus(columnId, function()
                {
                    this.loadStatuses()
                })
            })
        }

    }

    // here comes more features, to do list:
    // add updating cards, or not really??
    //add DELETING everything when clicking on favicon trash
    // add ARCHIVING cards
    // add drag and drop and updating
    // private boards vs public boards
};

