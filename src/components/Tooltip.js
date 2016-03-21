import React from 'react';
import {VelocityReact, VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

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
