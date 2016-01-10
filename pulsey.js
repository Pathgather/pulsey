import React from 'react'
import ReactDOM from 'react-dom'

class Underlay extends React.Component {
  render() {
    var underlay =
      <div style={styles.underlay} onClick={this.props.toggle}></div>
    var showUnderlay = this.props.show ? underlay : null;
    return (
      <div>
        {showUnderlay}
      </div>
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
    var tooltip =
      <div style={tooltipStyle} onClick={this.props.toggle}>
        <div style={styles.tooltip.close}> + </div>
      </div>
    var showTooltip = this.props.show ? tooltip : null;
    return (
      <div>
        {showTooltip}
      </div>
    );
  }
}

class Dot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }
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
        <div style={dotStyle} onClick={this.toggle.bind(this)}>
          <div style={styles.dot.front} className="spinner"></div>
        </div>
        <Tooltip po={this.props.po} toggle={this.toggle.bind(this)} show={this.state.show} />
        <Underlay po={this.props.po} toggle={this.toggle.bind(this)} show={this.state.show} />
      </div>
    );
  }
}

class Pulsey extends React.Component {
  reset() {
    localStorage.clear();
  }
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
        <button style={styles.reset} onClick={this.reset.bind(this)}>Reset Dots</button>
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
    zIndex: '99999',
    position: 'absolute',
  },
  dot: {
    zIndex: '99997',
    size: '25',
    cursor: 'pointer',
    back: {
      width: '25',
      height: '25',
    },
    front: {
      width: '25',
      height: '25',
      cursor: 'pointer',
      background: '#fff',
    }
  },
  tooltip: {
    zIndex: '99999',
    width: '250',
    height: '75',
    background: '#fff',
    cursor: 'pointer',
    close: {
      color: '#fff',
    }
  },
  underlay: {
    zIndex: '99998',
    background: 'rgba(76,147,234,0.4)',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
  },
  reset: {
    width: '150px',
    height: '50px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    background: '#555',
    left: '50%',
    top: '7.5vh',
    position: 'fixed',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    transform: 'translateX(-50%)',
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
