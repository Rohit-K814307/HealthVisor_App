import pandas as pd
import sys
import random
import os
import re
import string
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
import random
#nltk.download()

def get_Values():
    data = pd.read_csv('csv_data/dataset.csv')

    diseases = []
    for i in range(len(data['Disease'])):
        diseases.append(data['Disease'][i])
    disease = set(diseases)

    return disease, data

def get_symptoms_for1(symptom_num,disease,data):
    symptoms = []
    strval = "Symptom_" + str(symptom_num)
    for i in range(len(data[strval])):
        if data["Disease"][i] == disease:

            if str(data[strval][i]) != "nan":
                symptoms.append((str(data[strval][i])).replace("_"," "))

    return symptoms


def get_symptoms_per_disease(diseaseSet,data):
    symptomDisease = {}

    out = []
    for h in diseaseSet:
        for k in range(1,18):
            out.extend(get_symptoms_for1(k,h,data))

        symptomDisease[h] = list(set(out))
        out=[] 

    return symptomDisease   

def randWords(inpList):
    randomWords = []

    randomVals = random.sample(range(0,len(inpList)-1), 3)
    for randomIdx in randomVals:
        randomWords.append(inpList[randomIdx])

    return randomWords

def makeSentence(randomWords):
    #list description
    listDesc = (randomWords[0] + ", " + 
    randomWords[1] + ", " + 
    randomWords[2])

    #vague description
    vagueDesc = ("I feel " + randomWords[0] + 
    " and I also feel like " + 
    randomWords[1] + " but I also feel like " + 
    randomWords[2] + ".")

    return listDesc, vagueDesc

def makeSentences(inpList):
    generated_sents = []

    for i in range(41):
        listDesc, vagueDesc = makeSentence(randWords(inpList))
        generated_sents.append(listDesc)
        generated_sents.append(vagueDesc)
    
    return generated_sents

#define a few helper funcs
def clean_data(data):
    cleaned = []
 
    for line in data:
        line = line.lower() #makes it lowercase
 
        line = re.sub(r"[,.\"\'!@#$%^&*(){}?/;`~:<>+=-\\]", "", line) #takes out any symbols
 
        tokens = word_tokenize(line)
 
        words = [word for word in tokens if word.isalpha()] #check if only letters (no special chars/symbols)
 
        cleaned += words
 
    return cleaned

def MCM(cleaned_sent, n_gram=1):
 
    markov_chain = {} #dictionary with keys for eventually calculating probability of the next move
 
    for i in range(len(cleaned_sent)-n_gram-1):
 
        curr_state, next_state = "", ""
 
        for j in range(n_gram):
 
            curr_state += cleaned_sent[i+j] + " "
            next_state += cleaned_sent[i+j+n_gram] + " "
 
        curr_state = curr_state[:-1]
        next_state = next_state[:-1]
 
        if curr_state not in markov_chain:
 
            markov_chain[curr_state] = {}
            markov_chain[curr_state][next_state] = 1
 
        else:
 
            if next_state in markov_chain[curr_state]:
 
                markov_chain[curr_state][next_state] += 1
 
            else:
                markov_chain[curr_state][next_state] = 1
   
    # calculating transition probabilities
    for curr_state, transition in markov_chain.items():
 
        total = sum(transition.values())
 
        for state, count in transition.items():
           
            markov_chain[curr_state][state] = count/total
       
    return markov_chain

def train_MCM(dOC):
    mcmConditions = {}
    
    conditions = list(dOC.keys())

    for condition in conditions:
        sents = (dOC.get(condition))

        model = MCM(sents)
        #print(model.keys())
        states = model.keys()
        modelVals = {}

        for state in list(states):
            modelVals[state] = model.get(state)

        mcmConditions[condition] = modelVals

    return mcmConditions

def gen_sent(model,max_words,symp):
 
    n = 0
    curr_state = symp
    next_state = None
 
    sent = ""
    sent+=curr_state+" "
 
    while n < max_words:
        next_state = random.choices(list(model[curr_state].keys()),
                                    list(model[curr_state].values()))
       
        curr_state = next_state[0]
        sent+=curr_state+" "
        n+=1
 
    return sent

def implement_sent_gen(model,arr):
    out = []
    for i in range(len(arr)):
        if arr[i] in model.keys():
            for j in range(30):
                    out.append(gen_sent(model,15,symp=arr[i]))
    print(len(out))      
    return out


def make_data():
    disease,data = get_Values()
    values = get_symptoms_per_disease(disease,data)

    values2 = {}
    for condition in list(values.keys()):
        words = values.get(condition)
        newarr = []
        for word in words:
            #print(word)
            word2 = word[1:]
            newarr.append(word2)
        values2[condition] = newarr

    diseaseSents = {}
    valueKeys = list(values2.keys())
    for disease in valueKeys:
        conditions = values2.get(disease)
        diseaseSents[disease] = makeSentences(conditions)

    allSymptoms = []
    for setsymps in list(values2.values()):
        for symptom in setsymps:
            allSymptoms.append(symptom)
    allSymptoms = set(allSymptoms)


    conditions = diseaseSents.keys()
    conditionSentences = {}
    for condition in conditions:
        sentences = diseaseSents.get(condition)
        conditionSentences[condition] = []
        
        cleaned_sent = clean_data(sentences)
        #print(cleaned_sent)
            
        conditionSentences[condition] += cleaned_sent

    
    mcms = train_MCM(conditionSentences)


    generated_sents = {}
    for condition in list(values.keys()):
        model = mcms.get(condition)
        symps = values2.get(condition)

        separatedSymps = []
        for symp in symps:
            separatedSymps += symp.split(" ")
        

        generated_sents[condition] = []

        for i in range(10):
            sentence = implement_sent_gen(model,separatedSymps)
            generated_sents[condition].extend(sentence)

    return generated_sents

    
def prepare_data():
    data = pd.read_csv("csv_data/symptom_precaution.csv")

    jsonData = {}

    dataNull = data.copy().isnull()

    for i in range(len(data["Disease"])):
        condition = data["Disease"][i]
        jsonData[condition] = []

        if dataNull["Precaution_1"][i] == False:
            jsonData[condition].append(data["Precaution_1"][i])
        else:
            pass

        if dataNull["Precaution_2"][i] == False:
            jsonData[condition].append(data["Precaution_2"][i])
        else:
            pass

        if dataNull["Precaution_3"][i] == False:
            jsonData[condition].append(data["Precaution_3"][i])
        else:
            pass

        if dataNull["Precaution_4"][i] == False:
            jsonData[condition].append(data["Precaution_4"][i])
        else:
            pass


    return jsonData

def prepare_data_2():
    data = pd.read_csv("csv_data/symptom_Description.csv")

    jsonData = {}

    dataNull = data.copy().isnull()

    for i in range(len(data["Disease"])):
        condition = data["Disease"][i]
        

        if dataNull["Description"][i] == False:
            jsonData[condition] = data["Description"][i]
        else:
            pass


    return jsonData