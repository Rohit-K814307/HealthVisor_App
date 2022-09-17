def get_podst_data(year,locationabbr,apiurl="http://127.0.0.1:5000/sample-query"):
    import urllib.request, json

    with urllib.request.urlopen(apiurl) as url:
        data = (json.load(url)).get("podst")[1]

    output_vals = []
    output_locs= []
    output_years=[]
    

    if year == "all" and locationabbr != "all":
        for i in range(len(data)):
            if data[i].get('locationabbr') in locationabbr and data[i].get('data_value') != None:
                output_vals.append(float(data[i].get('data_value')))
                output_locs.append(data[i].get('locationabbr'))
                output_years.append(data[i].get('year'))
        return output_vals,output_locs,output_years

    elif locationabbr == "all" and year != "all" :
        for i in range(len(data)):
            if data[i].get('year') in year and data[i].get('data_value') != None and "HHS" not in data[i].get('locationabbr'):
                output_vals.append(float(data[i].get('data_value')))
                output_locs.append(data[i].get('locationabbr'))
                output_years.append(data[i].get('year'))
        return output_vals, output_locs,output_years


    elif locationabbr == "all" and year == "all":
        for i in range(len(data)):
            if data[i].get('data_value') != None and "HHS" not in data[i].get('locationabbr'):
                output_vals.append(float(data[i].get('data_value')))
                output_locs.append(data[i].get('locationabbr'))
                output_years.append(data[i].get('year'))
        return output_vals,output_locs,output_years
            

    else:
        for i in range(len(data)):
            if data[i].get('year') in year and data[i].get('locationabbr') in locationabbr and data[i].get('data_value') != None:
                output_vals.append(float(data[i].get('data_value')))
                output_locs.append(data[i].get('locationabbr'))
        return output_vals,output_locs,output_years