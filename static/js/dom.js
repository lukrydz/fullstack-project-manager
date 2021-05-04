// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function ()
    {
        // This function should run once, when the page is loaded.
        this.buttonHandlerInit();
       dataHandler.getTokenFromCookie();

    },

    loadBoards: function ()
    {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards) {
            dom.showBoards(boards);
            dom.addButtonHandlerToBoards();

            for (let board of boards) {
                let boardId = board['public_boards_id']
                dom.loadStatuses(boardId);
            }
        });


        // dataHandler.getBoardsPrivate(function(boards)
        // {
        //     console.log(boards)
        //     dom.showBoards(boards);
        //     dom.addButtonHandlerToBoards();
        //
        //
        //     for (let board of boards)
        //     {
        //         let boardId = board['boards_id']
        //         dom.loadStatuses(boardId);
        //     }
        // });


    },

    loadStatuses: function (boardId)
    {
        dataHandler.getStatuses(boardId,function (statuses)
        {
            dom.showColumns(boardId, statuses);
            dom.addButtonHandlerColumns();
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
                dom.showCards(cards, status);
            }
        })
    },

    showBoards: function (boards)
    {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        // let boardList = '';
        //if (boards != null)

        let boardsContainer = document.querySelector('#boards');

        for (let i = 0; i < boards.length; i++)
        {
            let board = boards[i];

            let boardId = board['public_boards_id'] || board['board_id']
            let boardTitle = board['name']

            let DOMboard = document.createElement('section')
            DOMboard.classList.add('board')

            let DomHeader = document.createElement('div')
            DomHeader.classList.add('board-header')

            let HeaderSpan = document.createElement('span')
            HeaderSpan.classList.add('board-title')
            HeaderSpan.innerText = board['name']

            let DOMbuttons = document.createElement('div')
            DOMbuttons.classList.add('board-specific', 'ml-auto')

            let DOMAddCardButton = document.createElement('button')
            DOMAddCardButton.classList.add('card-add', 'btn', 'btn-outline-dark', 'btn-sm', 'board-add')
            DOMAddCardButton.setAttribute('type', 'button')
            DOMAddCardButton.innerText = 'Add Card'

            let DOMCardAddForm = document.createElement('span')
            DOMCardAddForm.classList.add('card-add-form', 'hidden')

            let DOMCardAddFormInput = document.createElement('input')
            DOMCardAddFormInput.setAttribute('type', 'text')
            DOMCardAddFormInput.classList.add('card-add-input')
            DOMCardAddFormInput.setAttribute('placeholder', 'Card content')

            let DOMCardAddFormButton = document.createElement('button')
            DOMCardAddFormButton.classList.add('card-save-btn', 'btn', 'btn-outline-dark', 'btn-sm', 'board-add')
            DOMCardAddFormButton.innerText = 'Save'

            let DOMAddColumnButton = document.createElement('button')
            DOMAddColumnButton.classList.add('column-add', 'btn', 'btn-outline-dark', 'btn-sm', 'board-add')
            DOMAddColumnButton.setAttribute('type', 'button')
            DOMAddColumnButton.innerText = 'Add Column'

            let DOMColumnAddForm = document.createElement('span')
            DOMColumnAddForm.classList.add('column-add-form', 'hidden')

            let DOMColumnAddFormInput = document.createElement('input')
            DOMColumnAddFormInput.classList.add('column-add-input')
            DOMColumnAddFormInput.setAttribute('type', 'text')
            DOMColumnAddFormInput.setAttribute('placeholder', 'Column name')

            let DOMColumnAddFormButton = document.createElement('button')
            DOMColumnAddFormButton.classList.add('save-status-btn', 'btn', 'btn-outline-dark', 'btn-sm', 'board-add')
            DOMColumnAddFormButton.innerText = 'Save'

            let DOMRevealButton = document.createElement('button')
            DOMRevealButton.classList.add('board-toggle', 'btn', 'btn-outline-dark', 'btn-sm')
            DOMRevealButton.setAttribute('type', 'button')
            DOMRevealButton.innerHTML = `<i class="fas fa-chevron-down"></i>`

            let DOMDeleteButton = document.createElement('button')
            DOMDeleteButton.classList.add('board-delete', 'btn', 'btn-outline-dark', 'btn-sm')
            DOMDeleteButton.setAttribute('type', 'button')
            DOMDeleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`

            let BoardColumnsDiv = document.createElement('div')
            BoardColumnsDiv.classList.add('board-columns', 'hidden')
            BoardColumnsDiv.setAttribute('id', 'board-columns'+board['public_boards_id'])

            let ElementsToAddBoardIdTo = [DOMboard,
                                        HeaderSpan,
                                        DOMbuttons,
                                        DOMAddCardButton,
                                        DOMCardAddForm,
                                        DOMCardAddFormInput,
                                        DOMCardAddFormButton,
                                        DOMAddColumnButton,
                                        DOMColumnAddForm,
                                        DOMColumnAddFormInput,
                                        DOMColumnAddFormButton,
                                        DOMRevealButton,
                                        DOMDeleteButton,
                                        BoardColumnsDiv]

            for (let element of ElementsToAddBoardIdTo) {
                element.setAttribute('data-boardid', boardId)
            }

            let ElementsToAddBoardTitleTo =
                [DOMbuttons,
                DOMAddCardButton,
                DOMCardAddForm,
                DOMCardAddFormInput,
                DOMCardAddFormButton,
                DOMAddColumnButton,
                DOMColumnAddForm,
                DOMColumnAddFormInput,
                DOMColumnAddFormButton,
                DOMRevealButton,
                DOMDeleteButton,
                BoardColumnsDiv]

            for (let element of ElementsToAddBoardTitleTo) {
                element.setAttribute('data-boardtitle', board['name'])
            }

            // chaining it all together
            DOMboard.appendChild(DomHeader) // main section

            DOMboard.appendChild(BoardColumnsDiv) // main div

            DomHeader.appendChild(HeaderSpan) // title div
            DomHeader.appendChild(DOMbuttons) // buttons div

                    DOMbuttons.appendChild(DOMAddColumnButton)
                    DOMbuttons.appendChild(DOMColumnAddForm)
                    DOMbuttons.appendChild(DOMDeleteButton)
                    DOMbuttons.appendChild(DOMRevealButton)

                    DOMbuttons.appendChild(DOMAddCardButton)
                    DOMbuttons.appendChild(DOMCardAddForm)

                        DOMCardAddForm.appendChild(DOMCardAddFormInput)
                        DOMCardAddForm.appendChild(DOMCardAddFormButton)

                        DOMColumnAddForm.appendChild(DOMColumnAddFormInput)
                        DOMColumnAddForm.appendChild(DOMColumnAddFormButton)

            boardsContainer.appendChild(DOMboard)

        }

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
                                <div class="board-column-content" id="column-cards${status['public_column_id']}" data-statustitle="${status['name']}" data-statusid="${status['public_column_id']}">
                                </div>
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
                cardsHTML += `<div class="card">
                                 <div class="card-title">${card['name']}</div>
                                 <div class="card-icons ml-auto">
                                      <div class="card-archive"><i class="fas fa-archive"></i></div>
                                      <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                                  </div>
                              </div>`
            }
        }
        let cardsContainer = document.querySelector(`#column-cards${status['public_column_id']}`);
        cardsContainer.innerHTML = cardsHTML;

    },
    ////////      BUTTTONS     ///////


    // INIT BUTTONS
    buttonHandlerInit: function ()
    {
        // user login section
        if (window.location.href.indexOf("login") > -1) {
            let loginBtn = document.querySelector('#loginbutton');
            let userLogin = document.querySelector('exampleInputEmail1');
            let userPassword = document.querySelector('exampleInputPassword1');
            loginBtn.addEventListener('click', function () {
                dataHandler.loginUser(userLogin, userPassword, dataHandler.setTokenCookie)
            });
        }

        // New Board Add Button
        let saveNewBoardBtn = document.querySelector('#save-newboard-btn');
        let newBoardDiv = document.querySelector('.new-board-input');
        saveNewBoardBtn.addEventListener('click', function ()
        {
            let boardTitle = document.querySelector('#new-board-title').value;
            dataHandler.createNewBoard(boardTitle, function (response)
            {
                newBoardDiv.classList.add('hidden');
                dom.loadBoards();
            })
        })

        // Opening newBoardDiv on click to put new board title in
        let newBoardBtn = document.querySelector('#new-board-btn');
        newBoardBtn.addEventListener('click', function ()
        {
            newBoardDiv.classList.remove('hidden');
        })

    },


    // BOARD BUTTONS
    addButtonHandlerToBoards: function ()
    {
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
        let dropDownBtns = document.querySelectorAll('.board-toggle');
        for (let dropDownBtn of dropDownBtns)
        {
            dropDownBtn.addEventListener('click', function () {
                let boardId = dropDownBtn.dataset.boardid;
                let boardColumn = document.querySelector(`.board-columns[data-boardid="${boardId}"]`);
                boardColumn.classList.toggle('hidden');

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
        for (let addNewColumnBtn of addNewColumnBtns)
        {
            addNewColumnBtn.addEventListener('click', function ()
            {
                let boardId = addNewColumnBtn.dataset.boardid;
                let newColumnInput = document.querySelector(`.column-add-form[data-boardid="${boardId}"]`);
                newColumnInput.classList.toggle('hidden')

            })
        }
        // Saving title of the new column
        let saveNewStatusBtns = document.querySelectorAll('.save-status-btn');
        for (let saveNewStatusBtn of saveNewStatusBtns)
        {
            saveNewStatusBtn.addEventListener('click', function ()
            {
                let boardTitle = saveNewStatusBtn.dataset.boardtitle;
                let boardId = saveNewStatusBtn.dataset.boardid;

                let newStatusName = document.querySelector(`.column-add-input[data-boardtitle="${boardTitle}"]`).value

                dataHandler.createNewStatus(newStatusName, boardId, function (response) {
                    dom.loadStatuses(boardId);
                })
            })
        }

        //Adding new card when clickin on button Add Card
        let addCardBtns = document.querySelectorAll('.card-add')
        for (let button of addCardBtns)
        {
            let boardId = button.dataset.boardid
            let cardInput = document.querySelector(`.card-add-form[data-boardid="${boardId}"]`)
            button.addEventListener('click' , function()
            {
                cardInput.classList.toggle('hidden')
            })
            //Saving the content of the new Card when clicking Save
            let saveNewCardBtns = document.querySelectorAll('.card-save-btn');
            for (let saveNewCardBtn of saveNewCardBtns)
            {
                let boardId = saveNewCardBtn.dataset.boardid
                let firstColumnId = null;
                 let statuses = document.querySelectorAll('.board-column');
                    for (let i = 0; i<statuses.length;i++) {
                        let currentColumnId = statuses[i].getAttribute('data-statusid');
                        if (firstColumnId === null){
                        firstColumnId = currentColumnId;
                      }
                      else {
                        if (currentColumnId < firstColumnId) {
                          firstColumnId = currentColumnId;
                        }
                      }
                    }


                saveNewCardBtn.addEventListener('click', function ()
                {
                let newCardName = document.querySelector(`.card-add-input[data-boardid="${boardId}"]`).value
                    console.log(newCardName)
                    console.log(firstColumnId)
                    dataHandler.createNewCard(newCardName, '4', "3", function (response) {
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
        for (let deleteBoardBtn of deleteBoardBtns)
        {
            deleteBoardBtn.addEventListener('click', function (event)
            {
                let boardId = deleteBoardBtn.dataset.boardid
                console.log(boardId)
                dataHandler.deleteBoard(boardId, function() {
                    this.loadBoards();
                })
            })
        }

    },



     // COLUMN BUTTONS
    //Changing the title of the column

    addButtonHandlerColumns: function ()
    {
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
        //Delete Column by clicking on trash icon
        let deleteColumnBtns = document.querySelectorAll('.column-remove');
        for (let deleteColumnBtn of deleteColumnBtns)
        {
            deleteColumnBtn.addEventListener('click', function (event)
            {
                let columnId = deleteColumnBtn.dataset.columnid;
                dataHandler.deleteStatus(columnId, function()
                {
                    dom.loadStatuses()
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

