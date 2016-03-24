import React from 'react'
import { VelocityReact, VelocityComponent, VelocityTransitionGroup } from 'velocity-react'
import { welcomeHeader, welcomeNote, farewellHeader, farewellNote, pulseyTargets, pulseyTargetsSteps } from '../init'
import { welcome, highlighterStyle, welcomeStyle, farewellStyle } from '../styles/highlighter.styles'

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
    var
        options = this.props.options,
        resize = this.props.resize,
        step = pulseyTargetsSteps.indexOf(this.props.step),
        pa = pulseyTargets[step >= 0 ? step : 0],
        pos = pa.getBoundingClientRect(),
        targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed";
    var
        transitionCheck = this.props.resize ? 'none' : 'all 0.3s ease-in',
        highlighterPosition = {
          height: pos.height + 4,
          width: pos.width + 4,
          left: pos.left - 2 + window.scrollX,
          top: pos.top - 2 + window.scrollY,
          transition: transitionCheck,
        },
        welcomePosition = {
          transition: transitionCheck,
        },
        farewellPosition = {
          transition: transitionCheck,
        };
    var
        highlighterCombinedStyle = Object.assign({}, highlighterStyle, highlighterPosition),
        welcomeCombinedStyle = Object.assign({}, welcomeStyle, welcomePosition),
        farewellCombinedStyle = Object.assign({}, farewellStyle, farewellPosition);
    var
        showWelcome = !window[storage].getItem('tourStarted') && options.welcome.display,
        showFarewell = options.pulsey.tourComplete && this.props.step !== null,
        showHighlighter = options.highlighter.display;
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
      <div style={showWelcome ? welcomeCombinedStyle : showFarewell ? farewellCombinedStyle : showHighlighter ? highlighterCombinedStyle : null}>
        {welcomeContent}
        {farewellContent}
      </div>;
    setTimeout(function() {
      for (var i = 0; i < pulseyTargets.length; i++) {
        document.getElementsByClassName('pt-anchor')[i].className = 'pt-anchor';
      }
      options.highlighter.display && step >= 0 ? pulseyTargets[step].className = 'pt-anchor highlight-target' : null;
    }, 250);
    options.highlighter.display && step >= 0 ? pulseyTargets[step].className = 'pt-anchor highlight-target' : null;
    var highlighter = welcome || this.props.step !== null && !this.state.endTour ? flexyBox : null;
    console.log(stepsArray.length);
    return (
      <div>
          <VelocityTransitionGroup
            enter={{animation: "fadeIn"}}
            leave={{animation: "fadeOut"}}
            duration={3000}
            className={'pulsey-tour'}>
            <div>
              {options.tourStarted && stepsArray.length > 0 ? highlighter : null}
            </div>
          </VelocityTransitionGroup>
      </div>
    );
  }
}
