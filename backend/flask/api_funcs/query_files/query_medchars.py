def get_medchars_data(year,apiurl="http://127.0.0.1:5000/sample-query"):
    import urllib.request, json

    with urllib.request.urlopen(apiurl) as url:
        data = (json.load(url)).get("medchars")[1]


    output_vals=[]
    output_age=[]
    output_units=[]
    output_year=[]

    if year == "all":
        for i in range(len(data)):
            data[i]=data[i]
            if (data[i].get('estimate') !=None and data[i].get('age') != None
            and data[i].get('unit') != None and data[i].get('year') != None):

                output_vals.append(data[i].get('estimate'))
                output_age.append(data[i].get('age'))
                output_units.append(data[i].get('unit'))
                output_year.append(data[i].get('year'))

        return output_vals,output_age,output_units,output_year

        
    
    else:
        for i in range(len(data)):
            data[i]=data[i]
            if (data[i].get('estimate') !=None and data[i].get('age') != None
            and data[i].get('unit') != None and data[i].get('year') in year):

                output_vals.append(data[i].get('estimate'))
                output_age.append(data[i].get('age'))
                output_units.append(data[i].get('unit'))
                output_year.append(data[i].get('year'))
    
        return output_vals,output_age,output_units,output_year