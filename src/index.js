import React from 'react'
import ReactDOM from 'react-dom'
import options from './options'
import Pulsey from 'components/Pulsey'

function pulsey(userInput) {
  Object.assign(options, userInput.options);
  ReactDOM.render(<Pulsey
    options={options}
    tour={userInput.tour}
  />,
  document.getElementById('pulsey'));
}

// User launches pulsey with the following function call.

pulsey({
  options: {
    welcome: {
      display: true,
    }
  },
  tour: [
    {
      step: 1,
      header: 'yebo',
      note: 'yebobebo',
      overrides: null
    },
    {
      step: 2,
      header: 'We got a second step here',
      note: 'Take notice!',
      overrides: null
    }
  ]
});
