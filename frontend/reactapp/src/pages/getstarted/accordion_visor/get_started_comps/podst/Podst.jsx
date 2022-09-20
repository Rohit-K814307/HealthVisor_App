import React from 'react';
import { useState, useEffect } from "react";

export default function Podst() {
    const [data, setdata] = useState({
        loc: "",
        vals: 0,
        year: "",
    });

    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("http://127.0.0.1:5000/podst/" + document.getElementById('years').value + `/` + document.getElementById('locs').value).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    loc: data.loc,
                    vals: data.vals,
                    year: data.ear,
                });
            })
        );
    }, []);

    return(
        <div className="podst-container">
            <div className="params">
                <div className="param">
                    <h1>What years do you want to visualize?</h1>
                    <form>
                        <select id="years">
                            <option value="all" selected="selected">All</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                        </select>
                    </form>
                </div>

                <div className="paramSpace">
                    <p>   </p>
                </div>

                <div className="param">
                    <h1>What locations do you want to visualize?</h1>
                    <form>
                        <select id="locs">
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