import React from 'react';
import ReactDOM from 'react-dom'
import options from './options';
import Pulsey from 'components/Pulsey';

class PulseyTour extends React.Component {
  render() {
    return <Pulsey options={this.props.options} />;
  }
}

function pulsey(userOptions) {
  Object.assign(options,userOptions);
  ReactDOM.render(<PulseyTour options={options}/>,
  document.getElementById('pulsey'));
}

//////////////////////
// USER FILE START //
////////////////////

pulsey({
  welcome: {
    display: true,
  },
  option2: 'even nicer!',
});
