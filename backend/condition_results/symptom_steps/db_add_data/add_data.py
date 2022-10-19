import psycopg2
import json
import prepare_data

conn = None
cur = None

try:
    conn = psycopg2.connect(
        host="localhost",
        database="healthvisordb",
        user="postgres",
        password="password")
    cur = conn.cursor()
    print("connected")


    create_script = '''CREATE TABLE IF NOT EXISTS conditionStepsTable(
    id TEXT PRIMARY KEY,
    data jsonb)
    '''
    cur.execute(create_script)
    print("added table")

    #insert data with ids and json data
    symptoms_data = prepare_data.prepare_data()
    id="conditionSteps"
    print(symptoms_data)
    print("data loaded")


    insert_data = "INSERT INTO maintable (id, data) VALUES (%s,%s)"

    data_params = [(id,json.dumps(symptoms_data))]
    for record in data_params:
        cur.execute(insert_data,record)

    print("inserted")






    conn.commit()
except Exception as error:
    print(error)
finally:
    if cur is not None:
        cur.close()
    if conn is not None:
        conn.close()

