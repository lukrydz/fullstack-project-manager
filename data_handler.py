import connection
import persistence  # TODO this is gonna be deleted soon
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
    def add_user_to_base(cursor, username, hashed_pw):

        query = """
                INSERT INTO users (password, login_email)
                VALUES (%(password)s, %(login)s)
        """
        cursor.execute(query, {'password': hashed_pw, 'login': username})

    add_user_to_base(username=username, hashed_pw=hashed_pw)

    return True


def check_credentials(login, password):

    @connection.connection_handler
    def check_for_login(cursor, login):
        query = """
            SELECT login_email, password FROM users
            WHERE login_email = %(login)s        
        """
        cursor.execute(query, {'login': login})
        return cursor.fetchone()

    credentials = check_for_login(login=login)

    if credentials:
        pw_hash = credentials['password']
        return util.verify_password(password, pw_hash)
    else:
        return False


def open_session(login):
    session_id = str(util.generate_uuid())
    expiration_date = util.get_expiration(30)

    @connection.connection_handler
    def save_session_info(cursor, login, session_id):
        query = """
            INSERT INTO sessions (user_id, session_id, expiration_date)
            VALUES ((SELECT user_id FROM users WHERE login_email = %(login)s), %(session_id)s, %(expiration_date)s)
        """
        cursor.execute(query, {'login': login, 'session_id': session_id, 'expiration_date': expiration_date})

    save_session_info(login=login, session_id=session_id)

    return session_id


def verify_session(token):

    @connection.connection_handler
    def lookup_session(cursor, session_id):
        query = """
                SELECT user_id, username, expiration_date FROM sessions
                INNER JOIN users ON sessions.user_id = users.id
                WHERE session_id = %(session_id)s
        """
        cursor.execute(query, {'session_id': session_id})
        return cursor.fetchone()

    @connection.connection_handler
    def purge_session(cursor, session_id):
        query = """
                DELETE FROM sessions
                WHERE session_id = %(session_id)s
        """
        cursor.execute(query, {'session_id': session_id})

    if lookup_session(session_id=token):
        session_data = lookup_session(session_id=token)

        if session_data['expiration_date'] < util.get_timestamp():
            purge_session(session_id=token)
            return False

        return session_data['user_id'], session_data['username']

    else:
        return False
