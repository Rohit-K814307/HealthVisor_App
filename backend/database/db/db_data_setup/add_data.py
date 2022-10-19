import psycopg2
import json
import create_data

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


    create_script = '''CREATE TABLE IF NOT EXISTS mainTable(
    id TEXT PRIMARY KEY,
    data jsonb)
    '''
    cur.execute(create_script)
    print("added table")

    #insert data with ids and json data
    sent_data = create_data.make_data()
    id="data"
    print("data loaded")


    insert_data = "INSERT INTO maintable (id, data) VALUES (%s,%s)"

    data_params = [(id,json.dumps(sent_data))]
    for record in data_params:
        cur.execute(insert_data,record)


    #insert json data with steps based on conditions
    condition_data = create_data.prepare_data()
    id2="conditionSteps"

    insert_data2 = "INSERT INTO maintable (id, data) VALUES(%s,%s)"

    data_params2 = [(id2,json.dumps(condition_data))]
    for value in data_params2:
        cur.execute(insert_data2,value)


    #insert json data with condition description
    description_data = create_data.prepare_data_2()
    id3 = "descriptions"
    
    insert_data3 = "INSERT INTO maintable (id, data) VALUES(%s,%s)"

    data_params3 = [(id3,json.dumps(description_data))]
    for thing in data_params3:
        cur.execute(insert_data3,thing)


    print("inserted")

    conn.commit()
except Exception as error:
    print(error)
finally:
    if cur is not None:
        cur.close()
    if conn is not None:
        conn.close()
