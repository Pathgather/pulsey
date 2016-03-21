import React from 'react';
import {VelocityReact, VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import Tooltip from 'components/Tooltip';
import options from '../options';
import Underlay from 'components/Underlay';

export default class Dot extends React.Component {
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
    stepsArray.length === 0 || this.props.stepCount === pulseyTargets.length ? (
      options.pulsey.tourComplete = true,
      window[storage].setItem('tourComplete',true)
    ) : null;
  }
  render() {
    var options = this.props.options;
    var storage =
      options.storage === 'localStorage' ||
      options.storage === 'sessionStorage' ?
        options.storage : 'localStorage';
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
          options={this.props.options}
        />
        <Underlay
          id={this.props.id}
          step={this.props.step}
          close={this.close.bind(this)}
          options={this.props.options}
        />
      </div>
    );
  }
}
