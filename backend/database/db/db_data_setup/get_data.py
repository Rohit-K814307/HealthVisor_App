class Get_data:
    def __init__(self,api_key):

        #import the modules
        import requests
        import json

        #get the data from the soda api
        self.response = requests.get(api_key)
        self.data = self.response.text
        self.loaded = json.loads(self.data)

    #functions for different 
    def podst():
        return Get_data("https://data.cdc.gov/resource/s2qv-b27b.json").loaded, "podst"
    
    def cov19vac():
        return Get_data("https://data.cdc.gov/resource/8xkx-amqh.json").loaded, "cov19vac"
    
    def dths():
        return Get_data("https://data.cdc.gov/resource/ynw2-4viq.json").loaded, "dths"

    def adshstat():
        return Get_data("https://data.cdc.gov/resource/25m4-6qqq.json").loaded, "adshstat"

    def medchars():
        return Get_data("https://data.cdc.gov/resource/2g8y-scu5.json").loaded, "medchars"

    def covdths():
        return Get_data("https://data.cdc.gov/resource/k8wy-p9cg.json").loaded, "covdths"
