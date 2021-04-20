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
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback)
    {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_put: function (url, data, callback)
    {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(data)
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


    ///  USER PART  ///


    loginUser: function (userData, callback)
    {
        // creates new card, saves it and calls the callback function with token
        this._api_post('/login', userData,(response) => {
            this._data['token'] = response;
            callback(response);
        });
    },

    createNewUser: function (userData, callback)
    {
        // creates new user, saves it and calls the callback function with an answer
        this._api_post('/register', userData, (response) => {
            this._data['answer'] = response;
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
            this._data['boards'] = response;
            callback(response);
        });
    },

    getBoard: function (boardId, callback)
    {
        // // the board is retrieved and then the callback function is called with the board
        // this._api_get(`/boards/public/${boardId}`, (response) => {
        //     this._data['boards'] = response;
        //     callback(response);
        // });
    },

    createNewBoard: function (boardTitle, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/boards/public', boardTitle, (response) => {
            this._data['id'] = response;
            callback(response);
        });
    },

    renameBoard: function (updatedBoardData, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/public', updatedBoardData, (response) => {
            this._data['updated_board'] = response;
            callback(response);
        });
    },

    deleteBoard: function (boardId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/public/${boardId}`, (response) => {
            this._data['confirmation'] = response;
            callback(response);
        });
    },


    ///  STATUSES/COLUMNS PART  ///


    getStatuses: function (boardId, callback)
    {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get(`/boards/public/${boardId}/columns`, (response) => {
            this._data['statuses'] = response;
            callback(response);
        });
    },

    getStatus: function (statusId, callback)
    {
        // the status is retrieved and then the callback function is called with the status
        // this._api_get('/boards/public', (response) => {
        //     this._data['statuses] = response;
        //     callback(response);
        // });
    },

    createNewStatus: function (newColumnData, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_post('/boards/public/columns', newColumnData, (response) => {
            this._data['id'] = response;
            callback(response);
        });
    },

    updateStatus: function (updatedStatusData, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/public/columns', updatedStatusData, (response) => {
            this._data['updated_status'] = response;
            callback(response);
        });
    },

    deleteStatus: function (columnId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/public/columns/${columnId}`, (response) => {
            this._data['confirmation'] = response;
            callback(response);
        });
    },


    ///  CARDS PART  ///


    getCardsByBoardId: function (boardId, callback)
    {
        // the cards are retrieved and then the callback function is called with the cards
        this._api_get(`/boards/public/${boardId}`, (response) => {
            this._data['cards'] = response;
            callback(response);
        });
    },

    getCard: function (cardId, callback)
    {
        // // the card is retrieved and then the callback function is called with the card
        // this._api_get('/boards/public/cards', (response) => {
        //     this._data['cards'] = response;
        //     callback(response);
        // });
    },

    createNewCard: function (cardTitle, boardId, statusId, callback)
    {
        // creates new card, saves it and calls the callback function with its data
        this._api_post('/boards/public/cards', (response) => {
            this._data['id'] = response;
            callback(response);
        });
    },

    updateCard: function (updatedCardData, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_put('/boards/public/cards', updatedCardData, (response) => {
            this._data['updated_board'] = response;
            callback(response);
        });
    },

    deleteCard: function (cardId, callback)
    {
        // creates new board, saves it and calls the callback function with its data
        this._api_delete(`/boards/public/cards/${cardId}`, (response) => {
            this._data['confirmation'] = response;
            callback(response);
        });
    },






    // here comes more features
};
