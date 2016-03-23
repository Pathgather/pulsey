import React from 'react'
import { VelocityReact, VelocityComponent, VelocityTransitionGroup } from 'velocity-react'
import { style } from '../styles/underlay.styles'

export default class Underlay extends React.Component {
  render() {
    var options = this.props.options,
        close = options.underlay.clickToClose ? this.props.close : null,
        underlay = <div style={style} onClick={close}></div>,
        showUnderlay = this.props.id == this.props.step ? underlay : null;
    return (
      <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
        {showUnderlay}
      </VelocityTransitionGroup>
    );
  }
}
