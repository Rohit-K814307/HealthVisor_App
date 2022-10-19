from flask import Flask
from api_funcs import query_db
from flask_cors import CORS
from flask import Flask, jsonify
from api_funcs.condition_predict import load_model,encoded_mapping_func,make_pred
from api_funcs.doctor_finder.func_doctor_finder import query_data

model = load_model("api_funcs/model_weights/bert_weights")
encoded_mapping = encoded_mapping_func()

app = Flask(__name__)
CORS(app)

"""

API ENDPOINTS BELOW

"""

#bert model
@app.route("/predict/<string:text>")
def modelpredict(text:str):

    description1 = text.replace("-"," ")
    responseVal = make_pred(description1,encoded_mapping,model)

    return jsonify({"prediction":responseVal})

################################################################################

#symptom steps
@app.route("/condition-steps/<string:inputVal>")
def conditionSteps(inputVal:str):

    datavals = query_db.basic_response()
    symptomSteps = datavals[1][1]
    return jsonify({"steps":symptomSteps.get(inputVal)})

################################################################################

#query for the sentences dataset
@app.route("/sentence-data")
def sentenceData():
    datavals = query_db.basic_response()
    datavals = datavals[0][1]
    return jsonify({"data":datavals})

################################################################################

#query for the descriptions dataset
@app.route('/description-data/<string:condition>')
def descriptionData(condition:str):
    datavals = query_db.basic_response()
    descriptions = datavals[2][1]

    return jsonify({"description":descriptions.get(condition)})

################################################################################

#query api to get doctor based on condition, role, city, and state
@app.route('/find-doctor/<string:city>/<string:state>')
def findDoctor(city:str,state:str):

    stateVal = state[0:-1] + state[-1].lower()

    return jsonify(query_data(city, stateVal))


################################################################################

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True,port='9999',use_reloader=False)