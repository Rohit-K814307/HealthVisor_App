import psycopg2
import json

conn = psycopg2.connect(
            host="localhost",
            database="healthvisordb",
            user="postgres",
            password="password")

cursor = conn.cursor()

def basic_response():
    try:
        conn = psycopg2.connect(
                host="localhost",
                database="healthvisordb",
                user="postgres",
                password="password")

        cursor = conn.cursor()

        cursor.execute("SELECT * FROM mainTable")
        records = cursor.fetchall()

        return records

    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)

    finally:
        # closing database connection.
        if conn:
            cursor.close()
            conn.close()