// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        this.buttonHandler();
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards)
        {
            dom.showBoards(boards);
            dom.buttonHandler();

            for (let board of boards) {
                let boardId = board['public_boards_id']
                dom.loadStatuses(boardId);
        }
        });
    },
    loadStatuses: function (boardId) {

        dataHandler.getStatuses(boardId,function (statuses) {
            dom.showColumns(statuses);
            dom.buttonHandlerColumns();
            dom.loadCards()
        })
    },
        showColumns: function (statuses) {
        let boardColumns = document.querySelectorAll('.board-columns');
        for (let boardColumn of boardColumns) {
            let boardColumnHTML = ''
            let boardTitle = boardColumn.dataset.boardtitle;
            let boardId = boardColumn.dataset.boardid;
            for (let status of statuses) {
                if (status['public_boards_id'] === boardId) {
                    boardColumnHTML += `<div class="board-column">
                                        <div class="board-column-title">
                                        <text class="column-name" data-boardtitle="${boardTitle}">${status['name']}</text>
                                        <button class="column-remove"><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                        <div class="board-column-content" data-boardid="${boardId}" data-statustitle="${status['name']}" data-statusid="${status['public_column_id']}"></div>
                                        </div>`
                }
            }
            boardColumn.innerHTML = boardColumnHTML;
        }
    },
    showBoards: function (boards) {
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
                        <div class="collapse board-columns hidden" id="collapseExample" data-boardtitle="${board['name']}" data-boardid="${board['public_boards_id']}">
                        </div>
                    </div>
            </section> 
            `;
            console.log(board['public_boards_id'])
        }
            // <div class="container">
            //     ${boardList}
            // </div>
        const outerHtml = `
            <section id="boards">
            ${boardList}
            </section>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called

        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards)
    })

    },

    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            let statusName = card.s
            let boardId = card.board_id
            let column = document.querySelector(`.board-column-content[data-boardid="${boardId}"][data-statustitle="${column['name']}"]`)
            let cardsHTML  = column.innerHTML
            cardsHTML += `<div class="card">
                              <div class="card-content">
                                  <div class="card-title">${card['name']}</div>
                                  <div class="card-archive"><i class="fas fa-archive"></i></div>
                                  <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                              </div>
                          </div>`
            column.innerHTML = cardsHTML
        }
    },
    buttonHandler: function () {
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
                            dom.loadBoards();
                        })

                        let boardContainer = document.querySelector('.board');
                        console.log(boardContainer);
                        boardContainer.innerHTML = '';
                        console.log(boardContainer);
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
            let statuses = document.querySelector()
            // for (status of statuses) {
            //     let firstColumnId = statuses[status[0]] //DO ZROBIENIA TO DO okreslic statuses
            // }

            saveNewCardBtn.addEventListener('click', function () {
                let newCardName = document.querySelector(`.card-add-input[data-boardid="${boardId}"]`).value
                dataHandler.createNewCard(newCardName, statusId, function (response) {
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

    //Changing the title of the column
    buttonHandlerColumns: function () {
        let columnTitles = document.querySelectorAll('.column-name')
        for (let columnTitle of columnTitles) {
            let boardTitle = columnTitle.dataset.boardtitle
            //Changing into input on double clicking
            columnTitle.addEventListener('dblclick', function () {
                let oldColumnTitle = columnTitle.innerHTML
                columnTitle.innerHTML = `<input type="text" value="${oldColumnTitle}" data-oldcolumntitle="${oldColumnTitle}">`
                let inputField = document.querySelector(`[data-oldcolumntitle="${oldColumnTitle}"]`)
                inputField.addEventListener('keyup', function (event) {
                    //updating the title when clicking Enter
                    if (event.keyCode === 13) {
                        let newColumnTitle = inputField.value
                        dataHandler.updateStatus(oldColumnTitle, newColumnTitle, boardTitle, function (response) {
                            dom.loadStatuses();
                        })
                        //leaving old title when clicking Escape
                    } else if (event.keyCode === 27) {
                        columnTitle.innerHTML = oldColumnTitle
                    }
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

