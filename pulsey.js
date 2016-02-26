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

class Highlighter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var step = this.props.step ? this.props.step : 0;
    for (i = 0; i < pulseyTargets.length; i++) {
      document.getElementsByClassName('ps-anchor')[i].className = 'ps-anchor';
      document.getElementsByClassName('ps-anchor')[step].className = 'ps-anchor highlight-target';
    }
    var pa = this.props.pa[step],
        pos = pa.getBoundingClientRect(),
        targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed",
        position = {
          height: pos.height + 10,
          width: pos.width + 10,
          position: 'absolute',
          left: pos.left - 5 + window.scrollX,
          top: pos.top - 5 + window.scrollY,
          borderRadius: 3,
          boxShadow: '0 0 20px 3px rgba(255,255,255,0.25)',
          transition: 'all 0.3s ease-in',
        },
        highlighterStyle = Object.assign(position,styles.highlighter);
    return (
      <div
        style={highlighterStyle}
        className={"highlight-back"}>
      </div>
    );
  }
}

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.id == this.props.step) {
      onkeydown = function(e) {
        if (e.keyCode === 39) {
          stepsArray.sort(function(a,b) {
            return a - b;
          });
          if (this.props.stepCount < pulseyTargets.length) {
            this.props.nextStep();
            this.props.incrementStepCount();
          }
        }
        else if (e.keyCode === 37) {
          stepsArray.sort(function(a,b) {
            return b - a;
          });
          if (this.props.stepCount > 0) {
            this.props.nextStep();
            this.props.decrementStepCount();
          }
        }
        else if (e.keyCode === 27) {
          this.props.close();
        }
      }.bind(this);
    }
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
        },
        position = {
          top: fixed ? pos.top + pos.height/2 + options.tooltip.offset.top : pos.top + pos.height/2 + options.tooltip.offset.top + window.scrollY,
          left: fixed ? pos.left + pos.width/2 - styles.tooltip.width/2 + options.tooltip.offset.left : pos.left + pos.width/2 - styles.tooltip.width/2 + options.tooltip.offset.left + window.scrollX,
          position: fixed ? 'fixed' : 'absolute',
        },
        tooltipStyle = Object.assign(position,styles.tooltip),
        tip = options.tooltip.tip.display ?
          <div style={styles.tooltip.tip}></div> : null,
        tooltip =
          <div style={tooltipStyle} className={"pulsey-tooltip-" + this.props.id}>
            <div style={styles.tooltip.close} onClick={this.props.close}> + </div>
              <div style={styles.tooltip.header}>{tooltip.header}</div>
              <div style={styles.tooltip.note}>{tooltip.note}</div>
              <div style={styles.tooltip.buttons}>
                <button style={styles.tooltip.exitButton} onClick={this.props.close}>Exit</button>
                <button
                  style={styles.tooltip.nextButton}
                  onClick={this.props.nextStep}>
                  Next
                </button>
              </div>
              {tip}
          </div>,
        showTooltip = this.props.id == this.props.step ? tooltip : null;
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
    options.removeStepOnClick ?
      this.setState({
        showDot: localStorage.setItem("dot" + this.props.id, true),
      }) : null;
    options.dot.step = this.props.id;
    this.props.dotClick();
    var step = parseInt(stepsArray.indexOf(this.props.id));
    var getDot = targetsArray[step];
    var dotPos = getDot.getBoundingClientRect().top;
    var winHeight = window.innerHeight;
    if ( (dotPos > winHeight - 200) || (dotPos < 150) ) {
      this.scrollToDot(getDot);
    }
  }
  nextStep() {
    var step = parseInt(stepsArray.indexOf(this.props.id));
    var nextStep = stepsArray[step+1];
    if (nextStep === undefined && stepsArray.length > 0) {
      if (options.removeStepOnClick) {
        stepsArray.splice(step,1);
        targetsArray.splice(step,1);
        this.props.nextStep(stepsArray[0]);
        this.setState({
          showDot: localStorage.setItem("dot" + stepsArray[0], true),
        });
      }
      else {
        this.props.nextStep(stepsArray[0]);
      }
      var getDot = targetsArray[0];
      if (getDot) {
        var dotPos = getDot.getBoundingClientRect().top;
        var winHeight = window.innerHeight;
        if ( (dotPos > winHeight - 200) || (dotPos < 150) ) {
          this.scrollToDot(getDot);
        }
      }
    }
    else {
      if (options.removeStepOnClick) {
        stepsArray.splice(step,1);
        targetsArray.splice(step,1);
        this.props.nextStep(stepsArray[step]);
        this.setState({
          showDot: localStorage.setItem("dot" + stepsArray[step], true),
        });
      }
      else {
        this.props.nextStep(stepsArray[step + 1]);
      }
      var getDot = targetsArray[step];
      var dotPos = getDot.getBoundingClientRect().top;
      var winHeight = window.innerHeight;
      if ( (dotPos > winHeight - 200) || (dotPos < 150) ) {
        this.scrollToDot(getDot);
      }
    }
  }
  scrollToDot(getDot) {
    Velocity(getDot, 'scroll', {
      duration: 500,
      offset: -40,
      easing: 'ease-in-out',
    });
  }
  close() {
    this.props.close();
    var step = parseInt(stepsArray.indexOf(this.props.id));
    stepsArray.splice(step,1);
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
          {
            this.state.showDot &&
            !localStorage.getItem("dot" + this.props.id) &&
            (!(this.props.id == this.props.step) || this.props.step == null) &&
            options.dot.showDots ? dot : null
          }
        </VelocityTransitionGroup>
        <Tooltip
          pa={this.props.pa}
          nextStep={this.nextStep.bind(this)}
          close={this.close.bind(this)}
          id={this.props.id}
          step={this.props.step}
          close={this.close.bind(this)}
          incrementStepCount={this.props.incrementStepCount}
          decrementStepCount={this.props.decrementStepCount}
          stepCount={this.props.stepCount}
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
      step: options.dot.step,
      pa: pulseyTargets,
      stepCount: 0,
    }
  }
  reset() {
    localStorage.clear();
  }
  nextStep(next) {
    this.setState({step: this.state.step = next});
  }
  dotClick() {
    this.setState({
      step: options.dot.step,
    });
  }
  incrementStepCount() {
    this.state.stepCount < options.utilities.numTargets ?
    this.setState({stepCount: this.state.stepCount + 1}) : null;
  }
  decrementStepCount() {
    this.state.stepCount > 0 ?
      this.setState({stepCount: this.state.stepCount - 1}) : null;
  }
  close() {
    this.setState({
      step: null,
    });
  }
  componentDidMount() {
    window.onresize = function () {
      this.setState({
        pa: pulseyTargets,
      });
    }.bind(this);
    window.onscroll = function () {
      this.setState({
        pa: pulseyTargets,
      });
    }.bind(this);
  }
  render() {
    var dots = [];
    for (var i=0;i<pulseyTargets.length;i++) {
      var id = parseInt(unclickedSteps[i]);
      dots.push(
        <Dot
          key={i}
          id={id}
          pa={this.state.pa[i]}
          nextStep={this.nextStep.bind(this)}
          incrementStepCount={this.incrementStepCount.bind(this)}
          decrementStepCount={this.decrementStepCount.bind(this)}
          dotClick={this.dotClick.bind(this)}
          close={this.close.bind(this)}
          step={this.state.step}
          stepCount={this.state.stepCount}
        />);
    }
    return (
      <div style={styles.tour}>
        {dots}
        <button style={styles.reset} onClick={this.reset.bind(this)}>Reset Dots</button>
        <Highlighter
          stepCount={this.state.stepCount}
          step={this.state.step}
          pa={this.state.pa}
        />
      </div>
    );
  }
}

var pulseyTargets = document.getElementsByClassName('ps-anchor'),
    unclicked = [],
    unclickedSteps = [],
    noStepGiven = 0;
for (var i = 0; i < pulseyTargets.length; i++) {
  unclicked.push(pulseyTargets[i]);
  var step = pulseyTargets[i].getAttribute('data-ps-step');
  if (step == '' || step == null) {
    noStepGiven++;
  }
  else {
    unclickedSteps.push(parseInt(step));
  }
}
unclickedSteps.sort(function(a,b) {
  return a - b;
});

var lastStep = unclickedSteps.slice(-1)[0] ? unclickedSteps.slice(-1)[0] : 0;
for (var i = 0; i < noStepGiven; i++) {
  lastStep++;
  unclickedSteps.push(lastStep);
}

var stepsArray = unclickedSteps.slice();
var targetsArray = unclicked.slice();

for (var i = 0; i < pulseyTargets.length; i++) {
  if (localStorage.getItem('dot' + parseInt(stepsArray[i]))) {
    stepsArray.splice(i,1);
    targetsArray.splice(i,1);
    i--;
  }
}

var options = {
  utilities : {
    numTargets: pulseyTargets.length,
  },
  dot: {
    step: null,
    offset: {
      top: 0,
      left: 0,
    },
    showDots: true,
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
  removeStepOnClick: true,
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
  highlighter: {
    background: '#fbfbfb',
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
    background: 'rgba(0,0,0,0.25)', //'rgba(76,147,234,0.4)',
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
