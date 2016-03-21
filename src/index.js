import React from 'react';
import ReactDOM from 'react-dom'
import options from './options';
import pulseyInit from './init';
import Pulsey from 'components/Pulsey';
import Dot from 'components/Dot';
import Tooltip from 'components/Tooltip';
import Highlighter from 'components/Highlighter';
import Underlay from 'components/Underlay';

class PulseyTour extends React.Component {
  render() {
    return (
      <div>
        <Pulsey options={this.props.options}/>
      </div>
    );
  }
}

function pulsey(userOptions) {
  pulseyInit();
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
