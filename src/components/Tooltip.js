import React from 'react'
import { VelocityReact, VelocityComponent, VelocityTransitionGroup } from 'velocity-react'
import { pulseyTargets } from '../init'
import { style } from '../styles/tooltip.styles'

export default class Tooltip extends React.Component {
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
    var options = this.props.options;
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
    var createSteps = this.props.create.steps;
    for (var i = 0; i < pulseyTargets.length; i++) {
      if (createSteps[i] && createSteps[i].step === this.props.id) {
        var objectTooltipHeader = createSteps[i].header;
        var objectTooltipNote = createSteps[i].note;
      }
    }
    var pa = this.props.pa,
        pos = pa.getBoundingClientRect(),
        targetStyle = window.getComputedStyle(pa,null),
        fixed = targetStyle.getPropertyValue('position') === "fixed",
        dataTooltipHeader = pa.getAttribute('data-pt-header'),
        dataTooltipNote = pa.getAttribute('data-pt-note'),
        step = parseInt(pa.getAttribute('data-pt-step')),
        customHTML = pa.getAttribute('data-pt-custom'),
        tooltipContent = {
          header: objectTooltipHeader ? objectTooltipHeader : dataTooltipHeader,
          note: objectTooltipNote ? objectTooltipNote : dataTooltipNote,
        },
        tooltipPosition = {
          top: fixed ? pos.top + pos.height + options.tooltip.offset.top : pos.top + pos.height + options.tooltip.offset.top + window.scrollY,
          left: fixed ? pos.left + pos.width/2 - style.tooltip.width/2 + options.tooltip.offset.left : pos.left + pos.width/2 - style.tooltip.width/2 + options.tooltip.offset.left + window.scrollX,
          position: fixed ? 'fixed' : 'absolute',
        },
        progressIndicator = options.tooltip.progress ?
        <div style={style.progress}> {this.props.stepCount+1} </div> : null,
        tooltipStyle = Object.assign({},tooltipPosition,style.tooltip),
        tip = options.tooltip.tip.display ?
          <div style={style.tooltip.tip}></div> : null;
    var tooltip =
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
      </div>;
    var showTooltip = this.props.id == this.props.step ? tooltip : null;
    return (
      <VelocityTransitionGroup enter={{animation: "transition.expandIn"}} leave={{animation: "transition.expandOut"}}>
        {showTooltip}
      </VelocityTransitionGroup>
    );
  }
}
