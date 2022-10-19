import React from 'react';
import './prediction_analysis.css';
import { useState, useEffect } from "react";
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


async function apiCalls(handle) {

    
    const url = "http://192.168.4.56:9999/";

    const condits1 = {steps:[]}
    const condits2 = {steps:[]}
    const condits3 = {steps:[]}


    const desc1 = {descr:""}
    const desc2 = {descr:""}
    const desc3 = {descr:""}

    const arr = [handle.confidence1, handle.confidence2, handle.confidence3];
    const max = Math.max(...arr)

    var conditionVal = " "
    if (max==handle.confidence1) {
        conditionVal = handle.condition1;
    } else if (max==handle.confidence2){
        conditionVal = handle.condition2;
    } else {
        conditionVal = handle.condition3;
    }

    await fetch(url + "description-data/" + handle.condition1).then((res) =>
        res.json().then((description) => {
            // Setting a data from api
            desc1.descr = description.description;
            console.log(description);
        })
    );

    await fetch(url + "description-data/" + handle.condition2).then((res) =>
        res.json().then((description) => {
            // Setting a data from api
            desc2.descr = description.description;
            console.log(description);
        })
    );

    await fetch(url + "description-data/" + handle.condition3).then((res) =>
        res.json().then((description) => {
            // Setting a data from api
            desc3.descr = description.description;
            console.log(description);
        })
    );

    await fetch(url + "condition-steps/" + handle.condition1).then((res) =>
        res.json().then((conditionSteps) => {
            // Setting a data from api
            condits1.steps = conditionSteps;
            console.log(conditionSteps);
        })
    );

    await fetch(url + "condition-steps/" + handle.condition2).then((res) =>
        res.json().then((conditionSteps) => {
            // Setting a data from api
            condits2.steps = conditionSteps;
        })
    );
    
    function generateSteps() {
        var parent = document.getElementById("steps");
        var first_steps = document.createElement("div");
        first_steps.className="steps-1";

        var firstStepsHeader = document.createElement("h3");
        firstStepsHeader.innerHTML = conditionVal;
        first_steps.appendChild(firstStepsHeader)

        if (conditionVal == handle.condition1) {
            var desc = document.createElement("p");
            desc.innerHTML = desc1.descr;
            
            first_steps.appendChild(desc)

            var stepul1 = document.createElement("ul");
            for (var i = 0; i<condits1.steps.steps.length;i++) {
                console.log("gnaru");
                var step = document.createElement("li");
                var stepinfo = document.createTextNode(condits1.steps.steps[i])
                step.appendChild(stepinfo);
                stepul1.appendChild(step);
            }
            first_steps.appendChild(stepul1);
            parent.appendChild(first_steps);



            var second_steps = document.createElement("div");
            second_steps.className="steps-2";

            var secondStepsHeader = document.createElement("h3");
            secondStepsHeader.innerHTML = handle.condition2;
            second_steps.appendChild(secondStepsHeader)
            var desc_2 = document.createElement("p");
            desc_2.innerHTML = desc2.descr;
            
            second_steps.appendChild(desc_2)

            var stepul2 = document.createElement("ul");
            for (var j = 0; j<condits2.steps.steps.length;j++) {
                console.log("gnaru");
                var step2 = document.createElement("li");
                var step2info = document.createTextNode(condits2.steps.steps[j])
                step2.appendChild(step2info)
                stepul2.appendChild(step2);
            }
            second_steps.appendChild(stepul2);
            parent.appendChild(second_steps);



            var third_steps = document.createElement("div");
            third_steps.className="steps-3";

            var thirdStepsHeader = document.createElement("h3");
            thirdStepsHeader.innerHTML = handle.condition3;
            third_steps.appendChild(thirdStepsHeader)
            var desc_3 = document.createElement("p");
            desc_3.innerHTML = desc3.descr;
            
            third_steps.appendChild(desc_3)

            var stepul3 = document.createElement("ul");
            for (var k = 0; k<condits3.steps.steps.length;k++) {
                console.log("gnaru");
                var step3 = document.createElement("li");
                var step3info = document.createTextNode(condits3.steps.steps[k])
                step3.appendChild(step3info)
                stepul3.appendChild(step3);
            }
            third_steps.appendChild(stepul3);
            parent.appendChild(third_steps);

        }
        

        if (conditionVal == handle.condition2) {
            var desc = document.createElement("p");
            desc.innerHTML = desc2.descr;
            
            first_steps.appendChild(desc)

            var stepul1 = document.createElement("ul");
            for (var i = 0; i<condits2.steps.steps.length;i++) {
                console.log("gnaru");
                var step = document.createElement("li");
                var stepinfo = document.createTextNode(condits2.steps.steps[i])
                step.appendChild(stepinfo)
                stepul1.appendChild(step);
            }
            first_steps.appendChild(stepul1);
            parent.appendChild(first_steps);



            var second_steps = document.createElement("div");
            second_steps.className="steps-2";

            var secondStepsHeader = document.createElement("h3");
            secondStepsHeader.innerHTML = handle.condition1;
            second_steps.appendChild(secondStepsHeader)
            var desc_2 = document.createElement("p");
            desc_2.innerHTML = desc1.descr;
            
            second_steps.appendChild(desc_2)

            var stepul2 = document.createElement("ul");
            for (var j = 0; j<condits1.steps.steps.length;j++) {
                console.log("gnaru");
                var step2 = document.createElement("li");
                var step2info = document.createTextNode(condits1.steps.steps[j])
                step2.appendChild(step2info)
                stepul2.appendChild(step2);
            }
            second_steps.appendChild(stepul2);
            parent.appendChild(second_steps);



            var third_steps = document.createElement("div");
            third_steps.className="steps-3";

            var thirdStepsHeader = document.createElement("h3");
            thirdStepsHeader.innerHTML = handle.condition3;
            third_steps.appendChild(thirdStepsHeader)
            var desc_3 = document.createElement("p");
            desc_3.innerHTML = desc3.descr;
            
            third_steps.appendChild(desc_3)

            var stepul3 = document.createElement("ul");
            for (var k = 0; k<condits3.steps.steps.length;k++) {
                console.log("gnaru");
                var step3 = document.createElement("li");
                var step3info = document.createTextNode(condits3.steps.steps[k])
                step3.appendChild(step3info)
                stepul3.appendChild(step3);
            }
            third_steps.appendChild(stepul3);
            parent.appendChild(third_steps);

            
        }

        if (conditionVal == handle.condition3) {
            var desc = document.createElement("p");
            desc.innerHTML = desc3.descr;
            
            first_steps.appendChild(desc)

            var stepul1 = document.createElement("ul");
            for (var i = 0; i<condits3.steps.steps.length;i++) {
                console.log("gnaru");
                var step = document.createElement("li");
                var stepinfo = document.createTextNode(condits3.steps.steps[i])
                step.appendChild(stepinfo)
                stepul1.appendChild(step);
            }
            first_steps.appendChild(stepul1);
            parent.appendChild(first_steps);



            var second_steps = document.createElement("div");
            second_steps.className="steps-2";

            var secondStepsHeader = document.createElement("h3");
            secondStepsHeader.innerHTML = handle.condition2;
            second_steps.appendChild(secondStepsHeader)
            var desc_2 = document.createElement("p");
            desc_2.innerHTML = desc2.descr;
            
            second_steps.appendChild(desc_2)

            var stepul2 = document.createElement("ul");
            for (var j = 0; j<condits2.steps.steps.length;j++) {
                console.log("gnaru");
                var step2 = document.createElement("li");
                var step2info = document.createTextNode(condits2.steps.steps[j])
                step2.appendChild(step2info)
                stepul2.appendChild(step2);
            }
            second_steps.appendChild(stepul2);
            parent.appendChild(second_steps);



            var third_steps = document.createElement("div");
            third_steps.className="steps-3";

            var thirdStepsHeader = document.createElement("h3");
            thirdStepsHeader.innerHTML = handle.condition1;
            third_steps.appendChild(thirdStepsHeader)
            var desc_3 = document.createElement("p");
            desc_3.innerHTML = desc1.descr;
            
            third_steps.appendChild(desc_3)

            var stepul3 = document.createElement("ul");
            for (var k = 0; k<condits1.steps.steps.length;k++) {
                console.log("gnaru");
                var step3 = document.createElement("li");
                var step3info = document.createTextNode(condits1.steps.steps[k])
                step3.appendChild(step3info)
                stepul3.appendChild(step3);
            }
            third_steps.appendChild(stepul3);
            parent.appendChild(third_steps);
        }
    }
    await fetch(url + "condition-steps/" + handle.condition3).then((res) =>
        res.json().then((conditionSteps) => {
            // Setting a data from api
            condits3.steps = conditionSteps;
            generateSteps();
        })
    );

     

    const doctorFound = {vals:[]};
    await fetch(url + "find-doctor/" + handle.city + "/" + handle.state).then((res) =>
        res.json().then((doctorFind) => {
            // Setting a data from api
            doctorFound.vals = doctorFind.response;
            console.log(doctorFound)
        })
    );

    // create the prediction section

    var prediction = document.createElement("p");
    prediction.innerHTML = "Your predicted condition is: " + conditionVal;
    prediction.className="predtext";
    document.getElementById("pred-analysis").appendChild(prediction);

    const data = {
        labels: [
            handle.condition1,
            handle.condition2,
            handle.condition3
        ],
        datasets: [{
            label: 'Machine Learning Analysis Breakdown',
            data: [handle.confidence1,handle.confidence2,handle.confidence3],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {cutout: "80%",responsive:true, plugins:{legend:{position:"bottom",align:"start",labels:{padding:10}}}}
      };

    const myChart = new Chart(
        document.getElementById('predictionChart'),
        config
    );

    
    
    //create the doctors stuff and add it to the div
    
    console.log("doctorfound vals!");
    console.log(doctorFound.vals);
    var info = doctorFound.vals;
    var doctorDiv = document.getElementById("doctors-analysis");
    var doctorInfo = document.createElement("div");
    

    
    var doctimg = document.createElement('img');
    doctimg.src = "https://i.pinimg.com/736x/83/fb/72/83fb722ec6a28bb416207c4d4cc91e4d.jpg";
    doctimg.className="drimg";

    
    var createdDiv = "";
    for (var i = 0; i < info.length; i++) {
        createdDiv = document.createElement('ul');
        createdDiv.className = "doctorVal";
        

        var doctimgdiv = document.createElement("div");
        doctimgdiv.className="drimgcont";
        doctimgdiv.appendChild(doctimg);
        var drimg = document.createElement('li');
        drimg.appendChild(doctimgdiv);


        var nam = document.createElement('li');
        nam.innerHTML = info[i].name;

        var addr = document.createElement('li');
        addr.innerHTML = info[i].roadAdress + ", " + info[i].city + ", " + info[i].state;

        var rol = document.createElement('li');
        rol.innerHTML = "Doctor specializes in: " + info[i].role;

        createdDiv.appendChild(drimg);
        createdDiv.appendChild(nam);
        createdDiv.appendChild(addr);
        createdDiv.appendChild(rol);
        doctorInfo.appendChild(createdDiv);
    
    }

    doctorDiv.appendChild(doctorInfo); 
    
    return [condits1,condits2,condits3,desc1,desc2,desc3];
}

export default function Prediction_analysis() {

    const handle = useParams();
    
    const val = apiCalls(handle);
    
    
    

  
    return (

        <div className="pred-analysis-cont">
            <h1 className="page-header">Patient Analysis</h1>

            <div className="sidebyside">


                <div id="pred-analysis" className="floatchild pred">
                    <h2 className="pred-header">Diagnosis Profile</h2>
                    <canvas id= 'predictionChart' width="20" height="20" className="chart-canvas"></canvas>
                </div>

                <div id="steps-analysis" className="floatchild steps">
                    <h2 className="steps-header">Reccomended Steps</h2>
                    <div id="steps" className="stepsVals">
                    </div>
                </div>

            </div>

            <div id="doctors-analysis" className="doctors">
                <h2 className="doctors-header">Nearby Doctors</h2>
                <div className="drimgcont">
                </div>
            </div>

        </div>
    );
}