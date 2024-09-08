import psycopg2
from psycopg2.extras import RealDictCursor

class Database:
    def __init__(self):
        self.conn = None

    def connect(self):
        try:
            self.conn = psycopg2.connect(
                host="localhost",
                database="postgres",  # Using the default 'postgres' database
                user="postgres",
                password="securepassword"  # Updated password for PostgreSQL setup
            )
            print("Database connection successful")
        except (Exception, psycopg2.Error) as error:
            print("Error while connecting to PostgreSQL", error)

    def disconnect(self):
        if self.conn:
            self.conn.close()
            print("Database connection closed")

    def execute_query(self, query, params=None):
        if not self.conn:
            raise Exception("Database not connected")

        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            if query.strip().upper().startswith("SELECT"):
                return cur.fetchall()
            else:
                self.conn.commit()

database = Database()
