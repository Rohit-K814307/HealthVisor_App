import React from 'react';
import { useState, useEffect } from "react";

function dolocs(elmts,select) {
    for (var i = 0; i < elmts.length; i++) {
        var optn = elmts[i];
        var el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);
    }
}

export default function Podst() {
    const [data, setdata] = useState({
        loc: "",
        vals: 0,
        year: "",
    });

    const [year,setYear] = useState("all");
    const [loc,setLoc] = useState("all");

    const handleChangeYear = (e) => {
        setYear(e.target.value);
      };
    
    const handleChangeLoc = (e) => {
        setLoc(e.target.value);
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/podst/" + year + `/` + loc).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    loc: data.loc,
                    vals: data.vals,
                    year: data.ear,
                });
            })
        );
    }, [year, loc]);
    var select = document.getElementById("locs");
    var elmtstwo = data.loc;
    var elmts = [...new Set(elmtstwo)];

    return(
        <div className="podst-container">
            <div className="params">
                <div className="param">
                    <h1>What years do you want to visualize?</h1>
                    <form>
                        <select id="years" onChange={handleChangeYear}>
                            <option value="all" selected="selected">All</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                        </select>
                    </form>
                </div>

                <div className="paramSpace">
                    <p>   </p>
                </div>

                <div className="param">
                    <h1>What locations do you want to visualize?</h1>
                    <form>
                        <select id="locs" onChange={handleChangeLoc}>
                            <option value="all" selected="selected">All</option>
                            {dolocs(elmts,select)}
                            
                        </select>
                    </form>
                </div>

                <div className="show-Data">
                    <p>
                        {data.vals}
                    </p>
                </div>
            </div>
        </div>
    );
}