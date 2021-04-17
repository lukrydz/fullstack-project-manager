from flask import Flask, render_template, url_for, jsonify, request
from util import json_response

# this fixes the bug with non-loading JS files
import mimetypes
mimetypes.add_type('text/javascript', '.js')

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


# API SECTION

# user register and login section


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
    """

    login, password = request.json['login'], request.json['password']

    return "session_id" # string

@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    print(data_handler.get_cards_for_board(board_id))


    return data_handler.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
