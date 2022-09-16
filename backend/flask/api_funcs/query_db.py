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

        podst = records[0]
        cov19vac = records[1]
        dths = records[2]
        adshstat = records[3]
        medchars = records[4]
        covdths = records[5]

        return podst,cov19vac,dths,adshstat,medchars,covdths

    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)

    finally:
        # closing database connection.
        if conn:
            cursor.close()
            conn.close()