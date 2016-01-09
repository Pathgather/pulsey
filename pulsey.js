import React from 'react'
import ReactDOM from 'react-dom'

class Pulsey extends React.Component {
  render() {
    return (
      <div>
        yebo!
      </div>
    );
  }
}

// Initialize array for pulsey objects
var pulseyObjects = []

// Create array of user-selected dom anchors
var pulseyAnchors = document.getElementsByClassName('pulsey-anchor');

// Initialize pulsey objects with data based on html anchors
function initPulseyObjects() {
  for (var i=0;i<pulseyAnchors.length;i++) {
    var styles = window.getComputedStyle(pulseyAnchors[i],null),
        header = pulseyAnchors[i].getAttribute('data-ps-header'),
        note = pulseyAnchors[i].getAttribute('data-ps-note'),
        step = parseInt(pulseyAnchors[i].getAttribute('data-ps-step')),
        custom = pulseyAnchors[i].getAttribute('data-ps-custom');
    pulseyObjects[i] = {
      dot: {
        id: i,
        clicked: false,
        coordinates: pulseyAnchors[i].getBoundingClientRect(),
        fixed: anchorStyles.getPropertyValue('position') === "fixed",
      },
      tooltip: {
        header: header ? header : options.tooltip.content.header,
        note: note ? note : options.tooltip.content.note,
      }
    }
  }
}

var options = {

}

var styles = {

}

function pulsey() {
  initPulseyObjects();
  localStorage.setItem("nextStep", options.firstStep);
  ReactDOM.render(<Pulsey p={pulseyObjects} />, document.getElementById('pulsy-tour'));
}

window.onresize = function renderResize() {
  pulsy();
}
window.onscroll = function renderScroll() {
  pulsy();
}

// Launch pulsey
pulsy();
