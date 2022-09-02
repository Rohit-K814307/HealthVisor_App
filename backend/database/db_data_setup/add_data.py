import psycopg2
import json
from Get_data import Get_data as G

conn = None
cur = None

try:
    conn = psycopg2.connect(
        host="localhost",
        database="healthvisordb",
        user="postgres",
        password="password")
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS primarytable")
    print("connected")


    create_script = '''CREATE TABLE IF NOT EXISTS mainTable(
    id TEXT PRIMARY KEY,
    data jsonb)
    '''
    cur.execute(create_script)
    print("added table")

    #insert data with ids and json data
    podst,podstid = G.podst()
    cov19vac, cov19vacid = G.cov19vac()
    dths, dthsid = G.dths()
    adshstat,adshstatid = G.adshstat()
    medchars, medcharsid = G.medchars()
    covdths, covdthsid = G.covdths()
    print("data loaded")


    insert_data = "INSERT INTO maintable (id, data) VALUES (%s,%s)"

    data_params = [(podstid,json.dumps(podst)),(cov19vacid,json.dumps(cov19vac)),(dthsid,json.dumps(dths)),
    (adshstatid,json.dumps(adshstat)),(medcharsid,json.dumps(medchars)),(covdthsid,json.dumps(covdths))]
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
