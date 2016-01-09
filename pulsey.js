import React from 'react'
import ReactDOM from 'react-dom'

class PulsyDot extends React.Component {
  render() {
    return (
      <div>
        yebo yebo yebo!
      </div>
    );
  }
}

class Pulsey extends React.Component {
  render() {
    var dots = [];
    for (var i=0;i<pulseyAnchors.length;i++) {
      dots.push(<PulsyDot key={Math.random()}
        po={this.props.po[i]}
      />);
    }
    return (
      <div style={styles.tour}>
        {dots}
      </div>
    );
  }
}

// Initialize array for pulsey objects
var pulseyObjects = []

// Create array of user-selected dom anchors
var pulseyAnchors = document.getElementsByClassName('ps-anchor');

// Initialize pulsey objects with data based on html anchors
function createPulseyObjects() {
  for (var i=0;i<pulseyAnchors.length;i++) {
    console.log(pulseyObjects);
    var elementStyles = window.getComputedStyle(pulseyAnchors[i],null),
        tooltipHeader = pulseyAnchors[i].getAttribute('data-ps-header'),
        tooltipNote = pulseyAnchors[i].getAttribute('data-ps-note'),
        step = parseInt(pulseyAnchors[i].getAttribute('data-ps-step')),
        customHTML = pulseyAnchors[i].getAttribute('data-ps-custom');
    pulseyObjects[i] = {
      dot: {
        id: i,
        clicked: false,
        top: pulseyAnchors[i].getBoundingClientRect().top,
        left: pulseyAnchors[i].getBoundingClientRect().left,
        width: pulseyAnchors[i].getBoundingClientRect().width,
        height: pulseyAnchors[i].getBoundingClientRect().height,
        fixed: elementStyles.getPropertyValue('position') === "fixed",
      },
      tooltip: {
        header: tooltipHeader ? tooltipHeader : options.tooltip.content.header,
        note: tooltipNote ? ntooltipNoteote : options.tooltip.content.note,
      }
    }
  }
}

var options = {
  tooltip: {
    content: {
      header: null,
      note: null,
    }
  }
}

var styles = {
  tour: {
    display: 'block',
    width: '200px',
    height: '50px',
    background: 'yellow',
  }
}

function pulsey() {
  createPulseyObjects();
  ReactDOM.render(<Pulsey po={pulseyObjects} />, document.getElementById('pulsey'));
}

window.onresize = function renderResize() {
  pulsey();
}
window.onscroll = function renderScroll() {
  pulsey();
}

pulsey();
