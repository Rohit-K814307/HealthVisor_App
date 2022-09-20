import React from 'react';
import { useState, useEffect } from "react";

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
                            <option value="VA">VA</option>
                            <option value="AR">AR</option>
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