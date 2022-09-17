import React, { useState, useEffect } from 'react';
import { Dropdown, Option } from '../createparams';
import './podst.css'



function Podst() {

    


    const [optionValue_startyear, setOptionValue_startyear] = useState("");
    const handleSelect_startyear = (e) => {
        console.log(e.target.value);
        setOptionValue_startyear(e.target.value);
    };

    const [optionValue_endyear, setOptionValue_endyear] = useState("");
    const handleSelect_endyear = (e) => {
        console.log(e.target.value);
        setOptionValue_endyear(e.target.value);
    };

    const [optionValue_location, setOptionValue_location] = useState("");
    const handleSelect_location = (e) => {
        console.log(e.target.value);
        setOptionValue_location(e.target.value);
    };

    return (
        <div class="podst-container">

            <div class="params">

                <div class="param yearstart">
                    <Dropdown
                        formLabel="Enter the start year to view"
                        buttonText="Ready!"
                        onChange={handleSelect_startyear}
                        action="https://jsonplaceholder.typicode.com/posts"
                    >
                        <Option selected value="Click to see options" />
                        <Option value="Option 1" />
                        <Option value="Option 2" />
                        <Option value="Option 3" />
                    </Dropdown> 
                </div>

                <div class="paramSpace">
                    <p>    </p>
                </div>

                <div class="param yearend">
                    <Dropdown
                        formLabel="Enter the end year to view"
                        buttonText="Ready!"
                        onChange={handleSelect_endyear}
                        action="https://jsonplaceholder.typicode.com/posts"
                    >
                        <Option selected value="Click to see options" />
                        <Option value="Option 1" />
                        <Option value="Option 2" />
                        <Option value="Option 3" />
                    </Dropdown>
                </div>

                <div class="paramSpace">
                    <p>    </p>
                </div>

                <div class="param locationabbr">
                <Dropdown
                        formLabel="Enter the location to view"
                        buttonText="Ready!"
                        onChange={handleSelect_location}
                        action="https://jsonplaceholder.typicode.com/posts"
                    >
                        <Option selected value="Click to see options" />
                        <Option value="Option 1" />
                        <Option value="Option 2" />
                        <Option value="Option 3" />
                    </Dropdown>
                </div>
            </div>

      </div>
    )
}


export default Podst;