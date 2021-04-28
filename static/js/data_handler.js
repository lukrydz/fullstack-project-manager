// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
    _api_get: function (url, callback)
    {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response))  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback)
    {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
        // .catch(function(err) {console.log(err)});
    },

    _api_put: function (url, data, callback)
    {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        console.log(data)
        fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_delete: function (url, callback)
    {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin',
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },

    init: function ()
    {

    },

    setTokenCookie: function (token) {
        console.log('token: ', token)
        document.cookie = `token=${token}`;
        window.location.href = '/'
    },

    getTokenFromCookie: function() {
        const cookies = Object.fromEntries(document.cookie.split(/; */).map(cookie => cookie.split('=', 2)))
        if (cookies['token']) {
            console.log('found token!', cookies['token'])
            return cookies['token']
        } else {
            console.log('token not found!')
        }
    },


    ///  USER PART  ///


    loginUser: function (userLogin, userPassword, callback)
    {
        console.log('Login function begins')
        let userData = { 'login': userLogin, 'password': userPassword }

        // creates new card, saves it and calls the callback function with token
        this._api_post('/login', userData,(response) => {
            console.log('Got API login response')
            callback(response);
        });
    },

    createNewUser: function (userData, callback)
    {
        // creates new user, saves it and calls the callback function with an answer
        this._api_post('/register', userData, (response) => {
            callback(response);
        });
    },


    ///  BOARDS PART  ///


    getBoards: function (callback)
    {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/boards/public', (response) => {
            callback(response);
        });
    },

    getBoard: function (boardId, callback)
    {
        // // the board is retrieved and then the callback function is called with the board
        // this._api_get(`/boards/public/${boardId}`, (response) => {
        // });
    },

    createNewBoard: function (boardTitle, callback)
    {
        let boardData = { "name": boardTitle }

        // creates new board, saves it and calls the callback function with its data
        this._api_post('/boards/public', boardData, (response) => {
            callback(response);
        });
    },

    updateBoard: function (boardTitle, boardId, callback)
    {
        let updatedBoardData = { "name": boardTitle, "id": boardId }

        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/public', updatedBoardData, (response) => {
            callback(response);
        });
    },

    deleteBoard: function (boardId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/public/delete/${boardId}/`, (response) => {
            callback(response);
        });
    },

    getBoardsPrivate: function (callback)
    {
        // the boards are retrieved and then the callback function is called with the boards
        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get(`/boards/private?token=${this.getTokenFromCookie()}`,(response) => {
            callback(response);
        });
    },

    getBoardPrivate: function (boardId, callback)
    {
        // // the board is retrieved and then the callback function is called with the board
        // this._api_get(`/boards/public/${boardId}`, (response) => {
        //     callback(response);
        // });

        let token = this.getTokenFromCookie()
        this._api_get_token('/boards/public/${boardId}', token,(response) => {
            callback(response);
        });
    },

    createNewBoardPrivate: function (boardTitle, callback)
    {
        let newBoardData = { "name": boardTitle, 'token': this.getTokenFromCookie() }
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/boards/private', newBoardData, (response) => {
            callback(response);
        });
    },

    updateBoardPrivate: function (boardTitle, boardId, archived, callback)
    {
        let updatedBoardData = { "token": this.getTokenFromCookie(), "name": boardTitle, "id": boardId, "archived": archived }
        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/private', updatedBoardData, (response) => {
            callback(response);
        });
    },

    deleteBoardPrivate: function (boardId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/private/delete/${boardId}`, (response) => {
            callback(response);
        });
    },


    ///  STATUSES/COLUMNS PART  ///


    getStatuses: function (boardId, callback)
    {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get(`/boards/public/${boardId}/columns`, (response) => {
            callback(response);
        });
    },

    getStatus: function (statusId, callback)
    {
        // the status is retrieved and then the callback function is called with the status
        // this._api_get('/boards/public', (response) => {
        //     callback(response);
        // });
    },

    createNewStatus: function (columnTitle, boardId, callback)
    {
        let newColumnData = { "name": columnTitle, "board_id": boardId }
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/boards/public/columns', newColumnData, (response) => {
            callback(response);
        });
    },

    updateStatus: function (boardTitle, boardId, callback)
    {
        let newColumnData = { "name": boardTitle, "column_id": boardId }
        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/public/columns', newColumnData, (response) => {
            callback(response);
        });
    },

    deleteStatus: function (columnId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/columns/public/delete/${columnId}`, (response) => {
            callback(response);
        });
    },

    getStatusesPrivate: function (boardId, callback)
    {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get(`/boards/private/${boardId}/columns`, (response) => {
            callback(response);
        });
    },

    getStatusPrivate: function (statusId, callback)
    {
        // the status is retrieved and then the callback function is called with the status
        // this._api_get('/boards/private', (response) => {
        //     callback(response);
        // });
    },

    createNewStatusPrivate: function (boardTitle, boardId, callback)
    {
        let newStatusDataPrivate = { "name": boardTitle, "board_id": boardId }
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/boards/private/columns', newStatusDataPrivate, (response) => {
            callback(response);
        });
    },

    updateStatusPrivate: function (columnName, columnId, callback)
    {
        let newColumnData = { "name": columnName, "id": columnId }
        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/private/columns', newColumnData, (response) => {
            callback(response);
        });
    },

    deleteStatusPrivate: function (columnId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/columns/private/delete/${columnId}`, (response) => {
            callback(response);
        });
    },


    ///  CARDS PART  ///


    getCardsByBoardId: function (boardId, callback)
    {
        // the cards are retrieved and then the callback function is called with the cards
        this._api_get(`/boards/public/${boardId}`, (response) => {
            callback(response);
        });
    },

    getCard: function (cardId, callback)
    {
        // // the card is retrieved and then the callback function is called with the card
        // this._api_get('/boards/public/cards', (response) => {
        //     callback(response);
        // });
    },

    createNewCard: function (cardTitle, column, order, callback)
    {
        let newCardData = { "name": cardTitle, "column": column, "order": order }

        // creates new card, saves it and calls the callback function with its data
        this._api_post('/boards/public/cards', newCardData, (response) => {
            callback(response);
        });
    },

    updateCard: function (id, cardName, column, order, callback)
    {
        let updatedCardData = { "id": id, "name": cardName, "column": column, "order": order }

        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/public/cards', updatedCardData, (response) => {
            callback(response);
        });
    },

    deleteCard: function (cardId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/public/cards/${cardId}`, (response) => {
            callback(response);
        });
    },

    getCardsByBoardIdPrivate: function (boardId, callback)
    {
        // the cards are retrieved and then the callback function is called with the cards
        this._api_get(`/boards/private/${boardId}`, (response) => {
            callback(response);
        });
    },

    getCardPrivate: function (cardId, callback)
    {
        // // the card is retrieved and then the callback function is called with the card
        // this._api_get('/boards/private/cards', (response) => {
        //     callback(response);
        // });
    },

    createNewCardPrivate: function (cardTitle, column, order, archived, callback)
    {
        let newCardData = { "name": cardTitle, "column": column, "order": order, "archived": archived }

        // creates new card, saves it and calls the callback function with its data
        this._api_post('/boards/private/cards', newCardData, (response) => {
            callback(response);
        });
    },

    updateCardPrivate: function (cardId, cardName, cardColumn, cardOrder, archived, callback)
    {
        let updatedCardData = { "id": cardId, "name": cardName, "column": cardColumn, "order": cardOrder, "archived": archived }

        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/private/cards', updatedCardData, (response) => {
            callback(response);
        });
    },

    deleteCardPrivate: function (cardId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/private/cards/${cardId}`, (response) => {
            callback(response);
        });
    },






    // here comes more features
};