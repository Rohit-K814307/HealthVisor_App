import React from 'react';
import './accordionvisor.css';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

import Covdths from './get_started_comps/covdths/Covdths';
import Dths from './get_started_comps/dths/Dths';
import Medchars from './get_started_comps/medchars/Medchars';
import Podst from './get_started_comps/podst/Podst';


function BasicExample() {
    return (
    <div class="bootstrap-ui">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>View the Covdths Data!</Accordion.Header>
          <Accordion.Body>
            <Covdths />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>View the Dths Data!</Accordion.Header>
          <Accordion.Body>
            <Dths />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>View the Medchars Data!</Accordion.Header>
          <Accordion.Body>
            <Medchars />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>View the Podst Data!</Accordion.Header>
          <Accordion.Body>
            <Podst />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    );
  }
  
  export default BasicExample;

