import psycopg2
import json

conn=None
cursor=None

try:
    conn = psycopg2.connect(
            host="localhost",
            database="healthvisordb",
            user="postgres",
            password="password")

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM mainTable")
    records = cursor.fetchall()
    print(records[1][1])
except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)

finally:
    # closing database connection.
    if conn:
        cursor.close()
        conn.close()
        print("PostgreSQL connection is closed")