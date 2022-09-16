def get_covdths_data(apiurl="http://127.0.0.1:5000/sample-query"):
    import urllib.request, json

    with urllib.request.urlopen(apiurl) as url:
        data = (json.load(url)).get("covdths")[1]

    output_vals=[]
    output_locs=[] #dict of state:val and county:val
    output_times=[]


    for i in range(len(data)):
        if (data[i].get('covid_19_deaths_total') != None and
        data[i].get('state') != None and data[i].get('county_name') != None
        and data[i].get('start_week') != None and data[i].get('end_week') != None):
            
            output_vals.append(data[i].get('covid_19_deaths_total'))

            output_locs.append({'State':data[i].get('state'),
            'County':data[i].get('county_name')})

            output_times.append({'Start':data[i].get('start_week'),
            'End':data[i].get('end_week')})
        
    return output_vals,output_locs,output_times
