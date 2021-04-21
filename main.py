from flask import Flask, render_template, url_for, jsonify, request
from util import json_response
import data_handler

# this fixes the bug with non-loading JS files
import mimetypes
mimetypes.add_type('text/javascript', '.js')


app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """

    return render_template('index.html')


# API SECTION

# user register and login section

@app.route("/login", methods=['GET'])
def login():
    return render_template('login.html')


@app.route("/register", methods=['GET'])
def registration():
    return render_template('register.html')


@app.route("/register", methods=['POST'])
def user_register():
    """
    Register a new user and store credentials in a database
    Returns OK if successful or user id

    TODO checking if user already exists
    TODO data validation
    """

    login, password = request.json['login'], request.json['password']
    registered = False

    if login and password:
        registered = data_handler.user_register(login, password)

    return jsonify(success=registered)



@app.route("/login", methods=['POST'])
def user_login():
    """
    Takes user login and password
    Returns session id
    TODO check if session already exists and don't generate new
    TODO garbage collector for expired sessions

    there is verify session for checking tokens

    """

    login, password = request.json['login'], request.json['password']

    if data_handler.check_credentials(login, password):
        return jsonify({'token': data_handler.open_session(login)})
    else:
        return jsonify({'msg': 'Invalid credentials.'})


@app.route("/boards/public", methods=['GET'])
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/boards/public", methods=['POST'])
def create_board():
    """
    Create boards
    """

    board_name = request.json['name']

    created_id = data_handler.create_board(name=board_name)['id']

    if created_id:
        return jsonify({'id': created_id})
    else:
        return jsonify({'msg': 'Database error while creating new board'})


@app.route("/boards/public", methods=['PUT'])
def update_board():
    """
    Update board by given ID
    TODO handle multi-element request
    """

    board_id = request.json['id']
    board_name = request.json['name']

    result = data_handler.update_board(board_id=board_id, board_name=board_name)

    return result


@app.route("/boards/public/<int:board_id>/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    fetched_cards = data_handler.get_cards_for_board(board_id=board_id)

    return fetched_cards


@app.route("/boards/public/cards", methods=['POST'])
@json_response
def new_card():
    """
    Add new card to the database
    """

    # name, public_column_id, order

    card_name = request.json['name']
    card_column = request.json['column']
    card_order = request.json['order']

    added_card_id = data_handler.new_card(card_name=card_name, card_column=card_column, card_order=card_order)

    return added_card_id

@app.route("/boards/public/columns", methods=['PUT'])
@json_response
def update_column():

    name = request.json['name']
    column_id = request.json['column_id']

    updated_column_id = data_handler.update_column(name=name,column_id=column_id )

@app.route("/boards/public/cards", methods=['PUT'])
@json_response
def update_card():
    """
    Update card to the database
    """

    # name, public_column_id, order

    card_id = request.json['id']
    card_name = request.json['name']
    card_column = request.json['column']
    card_order = request.json['order']

    updated_card_id = data_handler.update_card(card_id=card_id, card_name=card_name, card_column=card_column, card_order=card_order)

    return updated_card_id


@app.route("/boards/public/columns", methods=['POST'])
@json_response
def new_column():
    """
    Add new column to the database
    """

    # name, public_boards_id

    column_name = request.json['name']
    column_board = request.json['board_id']

    added_column_id = data_handler.new_column(name=column_name, board=column_board)

    return added_column_id


@app.route("/boards/public/<int:board_id>/columns")
@json_response
def get_columns_for_board(board_id: int):
    """
    All columns that belongs to a board
    :param board_id: id of the parent board
    """

    fetched_columns = data_handler.get_columns_for_board(board_id=board_id)

    return fetched_columns


@app.route("/boards/private", methods=['GET'])
@json_response
def get_boards_private(user_id):
    """
    All the boards
    """

    user_id = data_handler.verify_session(request.json['token'])

    if user_id:
        return data_handler.get_boards_private(user_id=user_id)


@app.route("/boards/private", methods=['POST'])
def create_board_private():
    """
    Create boards
    """

    user_id = data_handler.verify_session(request.json['token'])

    if not user_id:
        return {'msg': 'Session fault.'}

    board_name = request.json['name']

    created_id = data_handler.create_board_private(name=board_name, user_id=user_id)['id']

    if created_id:
        return jsonify({'id': created_id})
    else:
        return jsonify({'msg': 'Database error while creating new board'})


@app.route("/boards/private", methods=['PUT'])
@json_response
def update_board_private():
    """
    Update board by given ID
    TODO handle multi-element request
    """

    board_id = request.json['id']
    board_name = request.json['name']
    archived = request.json['archived']

    result = data_handler.update_board_private(board_id=board_id, board_name=board_name, archived=archived)

    return result

@app.route("/boards/private/cards", methods=['POST'])
@json_response
def new_card_private():
    """
    Add new card to the database
    """

    # name, column_id, order

    card_name = request.json['name']
    card_column = request.json['column']
    card_order = request.json['order']
    archived = request.json['archived']


    added_card_id = data_handler.new_card(card_name=card_name, card_column=card_column, card_order=card_order, archived=archived)

    return added_card_id

@app.route("/boards/private/<int:board_id>/columns")
@json_response
def get_columns_for_board_private(board_id: int):
    """
    All columns that belongs to a board
    :param board_id: id of the parent board
    """
    user_id = request.json['user_id']
    fetched_columns = data_handler.get_columns_for_board(board_id=board_id, user_id=user_id)

    return fetched_columns

@app.route("/boards/private/cards", methods=['PUT'])
@json_response
def update_card_private():
    """
    Update card to the database
    """

    # name, public_column_id, order

    card_id = request.json['id']
    card_name = request.json['name']
    card_column = request.json['column']
    card_order = request.json['order']
    archived = request.json['archived']

    updated_card_id = data_handler.update_card(card_id=card_id, card_name=card_name, card_column=card_column, card_order=card_order, archived=archived)

    return updated_card_id

@app.route("/boards/private/<int:board_id>/")
@json_response
def get_cards_for_board_private(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    fetched_cards = data_handler.get_cards_for_board_private(board_id=board_id)

    return fetched_cards


@app.route("/boards/public/delete/<int:board_id>/", methods=['DELETE'])
def delete_board(board_id: int):

    deleted_board = data_handler.delete_board(board_id=board_id)

    return deleted_board


@app.route("/boards/private/delete/<int:board_id>/", methods=['DELETE'])
def delete_board_private(board_id: int):
    deleted_board = data_handler.delete_board_private(board_id=board_id)

    return deleted_board

@app.route("/columns/public/delete/<int:column_id>/", methods=['DELETE'])
def delete_column(column_id:int):
    deleted_column = data_handler.delete_column(column_id)

    return deleted_column


@app.route("/columns/private/delete/<int:column_id>/", methods=['DELETE'])
def delete_column_private(column_id: int):
    deleted_column = data_handler.delete_column_private(column_id)

    return deleted_column

@app.route("/cards/public/delete/<int:card_id>", methods=['DELETE'])
def delete_card(card_id: int):

    deleted_card = data_handler.delete_card(card_id)

    return deleted_card

@app.route("/column/private/update", methods=['PUT'])
def update_column_private():

    name = request.json['name']
    column_id = request.json['id']


    updated_column = data_handler.update_column_private(name=name,column_id=column_id)

    return updated_column


@app.route("/cards/private/delete/<int:card_id>", methods=['DELETE'])
def delete_card_private(card_id: int):
    deleted_card = data_handler.delete_card_private(card_id)

    return deleted_card


@app.route("/boards/public/columns", methods=['PUT'])
@json_response
def update_column():
    """
    Update column in the database
    """

    # name, public_boards_id

    column_id = request.json['id']
    column_name = request.json['name']
    column_board = request.json['board_id']

    added_column_id = data_handler.update_column(column_id=column_id, name=column_name, board=column_board)

    return added_column_id

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
