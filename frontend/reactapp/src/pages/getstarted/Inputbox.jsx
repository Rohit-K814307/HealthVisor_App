import React from 'react';
import './inputbox.css';
import { useState, useEffect } from "react";


async function getApi(inputValue,url) {

    await fetch(url + "predict/" + inputValue).then((res) =>
        res.json().then((modelOutput) => {
            // Setting a data from api
            console.log(modelOutput);

            var refurl = ("http://localhost:3000/prediction-analysis/" +
            modelOutput.prediction.condition_0 + "/"+
            modelOutput.prediction.confidence_0 +"/"+
            modelOutput.prediction.condition_1 + "/"+
            modelOutput.prediction.confidence_1 +"/"+
            modelOutput.prediction.condition_2 + "/"+
            modelOutput.prediction.confidence_2 + "/" +
            document.getElementById("state").value + "/" + 
            document.getElementById("city").value);

            window.location.href = refurl;
            //confidence:modelOutput.prediction.confidence}
        })
    );
}



export default function Inputbox() {

    
    const runModel = () => {

        var inputValue = document.getElementById("modelInput").value;
        inputValue=inputValue.replaceAll(" ","-");
        console.log(inputValue);
        const url = "http://192.168.4.56:9999/";

        
        const handle = getApi(inputValue, url);
        
    }


    return (
    <div className="modelInputWrapper">
        <h1 className="inputHeader">What Symptoms are You Feeling?</h1>
        <p className="inputHeaderExamples">
            Input a description such as "I feel 
            like I have a sore throat", or simply list your symptoms, 
            and our AI powered tool will find the condition you have. Make sure
            to include your location to find doctors near you!
        </p>

        <div className="inputBox">
            <input className="modelInputField" type="text" id="modelInput" name="modelInput"></input>

            <div className="city-state-parent">
                <div className="city-state-child state">
                    <h2 className="inputHeader">Input your State Abbreviation</h2>
                    <input className="modelInputField" type="text" id="state" name="state"></input>
                </div>

                <div className="city-state-child city">
                    <h2 className="inputHeader">Input your City or Town Name</h2>
                    <input className="modelInputField" type="text" id="city" name="city"></input>
                </div>
            </div>
        </div>

        <div className="buttonHolder">
            <button classname="imready" type="button" onClick={runModel}>Submit</button>
        </div>
    
    </div>
    
    );
}