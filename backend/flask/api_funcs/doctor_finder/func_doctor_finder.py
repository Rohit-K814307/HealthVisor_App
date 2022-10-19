import requests

def get_auth_code(client_id,client_secret):
    params = {
    'app_user_id': 'rohitk',
    'client_id': client_id,
    'client_secret': client_secret,
    }
    response = requests.post('https://api.1up.health/user-management/v1/user/auth-code', params=params).json()
    return response.get("code")

def get_access_code(client_id,client_secret,auth_code):
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': auth_code,
        'grant_type': 'authorization_code',
    }
    response = requests.post('https://auth.1up.health/oauth2/token', data=data).json()
    return response.get("refresh_token"), response.get("access_token")

def refresh_access_code(client_id,client_secret,refresh_token):
    data = {
    'client_id': client_id,
    'client_secret': client_secret,
    'refresh_token': refresh_token,
    'grant_type': 'refresh_token',
    }
    response = requests.post('https://auth.1up.health/oauth2/token', data=data).json()
    return response.get("refresh_token"), response.get("access_token")

def get_total_data(access_token):
    url = "https://api.1up.health/fhir/dstu2/Practitioner?_public=true"
    payload={}
    headers = {
        'Authorization': 'Bearer ' + access_token
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    return response.json()

def query_data(city, state):

    client_id = "a4a19da1027bd432223f91d328c6b4b0"
    client_secret = "f2662a1b883f3020cef61d5b5c51fa7e"

    authorization = get_auth_code(client_id,client_secret)
    refresh_token, access_token = get_access_code(client_id,client_secret,authorization)
    data = get_total_data(access_token)

    #print("data found")
    
    responseValue = {"response":[]}

    for practitioner in data.get("entry"):

        #print('looping through practitioner')
        
        out = {}

        if 'resource' in list(practitioner.keys()):
            if 'address' in list(practitioner.get('resource').keys()):
                
                #print("address found")

                if 'state' in list(practitioner.get('resource').get('address')[0].keys()) and 'city' in list(practitioner.get('resource').get('address')[0].keys()):
                    
                    #print("state found")
                    
                    stateVal = practitioner.get('resource').get('address')[0].get('state')
                    cityVal = practitioner.get('resource').get('address')[0].get('city')

                    out['city'] = cityVal
                    out['state'] = stateVal

                if 'line' in list(practitioner.get('resource').get('address')[0].keys()):
                    
                    #print("line found")

                    roadAddress = practitioner.get('resource').get('address')[0].get('line')[0]

                    out['roadAdress'] = roadAddress

            if 'name' in list(practitioner.get('resource').keys()):
                

                #print("name found")
                
                if len(practitioner.get('resource').get('name').get("given")) > 1:

                    nameVal = str(practitioner.get('resource').get('name').get("given")[0]) + " " + str(practitioner.get('resource').get('name').get("given")[1]) + " " + str(practitioner.get('resource').get('name').get("family")[0])
                    
                else:
                    nameVal = str(practitioner.get('resource').get('name').get("given")) + " " + str(practitioner.get('resource').get('name').get("family")[0])
                

                

                if "suffix" in list(practitioner.get('resource').get('name').keys()):
                    nameVal += " " + practitioner.get('resource').get('name').get("suffix")[0]
                

                if "[" in nameVal:
                    nameVal = nameVal.replace("[", "")
                if "]" in nameVal:
                    nameVal = nameVal.replace("]", "")
                if "\'" in nameVal:
                    nameVal = nameVal.replace("\'","")
                
                out["name"] = nameVal


            if 'practitionerRole' in list(practitioner.get('resource').keys()):
                if 'display' in list(practitioner.get('resource').get('practitionerRole')[0].get('role').get('coding')[0].keys()):
                    

                    #print("role found")

                    role = practitioner.get('resource').get('practitionerRole')[0].get('role').get('coding')[0].get('display')
                    
                    out['role'] = role


        responseValue['response'].append(out)


    newResponse = {"response":[]}

    for entry in responseValue.get("response"):
        
        if city in entry.get('city') and state in entry.get('state'):
            
            #print(entry)
            newResponse['response'].append(entry)
        
        
    return newResponse