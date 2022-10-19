import tensorflow_text as text
from bert import tokenization
from tensorflow import keras
import numpy as np
import pandas as pd
import tensorflow as tf
tf.gfile = tf.io.gfile
import tensorflow_hub as hub
from sklearn.utils import resample
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from official.nlp import optimization
import os
from nltk.tokenize import word_tokenize
import re

def model(metrics):

    text_input = tf.keras.layers.Input(shape=(), dtype=tf.string)
    preprocessor = hub.KerasLayer(
        "https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3")
    
    encoder_inputs = preprocessor(text_input)
    encoder = hub.KerasLayer(
        "https://tfhub.dev/tensorflow/bert_en_uncased_L-12_H-768_A-12/4",
        trainable=True)
    
    outputs = encoder(encoder_inputs)
    pooled_output = outputs["pooled_output"] 
    sequence_output = outputs["sequence_output"]

    clf_output = sequence_output[:, 0, :]
    net = tf.keras.layers.Dense(32, activation='relu')(clf_output)
    net = tf.keras.layers.Dropout(0.2)(net)
    out = tf.keras.layers.Dense(41, activation='softmax')(net)
    
    model = tf.keras.models.Model(inputs=text_input, outputs=out)
    model.compile(tf.keras.optimizers.Adam(lr=1e-5), loss='categorical_crossentropy', metrics=metrics)
    
    return model

def encoded_mapping_func():
    encoded_mapping = {0: '(vertigo) Paroymsal  Positional Vertigo',
    1: 'AIDS',
    2: 'Acne',
    3: 'Alcoholic hepatitis',
    4: 'Allergy',
    5: 'Arthritis',
    6: 'Bronchial Asthma',
    7: 'Cervical spondylosis',
    8: 'Chicken pox',
    9: 'Chronic cholestasis',
    10: 'Common Cold',
    11: 'Dengue',
    12: 'Diabetes ',
    13: 'Dimorphic hemmorhoids(piles)',
    14: 'Drug Reaction',
    15: 'Fungal infection',
    16: 'GERD',
    17: 'Gastroenteritis',
    18: 'Heart attack',
    19: 'Hepatitis B',
    20: 'Hepatitis C',
    21: 'Hepatitis D',
    22: 'Hepatitis E',
    23: 'Hypertension ',
    24: 'Hyperthyroidism',
    25: 'Hypoglycemia',
    26: 'Hypothyroidism',
    27: 'Impetigo',
    28: 'Jaundice',
    29: 'Malaria',
    30: 'Migraine',
    31: 'Osteoarthristis',
    32: 'Paralysis (brain hemorrhage)',
    33: 'Peptic ulcer diseae',
    34: 'Pneumonia',
    35: 'Psoriasis',
    36: 'Tuberculosis',
    37: 'Typhoid',
    38: 'Urinary tract infection',
    39: 'Varicose veins',
    40: 'hepatitis A'}

    return encoded_mapping

def clean_data(data):
    cleaned = []
 
    for line in data:
        line = line.lower() #makes it lowercase
 
        line = re.sub(r"[,.\"\'!@#$%^&*(){}?/;`~:<>+=-\\]", "", line) #takes out any symbols
 
        tokens = word_tokenize(line)
 
        words = [word for word in tokens if word.isalpha()] #check if only letters (no special chars/symbols)
 
        cleaned += words
 
    return cleaned


def new_pred(model,model_input,encoded_mapping):

    inp = clean_data(model_input)
    prediction = model.predict(inp)
    pred = np.array(prediction)

    #print(prediction)

    #print("_______")
    #print(pred)

    out = {}
    for i in range(len(pred)):
        max3 = np.argpartition(pred[i], -3)[-3:]

        for j in range(len(max3)):
            out["condition_"+str(j)] = encoded_mapping.get(max3[j])
            out["confidence_"+str(j)] = round((pred[i][max3[j]]) * 100)

    return out

def load_model(weights_dir):
    
    METRICS = [
        tf.keras.metrics.BinaryAccuracy(name='accuracy'),
        tf.keras.metrics.Precision(name='precision'),
        tf.keras.metrics.Recall(name='recall')
    ]
    bert_model = model(METRICS)
    bert_model.load_weights(weights_dir).expect_partial()

    return bert_model
    

def make_pred(inputVal,encoded_mapping,model):

    model_input = [inputVal]

    bert_model = model

    outVal = new_pred(bert_model,model_input,encoded_mapping)

    return outVal