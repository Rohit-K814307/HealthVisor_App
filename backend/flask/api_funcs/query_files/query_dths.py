def get_dths_data(location,apiurl="http://127.0.0.1:5000/sample-query"):
    import urllib.request, json

    with urllib.request.urlopen(apiurl) as url:
        data = (json.load(url)).get("dths")[1]

    output_vals=[]
    output_locs=[]
    output_weekof=[]
    output_ages=[]

    if location=="all":
        for i in range(len(data)):
            if (data[i].get('jurisdiction') != None and 
            "HHS" not in data[i].get('jurisdiction') and
            "United States" not in data[i].get('jurisdiction') and
            data[i].get('covid_19_deaths') != None and 
            data[i].get('age_group') != None and 
            data[i].get('influenza_deaths') != None and 
            data[i].get('pneumonia_deaths') != None):

                output_locs.append(data[i].get('jurisdiction'))

                output_vals.append({'covdths':data[i].get('covid_19_deaths'),
                'influenzadths':data[i].get('influenza_deaths'),
                'pneumoniadths':data[i].get('pneumonia_deaths')})

                output_weekof.append({'start_date':data[i].get('start_week'),
                'end_date':data[i].get('end_week')})

                output_ages.append(data[i].get('age_group'))
        return output_locs,output_vals,output_weekof,output_ages
    else:
        for i in range(len(data)):
            if (data[i].get('jurisdiction') in location  and 
            data[i].get('covid_19_deaths') != None and 
            data[i].get('age_group') != None and 
            data[i].get('influenza_deaths') != None and 
            data[i].get('pneumonia_deaths') != None):

                output_vals.append({'covdths':data[i].get('covid_19_deaths'),
                'influenzadths':data[i].get('influenza_deaths'),
                'pneumoniadths':data[i].get('pneumonia_deaths')})

                output_weekof.append({'start_date':data[i].get('start_week'),
                'end_date':data[i].get('end_week')})

                output_ages.append(data[i].get('age_group'))

        return output_vals,output_weekof,output_ages