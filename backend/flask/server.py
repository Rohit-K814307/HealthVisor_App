from flask import Flask
from api_funcs import query_db
from api_funcs import params

from api_funcs.query_files import query_podst
from api_funcs.query_files import query_dths
from api_funcs.query_files import query_medchars
from api_funcs.query_files import query_covdths

app = Flask(__name__)

"""

API ENDPOINTS BELOW

"""

#sample query for any dataset
@app.route("/sample-query")
def samplequery():
    podst, cov19vac, dths, adshstat, medchars, covdths = query_db.basic_response()
    return {"podst":podst, "cov19vac":cov19vac, "dths":dths, "adshstat":adshstat, "medchars":medchars, "covdths":covdths}

################################################################################

#return us the podst data:
@app.route("/podst/<string:year>/<string:locationabbr>")
def podst(year:str, locationabbr:str):
    if locationabbr != "all":
        location = params.paramizer(locationabbr)
    else:
        location = locationabbr
    output, loc = query_podst.get_podst_data(year=year,locationabbr=location)
    return {"vals":output,"loc":loc}

    

################################################################################

#return us the cov19vac data:
@app.route("/cov19vac")
def cov19vac():
    pass
    

################################################################################

#return us the dths data:
@app.route("/dths/<string:location>")
def dths(location:str):
    if location != "all":
        locationval = params.paramizer(location)
        output_vals,output_weekof,output_ages = query_dths.get_dths_data(location=locationval)
        
        return {"values":output_vals,"dates":output_weekof,"ages":output_ages}
        
    else:
        locationval = location
        output_locs,output_vals,output_weekof,output_ages = query_dths.get_dths_data(location=locationval)

        return {"values":output_vals,"locations":output_locs,
        "dates":output_weekof,"ages":output_ages}

################################################################################

#return us the adshstat data
@app.route("/adshstat")
def adshstat():
    pass

################################################################################

#return us the medchars data
@app.route("/medchars/<string:year>")
def medchars(year):
    if year != "all":
        yearval = params.paramizer(year)
        output_vals,output_age,output_units,output_year = query_medchars.get_medchars_data(year=yearval)
        
        return {'vals':output_vals,'age':output_age,'unit':output_units,'year':output_year}
        
    else:
        yearval = year
        output_vals,output_age,output_units,output_year = query_medchars.get_medchars_data(year=yearval)
        
        return {'vals':output_vals,'age':output_age,'unit':output_units,'year':output_year}



    

################################################################################

#return us the covdths data
@app.route("/covdths")
def covdths():
    output_vals,output_locs,output_times = query_covdths.get_covdths_data()

    return {'values':output_vals,'locations':output_locs,
    'start_to_end_times':output_times}

################################################################################






if __name__ == "__main__":
    app.run(debug=True)