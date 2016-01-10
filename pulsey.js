import React from 'react'
import ReactDOM from 'react-dom'

class Underlay extends React.Component {
  render() {
    return (
        <div style={styles.underlay}></div>
    );
  }
}

class Tooltip extends React.Component {
  render() {
    var pod = this.props.po.dot;
    var position = {
      top: pod.fixed ? pod.top + pod.height/2 - styles.tooltip.height/2 + options.dot.offset.top : pod.top + pod.height/2 - styles.tooltip.height/2 + options.dot.offset.top + window.scrollY,
      left: pod.fixed ? pod.left + pod.width/2 - styles.tooltip.width/2 + options.dot.offset.left : pod.left + pod.width/2 - styles.tooltip.width/2 + options.dot.offset.left + window.scrollX,
      position: pod.fixed ? 'fixed' : 'absolute',
    }
    var tooltipStyle = Object.assign(position,styles.tooltip);
    return (
      <div style={tooltipStyle}>
        <div style={styles.tooltip.close}>+</div>
      </div>
    );
  }
}

class Dot extends React.Component {
  render() {
    var pod = this.props.po.dot;
    var position = {
      top: pod.fixed ? pod.top + pod.height/2 - styles.dot.size/2 + options.dot.offset.top : pod.top + pod.height/2 - styles.dot.size/2 + options.dot.offset.top + window.scrollY,
      left: pod.fixed ? pod.left + pod.width/2 - styles.dot.size/2 + options.dot.offset.left : pod.left + pod.width/2 - styles.dot.size/2 + options.dot.offset.left + window.scrollX,
      position: pod.fixed ? 'fixed' : 'absolute',
    }
    var dotStyle = Object.assign(position,styles.dot.back);
    return (
      <div>
        <div style={dotStyle}>
          <div style={styles.dot.front} className="spinner"></div>
        </div>
        <Tooltip po={this.props.po} />
        <Underlay po={this.props.po} />
      </div>
    );
  }
}

class Pulsey extends React.Component {
  render() {
    var dots = [];
    for (var i=0;i<pulseyAnchors.length;i++) {
      dots.push(<Dot key={Math.random()}
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
  utilities : {},
  dot: {
    offset: {
      top: 0,
      left: 0,
    }
  },
  tooltip: {
    content: {
      header: null,
      note: null,
    }
  },
  underlay: {},
  welcome: {},
  progress: {}
}

var styles = {
  tour: {
    zIndex: '9999',
    position: 'absolute',
  },
  dot: {
    size: '25',
    back: {
      width: '25',
      height: '25',
    },
    front: {
      width: '25',
      height: '25',
      background: '#fff',
    }
  },
  tooltip: {
    width: '250',
    height: '75',
    background: '#fff',
    close: {
      color: '#fff',
    }
  },
  underlay: {
    background: 'transparent',
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
