import React from 'react'
import { VelocityReact, VelocityComponent, VelocityTransitionGroup } from 'velocity-react'

export default class Underlay extends React.Component {
  render() {
    var options = this.props.options;
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
