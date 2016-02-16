import React from 'react'
import ReactDOM from 'react-dom'
import {VelocityReact, VelocityComponent, VelocityTransitionGroup} from 'velocity-react'
require('./velocity.ui');

class Underlay extends React.Component {
  render() {
    var underlay =
      <div style={styles.underlay} onClick={this.props.close}></div>
    var showUnderlay = this.props.id == this.props.step ? underlay : null;
    return (
      <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
        {showUnderlay}
      </VelocityTransitionGroup>
    );
  }
}

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDot: !localStorage.getItem("dot" + this.props.id)
               && !this.props.id == this.props.step,
    }
  }
  render() {
    var pa = this.props.pa,
        pos = pa.getBoundingClientRect(),
        targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed",
        tooltipHeader = pa.getAttribute('data-ps-header'),
        tooltipNote = pa.getAttribute('data-ps-note'),
        step = parseInt(pa.getAttribute('data-ps-step')),
        customHTML = pa.getAttribute('data-ps-custom'),
        tooltip = {
          header: tooltipHeader ? tooltipHeader : options.tooltip.content.header,
          note: tooltipNote ? tooltipNote : options.tooltip.content.note,
        };
    var position = {
      top: fixed ? pos.top + pos.height/2 + options.tooltip.offset.top : pos.top + pos.height/2 + options.tooltip.offset.top + window.scrollY,
      left: fixed ? pos.left + pos.width/2 - styles.tooltip.width/2 + options.tooltip.offset.left : pos.left + pos.width/2 - styles.tooltip.width/2 + options.tooltip.offset.left + window.scrollX,
      position: fixed ? 'fixed' : 'absolute',
    }
    var tooltipStyle = Object.assign(position,styles.tooltip);
    var tip = options.tooltip.tip.display ?
      <div style={styles.tooltip.tip}></div> : null;
    var tooltip =
      <div style={tooltipStyle} className={"pulsey-tooltip-" + this.props.id}>
        <div style={styles.tooltip.close} onClick={this.props.close}> + </div>
          <div style={styles.tooltip.header}>{tooltip.header}</div>
          <div style={styles.tooltip.note}>{tooltip.note}</div>
          <div style={styles.tooltip.buttons}>
            <button style={styles.tooltip.exitButton}>Exit</button>
            <button
              style={styles.tooltip.nextButton}
              onClick={this.props.nextStep}>
              Next
            </button>
          </div>
          {tip}
      </div>
    var showTooltip = this.props.id == this.props.step ? tooltip : null;
    return (
      <VelocityTransitionGroup enter={{animation: "transition.expandIn"}} leave={{animation: "transition.expandOut"}}>
        {showTooltip}
      </VelocityTransitionGroup>
    );
  }
}

class Dot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDot: !localStorage.getItem("dot" + this.props.id),
    }
  }
  dotClick() {
    this.setState({
      showDot: localStorage.setItem("dot" + parseInt(this.props.id), true),
    });
    options.dot.step = this.props.id;
    this.props.dotClick();
  }
  nextStep() {
    for (var i = 0; i < options.utilities.numDots; i++) {
      var next = this.props.id + i + 1;
      if (localStorage.getItem('dot'+parseInt(next))) {
        null;
      }
      else if (next === options.utilities.numDots) {
        for (var e = 0; e < options.utilities.numDots; e++) {
          next = e;
          if (!localStorage.getItem('dot'+parseInt(next))) {
            this.setState({
              showDot: localStorage.setItem("dot" + parseInt(next), true)
            });
            this.props.nextStep(next);
            console.log('going to next step via else if');
            break;
          }
          else {
            break;
          }
        }
        break;
      }
      else {
        console.log('going to next step ');
        this.setState({
          showDot: localStorage.setItem("dot" + parseInt(next), true)
        });
        this.props.nextStep(next);
        break;
      }
    }
  }
  close() {
    this.props.close();
  }
  render() {
    var pa = this.props.pa;
    var pos = pa.getBoundingClientRect();
    var targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed";
    var position = {
      top: fixed ? pos.top + pos.height/2 + options.dot.offset.top : pos.top + pos.height/2 + options.dot.offset.top + window.scrollY,
      left: fixed ? pos.left + pos.width/2 + options.dot.offset.left : pos.left + pos.width/2 + options.dot.offset.left + window.scrollX,
      position: fixed ? 'fixed' : 'absolute',
    }
    var dotStyle = Object.assign(position,styles.dot.back);
    var dot =
      <div
        style={dotStyle}
        className={"pulsey-dot-" + this.props.id}
        onClick={this.dotClick.bind(this)}>
        <div
          style={styles.dot.front}
          className="spinner">
        </div>
      </div>
    return (
      <div>
        <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
          {this.state.showDot && !localStorage.getItem("dot" + this.props.id) && (!(this.props.id == this.props.step) || this.props.step == null) ? dot : null}
        </VelocityTransitionGroup>
        <Tooltip
          pa={this.props.pa}
          nextStep={this.nextStep.bind(this)}
          id={this.props.id}
          step={this.props.step}
          close={this.close.bind(this)}
        />
        <Underlay
          id={this.props.id}
          step={this.props.step}
          close={this.close.bind(this)}
        />
      </div>
    );
  }
}

class Pulsey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: options.dot.step, // inits as null
      pa: document.getElementsByClassName('ps-anchor'),
    }
  }
  reset() {
    localStorage.clear();
  }
  nextStep(next) {
    this.setState({
        step: this.state.step = next,
    });
  }
  dotClick() {
    this.setState({
      step: options.dot.step,
    });
  }
  close() {
    this.setState({
      step: null,
    });
  }
  componentDidMount() {
    window.onresize = function () {
      this.setState({
        pa: document.getElementsByClassName('ps-anchor'),
      });
    }.bind(this);
    window.onscroll = function () {
      this.setState({
        pa: document.getElementsByClassName('ps-anchor'),
      });
    }.bind(this);
  }
  render() {
    var dots = [];
    var pulseyAnchors = document.getElementsByClassName('ps-anchor');
    options.utilities.numDots = pulseyAnchors.length;
    for (var i=0;i<options.utilities.numDots;i++) {
      dots.push(
        <Dot
          key={i}
          id={i}
          pa={this.state.pa[i]}
          nextStep={this.nextStep.bind(this)}
          dotClick={this.dotClick.bind(this)}
          close={this.close.bind(this)}
          step={this.state.step}
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

var options = {
  utilities : {
    numDots: null,
  },
  dot: {
    step: null,
    offset: {
      top: 0,
      left: 0,
    },
  },
  tooltip: {
    width: '250',
    content: {
      header: 'Header not set',
      note: 'Note not set',
    },
    tip: {
      display: true,
      side: 'top',
      size: '10',
    },
    offset: {
      top: 25,
      left: 0,
    },
  },
  underlay: {},
  welcome: {},
  progress: {},
}

var tipSide = options.tooltip.tip.side;
var tipSize = options.tooltip.tip.size;

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
      borderRadius: '100%',
      transform: 'translate(-50%,-50%)',
      background: 'rgba(255,255,255,0.2)',
    },
    front: {
      width: '25',
      height: '25',
      cursor: 'pointer',
      transform: 'translate(-50%,-50%)',
      background: '#fff',
    }
  },
  tooltip: {
    zIndex: '99999',
    background: '#fff',
    padding: '15',
    width: options.tooltip.width,
    borderRadius: '2',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer',
    boxSizing: 'border-box',
    header: {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '600',
      lineHeight: '2em',
    },
    note: {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '300',
    },
    buttons: {
      position: 'relative',
      width: '100%',
      marginTop: '20',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nextButton: {
      padding: '4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ddd',
      background: '#fff',
      borderRadius: '2',
      color: '#555',
      width: '50',
      outline: 'none',
      cursor: 'pointer',
    },
    exitButton: {
      padding: '4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      background: '#fff',
      color: '#aaa',
      width: '50',
      outline: 'none',
      cursor: 'pointer',
    },
    tip: {
      width: '0',
      height: '0',
      borderLeft: tipSide == 'right' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      borderBottom: tipSide == 'top' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      borderRight: tipSide == 'left' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      borderTop: tipSide == 'bottom' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      transform: tipSide == 'right' || tipSide == 'left' ? 'translateY(-50%)' : tipSide == 'bottom' ? 'translate(-50%, 100%)' : 'translate(-50%, 0)',
      left: tipSide == 'top' || tipSide == 'bottom' ? '50%' : tipSide == 'left' ? '-' + 2*tipSize : options.tooltip.width,
      top: tipSide == 'right' || tipSide == 'left' ? '50%' : tipSide == 'top' ? '-' + 2*tipSize : null,
      bottom: tipSide == 'bottom' ? '0' : null,
      position: 'absolute',
    },
    close: {
      color: '#333',
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: '5',
      right: '12',
      fontSize: '25',
    },
  },
  underlay: {
    zIndex: '99998',
    background: 'rgba(76,147,234,0.4)',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
  },
  reset: {
    width: '150px',
    height: '50px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    background: '#555',
    left: '50%',
    bottom: '7.5vh',
    position: 'fixed',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    transform: 'translateX(-50%)',
  }
}

function pulsey() {
  ReactDOM.render(<Pulsey/>,
  document.getElementById('pulsey'));
}

pulsey();
