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


@connection.connection_handler
def get_boards(cursor):
    """
    Gather all boards
    :return:
    """

    query = """
                    SELECT * FROM public_boards
            """
    cursor.execute(query)

    return cursor.fetchall()


@connection.connection_handler
def create_board(cursor, name):

    query = """
                    INSERT INTO public_boards (name)
                    VALUES (%(name)s)
                    RETURNING public_boards_id as id
            """
    cursor.execute(query, {'name': name})

    return cursor.fetchone()


@connection.connection_handler
def get_cards_for_board(cursor, board_id):

    query = """
                SELECT public_cards_id, public_cards.name, pc.name as column, "order" FROM public_cards
                INNER JOIN public_columns pc on pc.public_column_id = public_cards.public_column_id
                INNER JOIN public_boards pb on pc.public_boards_id = pb.public_boards_id
                WHERE pb.public_boards_id = %(board_id)s
                ORDER BY "order" ASC
    """

    cursor.execute(query, {'board_id': board_id})

    return cursor.fetchall()


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

