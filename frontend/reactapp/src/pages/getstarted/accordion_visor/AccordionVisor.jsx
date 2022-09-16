import React from 'react';
import './accordionvisor.css';
import Covdths from './get_started_comps/covdths/Covdths';
import Dths from './get_started_comps/dths/Dths';
import Medchars from './get_started_comps/medchars/Medchars';
import Podst from './get_started_comps/podst/Podst';

// Accordion component
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [height, setHeight] = React.useState(0)
    const bodyRef = React.useRef(null)
    
    // Get the collapsed body height
    React.useEffect(() => {
      const elementHeight = bodyRef.current.clientHeight
      setHeight(elementHeight)
    }, [])
     
    // inline style
    const collapse = {
      height: 0,
      transition: "height .3s ease"
    }
  
    const show = {
      height: `${height}px`,
      transition: "height .3s ease"
    }
  
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              {title}
            </button>
          </h2>
        </div>
        <div style={isOpen ? show : collapse}>
          <div className="card-body" ref={bodyRef}>
            {children}
          </div>
        </div>
      </div>
    )
  }
  
  function AccordionVisor() {
    return (
      <div className="visor-holder">
        <div className="accordion">

          <Accordion title="Covdths">
            <div>
              <Covdths />
            </div>
          </Accordion>

          <Accordion title="Dths">
            <div>
              <Dths />
            </div>
          </Accordion>

          <Accordion title="Medchars">
            <div>
              <Medchars />
            </div>
          </Accordion>

          <Accordion title="Podst">
            <div>
              <Podst />
            </div>
          </Accordion>
        </div>
      </div>
    )
  }

  export default AccordionVisor;