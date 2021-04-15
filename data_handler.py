import connection
import persistence # TODO this is gonna be deleted soon
import util


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards(force=True)


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def user_register(username, password):

    hashed_pw = util.hash_password(password)

    @connection.connection_handler
    def adduserToBase(cursor, username, hashed_pw):

        query = """
                INSERT INTO users (password, login_email)
                VALUES (%(password)s, %(login)s)
        """
        cursor.execute(query, {'password': hashed_pw, 'login': username})

    adduserToBase(username=username, hashed_pw=hashed_pw)

    return True