import React from 'react'
import { VelocityReact, VelocityComponent, VelocityTransitionGroup } from 'velocity-react'
import velocityUI from 'velocity-ui-pack'
import Dot from 'components/Dot'
import Highlighter from 'components/Highlighter'
import { pulseyTargets, pulseyTargetsSteps } from '../init'
import { tourStyles } from '../styles/pulsey.styles'

export default class Pulsey extends React.Component {
  constructor(props) {
    super(props);
    window.storage =
      this.props.options.storage === 'localStorage' ||
      this.props.options.storage === 'sessionStorage' ?
        this.props.options.storage : 'localStorage';
    this.state = {
      step: this.props.options.dot.step,
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
    this.setState({step: this.props.options.dot.step});
    this.props.options.pulsey.tourStarted = true;
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
    var options = this.props.options;
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
    for (var i = 0; i < pulseyTargets.length; i++) {
      if (window[storage].getItem('dot' + parseInt(stepsArray[i]))) {
        stepsArray.splice(i,1);
        targetsArray.splice(i,1);
      }
    }
  }
  render() {
    var options = this.props.options;
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
          options={options}
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
            options={this.props.options}
          />
        </VelocityTransitionGroup>
      </div>
    );
  }
}
