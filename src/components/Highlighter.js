import React from 'react';
import {VelocityReact, VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

export default class Highlighter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endTour: false,
    }
  }
  getStarted() {
    this.props.options.dot.step = stepsArray[0];
    this.props.getStarted();
  }
  endTour() {
    this.setState({
      endTour: true,
    });
  }
  render() {
    var options = this.props.options;
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
