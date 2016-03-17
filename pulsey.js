import React from 'react'
import ReactDOM from 'react-dom'
import {VelocityReact, VelocityComponent, VelocityTransitionGroup} from 'velocity-react'
require('./velocity.ui');

class Underlay extends React.Component {
  render() {
    var style = {
        zIndex: '99997',
        background: 'rgba(0,0,0,0.25)',
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
    };
    var close = options.underlay.clickToClose ?
      this.props.close : null;
    var underlay =
      <div style={style} onClick={close}></div>
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
    this.state = {
      endTour: false,
    }
  }
  getStarted() {
    options.dot.step = stepsArray[0];
    this.props.getStarted();
  }
  endTour() {
    this.setState({
      endTour: true,
    });
  }
  render() {
    var welcome = {
      header: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '600',
        lineHeight: '2em',
        fontSize: 28,
        color: '#222',
      },
      note: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '300',
        fontSize: 18,
        color: '#111',
      },
      button: {
        width: '125px',
        height: '40px',
        borderRadius: '2px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        background: '#f67b45',
        color: '#fff',
        fontSize: 13,
        fontWeight: 300,
        left: '50%',
        position: 'absolute',
        textTransform: 'uppercase',
        bottom: '25px',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        transform: 'translateX(-50%)',
      },
    },
    step = pulseyTargetsSteps.indexOf(this.props.step),
    pa = pulseyTargets[step >= 0 ? step : 0],
    pos = pa.getBoundingClientRect(),
    targetStyle = window.getComputedStyle(pa,null),
    fixed = targetStyle.getPropertyValue('position') === "fixed",
    highlighterPosition = {
      height: pos.height + 4,
      width: pos.width + 4,
      position: 'absolute',
      left: pos.left - 2 + window.scrollX,
      top: pos.top - 2 + window.scrollY,
      borderRadius: 3,
      boxShadow: '0 0 20px 3px rgba(255,255,255,0.5)',
      transition: this.props.resize ? 'none' : 'all 0.3s ease-in',
      zIndex: 99999,
      background: '#fff',
    },
    welcomePosition = {
      width: 500,
      minHeight: 300,
      position: options.welcome.fixed ? 'fixed' : 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      background: '#555',
      transition: this.props.resize ? 'none' : 'all 0.3s ease-in',
      padding: '10px 30px',
      borderRadius: 3,
      zIndex: 99999,
      boxShadow: '0 0 120px 30px rgba(246, 123, 69, 0.4)',
    },
    farewellPosition = {
      width: 500,
      minHeight: 300,
      position: options.farewell.fixed ? 'fixed' : 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      background: '#555',
      borderRadius: 3,
      padding: '10px 30px',
      transition: this.props.resize ? 'none' : 'all 0.3s ease-in',
      zIndex: 99999,
      boxShadow: '0 0 120px 30px rgba(246, 123, 69, 0.4)',
    };
    var showWelcome = !window[storage].getItem('tourStarted') && options.welcome.display;
    var showFarewell = options.pulsey.tourComplete && this.props.step !== null;
    var showHighlighter = options.highlighter.display;
    var welcomeContent = showWelcome ?
      <div>
        <div style={welcome.header}>{welcomeHeader}</div>
        <div style={welcome.note}>{welcomeNote}</div>
        <button style={welcome.button} onClick={this.getStarted.bind(this)}>Get Started</button>
      </div> : null;
    var farewellContent = showFarewell ?
      <div>
        <div style={welcome.header}>{farewellHeader}</div>
        <div style={welcome.note}>{farewellNote}</div>
        <button style={welcome.button} onClick={this.endTour.bind(this)}>Done</button>
      </div> : null;
    var flexyBox =
      <div style={showWelcome ? welcomePosition : showFarewell ? farewellPosition : showHighlighter ? highlighterPosition : null}>
        {welcomeContent}
        {farewellContent}
      </div>;
    setTimeout(function() {
      for (var i = 0; i < pulseyTargets.length; i++) {
        document.getElementsByClassName('ps-anchor')[i].className = 'ps-anchor';
      }
      options.highlighter.display && step >= 0 ? pulseyTargets[step].className = 'ps-anchor highlight-target' : null;
    },500);
    options.highlighter.display && step >= 0 ? pulseyTargets[step].className = 'ps-anchor highlight-target' : null;
    return (
      <div>
        <VelocityTransitionGroup
          enter={{animation: "fadeIn"}}
          leave={{animation: "fadeOut"}}
          duration={3000}
          className={'pulsey-tour'}>
          {welcome || this.props.step !== null && !this.state.endTour ? flexyBox : null}
        </VelocityTransitionGroup>
      </div>
    );
  }
}

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }
  nextStep() {
    this.props.nextStep(1);
  }
  prevStep() {
    this.props.nextStep(-1);
  }
  render() {
    if (this.props.id == this.props.step) {
      onkeydown = function(e) {
        if (e.keyCode === 39) {
          stepsArray.sort(function(a,b) {
            return a - b;
          });
          if (this.props.stepCount < pulseyTargets.length) {
            this.props.nextStep(1);
          }
          else if (this.props.stepCount === pulseyTargets.length) {
            this.props.close();
          }
        }
        else if (e.keyCode === 37) {
          stepsArray.sort(function(a,b) {
            return b - a;
          });
          if (this.props.stepCount < pulseyTargets.length && this.props.stepCount > 0) {
            this.props.nextStep(-1);
          }
        }
        else if (e.keyCode === 27) {
          this.props.close();
        }
      }.bind(this);
    }
    var nextLabel = options.tooltip.labels.next;
    stepsArray.length === 1 || this.props.stepCount === pulseyTargets.length ? nextLabel = options.tooltip.labels.finish : nextLabel = options.tooltip.labels.next;
    var pa = this.props.pa,
        pos = pa.getBoundingClientRect(),
        targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed",
        tooltipHeader = pa.getAttribute('data-ps-header'),
        tooltipNote = pa.getAttribute('data-ps-note'),
        step = parseInt(pa.getAttribute('data-ps-step')),
        customHTML = pa.getAttribute('data-ps-custom'),
        tooltipContent = {
          header: tooltipHeader ? tooltipHeader : options.tooltip.content.header,
          note: tooltipNote ? tooltipNote : options.tooltip.content.note,
        },
        tipSide = options.tooltip.tip.side,
        tipSize = options.tooltip.tip.size,
        style = {
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
          },
          progress: {
            width: 24,
            height: 24,
            background: '#4c93ea',
            borderRadius: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'translate(-50%,-50%)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 13,
            fontWeight: 300,
            boxShadow: '0 0 20px rgba(76, 147, 234, 0.85)',
          },
          close: {
            color: '#333',
            transform: 'rotate(45deg)',
            position: 'absolute',
            top: '5',
            right: '12',
            fontSize: '25',
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
        },
        tooltipPosition = {
          top: fixed ? pos.top + pos.height + options.tooltip.offset.top : pos.top + pos.height + options.tooltip.offset.top + window.scrollY,
          left: fixed ? pos.left + pos.width/2 - style.tooltip.width/2 + options.tooltip.offset.left : pos.left + pos.width/2 - style.tooltip.width/2 + options.tooltip.offset.left + window.scrollX,
          position: fixed ? 'fixed' : 'absolute',
        },
        progressIndicator = options.tooltip.progress ?             <div style={style.progress}> {this.props.stepCount+1} </div> : null,
        tooltipStyle = Object.assign({},tooltipPosition,style.tooltip),
        tip = options.tooltip.tip.display ?
          <div style={style.tooltip.tip}></div> : null,
        tooltip =
          <div style={tooltipStyle} className={"pulsey-tour pulsey-tooltip-" + this.props.id}>
            <div style={style.close} onClick={this.props.close}> + </div>
            {progressIndicator}
              <div style={style.tooltip.header}>{tooltipContent.header}</div>
              <div style={style.tooltip.note}>
                {tooltipContent.note}
              </div>
              <div style={style.buttons}>
                <button style={style.exitButton} onClick={this.props.skip}>Skip</button>
                <button
                  style={style.nextButton}
                  onClick={this.nextStep.bind(this)}>
                  {nextLabel}
                </button>
              </div>
              {tip}
          </div>,
        showTooltip = this.props.id == this.props.step ? tooltip : null;
        console.log()
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
      showDot: !window[storage].getItem("dot" + this.props.id),
    }
  }
  dotClick() {
    options.removeStepOnClick || options.hideDotOnClick ?
      this.setState({
        showDot: window[storage].setItem("dot" + this.props.id, true),
      }) : null;
    options.dot.step = this.props.id;
    this.props.dotClick();
    var scrollStep = parseInt(pulseyTargetsSteps.indexOf(this.props.id));
    var getDot = pulseyTargets[scrollStep];
    this.scrollToDot(getDot);
    this.tourStatusCheck(0);
  }
  nextStep(stepCountChange) {
    var step = stepsArray.indexOf(this.props.id);
    var nextStep = stepsArray[step+1];
    var scrollStep = nextStep ? nextStep : stepsArray[0];
    var scrollIndex = pulseyTargetsSteps.indexOf(scrollStep);
    this.scrollToDot(pulseyTargets[scrollIndex]);
    if (nextStep === undefined && stepsArray.length > 0) {
      if (options.removeStepOnClick) {
        stepsArray.splice(step,1);
        targetsArray.splice(step,1);
        this.props.nextStep(stepsArray[0]);
        this.setState({
          showDot: window[storage].setItem("dot" + stepsArray[0], true),
        });
      }
      else {
        this.props.nextStep(stepsArray[0]);
      }
    }
    else {
      if (options.removeStepOnClick) {
        stepsArray.splice(step,1);
        targetsArray.splice(step,1);
        this.props.nextStep(stepsArray[step]);
        this.setState({
          showDot: window[storage].setItem("dot" + stepsArray[step], true),
        });
      }
      else {
        this.props.nextStep(stepsArray[step + 1]);
        this.props.stepCount === pulseyTargets.length ? this.close() : null;
      }
    }
    options.removeStepOnClick || options.hideDotOnClick ?
      this.setState({
        showDot: window[storage].setItem("dot" + stepsArray[step], true)
      }) : null;
    if (this.props.stepCount < pulseyTargets.length) {
      this.props.incrementStepCount(stepCountChange);
    }
    this.tourStatusCheck(1);
  }
  scrollToDot(getDot) {
    var dotPos = getDot.getBoundingClientRect().top;
    var winHeight = window.innerHeight;
    if ( (dotPos > winHeight - 300) || (dotPos < 150) ) {
      Velocity(getDot, 'scroll', {
        duration: 500,
        offset: -40,
        easing: 'ease-in-out',
      });
    }
  }
  close() {
    this.props.close();
    var step = parseInt(stepsArray.indexOf(this.props.id));
    stepsArray.splice(step,1);
  }
  skip() {
    this.props.close();
    var step = parseInt(stepsArray.indexOf(this.props.id));
    stepsArray.splice(step,1);
    options.pulsey.tourSkipped.push([this.props.id,stepsArray.length]);
    this.props.skip();
  }
  tourStatusCheck(next) {
    console.log('stepsArray.length',stepsArray.length);
    stepsArray.length === 0 || this.props.stepCount === pulseyTargets.length ? (
      options.pulsey.tourComplete = true,
      window[storage].setItem('tourComplete',true)
    ) : null;
  }
  render() {
    var pa = this.props.pa,
        pos = pa.getBoundingClientRect(),
        targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed",
        style = {
          position: {
            top: fixed ? pos.top + pos.height/2 + options.dot.offset.top : pos.top + pos.height/2 + options.dot.offset.top + window.scrollY,
            left: fixed ? pos.left + pos.width/2 + options.dot.offset.left : pos.left + pos.width/2 + options.dot.offset.left + window.scrollX,
            position: fixed ? 'fixed' : 'absolute',
          },
          dot: {
            zIndex: '99997',
            size: '25',
            cursor: 'pointer',
          },
          backDot: {
            width: '25',
            height: '25',
            borderRadius: '100%',
            transform: 'translate(-50%,-50%)',
            background: 'rgba(255,255,255,0.2)',
          },
          frontDot: {
            width: '25',
            height: '25',
            cursor: 'pointer',
            transform: 'translate(-50%,-50%)',
            background: '#fff',
          }
        },
        dotPosition = Object.assign({}, style.position, style.backDot),
        dot =
          <div
            style={dotPosition}
            className={"pulsey-tour pulsey-dot-" + this.props.id}
            onClick={this.dotClick.bind(this)}>
            <div
              style={style.frontDot}
              className="spinner">
            </div>
          </div>;
    return (
      <div>
        <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
          {
            this.state.showDot &&
            !window[storage].getItem("dot" + this.props.id) &&
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
          skip={this.skip.bind(this)}
          incrementStepCount={()=>this.incrementStepCount(stepCountChange)}
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
      resize: false,
      pa: pulseyTargets,
      stepCount: 0,
      tourSkipped: false || window[storage].getItem('tourSkipped'),
    }
  }
  reset() {
    window[storage].clear();
  }
  nextStep(next) {
    this.setState({step: next});
  }
  dotClick() {
    this.setState({step: options.dot.step});
    options.pulsey.tourStarted = true;
    window[storage].setItem('tourStarted',true);
  }
  incrementStepCount(stepCountChange) {
    if (stepCountChange > 0) {
      this.state.stepCount < pulseyTargets.length ?
      this.setState({stepCount: this.state.stepCount + stepCountChange}) : null;
    }
    else {
      this.state.stepCount > 0 ?
      this.setState({stepCount: this.state.stepCount + stepCountChange}) : null;
    }
  }
  close() {
    this.setState({step: null});
  }
  skip() {
    this.setState({
      tourSkipped: true,
    });
    window[storage].setItem('tourSkipped',true);
  }
  componentDidMount() {
    window[storage].getItem('tourStarted') ? options.pulsey.tourStarted = true : null;
    window.onresize = function () {
      this.setState({pa: pulseyTargets, resize: true});
      clearTimeout(window.resizeFinished);
      window.resizeFinished = setTimeout(function(){
        this.setState({resize: false});
      }.bind(this), 250);
    }.bind(this);
    window.onscroll = function () {
      this.setState({pa: pulseyTargets});
    }.bind(this);
    if (!options.welcome.display) {
      options.pulsey.tourStarted = true;
      window[storage].setItem('tourStarted',true);
    }
  }
  render() {
    var tourStyles = {
      position: 'absolute',
      zIndex: '99999',
    }
    var dots = [];
    for (var i = 0; i < pulseyTargets.length; i++) {
      var id = parseInt(pulseyTargetsSteps[i]);
      dots.push(
        <Dot
          key={i}
          id={id}
          pa={this.state.pa[i]}
          nextStep={this.nextStep.bind(this)}
          incrementStepCount={this.incrementStepCount.bind(this)}
          dotClick={this.dotClick.bind(this)}
          close={this.close.bind(this)}
          step={this.state.step}
          stepCount={this.state.stepCount}
          skip={this.skip.bind(this)}
        />);
    }
    var pulseyTour = !this.state.tourSkipped ?
      <div style={tourStyles}>
        {dots}
        <button className={'reset'} onClick={this.reset.bind(this)}>Reset Dots</button>
      </div> : null;
    return (
      <div>
        <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
          {pulseyTour}
          <Highlighter
            stepCount={this.state.stepCount}
            step={this.state.step}
            pa={this.state.pa}
            resize={this.state.resize}
            getStarted={this.dotClick.bind(this)}
          />
        </VelocityTransitionGroup>
      </div>
    );
  }
}

var psAnchors = document.getElementsByClassName('ps-anchor'),
    psWelcome = document.getElementsByClassName('ps-welcome')[0],
    psFarewell = document.getElementsByClassName('ps-farewell')[0],
    welcomeHeader = psWelcome.getAttribute('data-ps-header'),
    welcomeNote = psWelcome.getAttribute('data-ps-content'),
    farewellHeader = psFarewell.getAttribute('data-ps-header'),
    farewellNote = psFarewell.getAttribute('data-ps-content'),
    pulseyTargets = Array.prototype.slice.call(psAnchors),
    pulseyTargetsSteps = [],
    noStepGiven = 0;
for (var i = 0; i < pulseyTargets.length; i++) {
  var step = pulseyTargets[i].getAttribute('data-ps-step');
  if (step == '' || step == null) {
    noStepGiven++;
  }
  else {
    pulseyTargetsSteps.push(parseInt(step));
  }
}

var ptsClone = pulseyTargetsSteps.slice();
ptsClone.sort(function(a,b) {
  return a - b;
});

var nextPsStep = ptsClone.slice(-1)[0] ? ptsClone.slice(-1)[0] + 1 : 1;
if (noStepGiven > 0) {
  for (var i = 0; i < noStepGiven; i++) {
    pulseyTargetsSteps.push(nextPsStep);
    nextPsStep++;
  }
}
else {
  for (var i = 0; i < noStepGiven; i++) {
    nextPsStep++;
    stepsArray.push(nextPsStep);
  }
}

var targetsArray = pulseyTargets.slice();
var stepsArray = pulseyTargetsSteps.slice();

stepsArray.sort(function(a,b) {
  return a - b;
});

var options = {
  pulsey : {
    tourStarted: false,
    tourCompleted: false,
    tourSkipped: [],
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
      size: 10,
    },
    offset: {
      top: 20,
      left: 0,
    },
    labels: {
      next: 'Next',
      finish: 'Finish',
    },
    progress: true,
  },
  highlighter: {
    display: true,
  },
  welcome: {
    display: psWelcome,
    fixed: true,
  },
  farewell: {
    display: psFarewell,
    fixed: true,
  },
  underlay: {
    clickToClose: true,
  },
  storage: 'localStorage',
  removeStepOnClick: true,
  hideDotOnClick: true,
}

var storage =
  options.storage === 'localStorage' ||
  options.storage === 'sessionStorage' ?
    options.storage : 'localStorage';

for (var i = 0; i < pulseyTargets.length; i++) {
  if (window[storage].getItem('dot' + parseInt(stepsArray[i]))) {
    stepsArray.splice(i,1);
    targetsArray.splice(i,1);
  }
}

function pulsey(userOptions) {
  Object.assign(options,userOptions);
  ReactDOM.render(<Pulsey/>,
  document.getElementById('pulsey'));
}

// END USER FILE START

pulsey({
  option1: 'nice!',
  option2: 'even nicer!',
});
