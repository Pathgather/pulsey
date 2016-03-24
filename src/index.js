import React from 'react'
import ReactDOM from 'react-dom'
import options from './options'
import Pulsey from 'components/Pulsey'

function pulsey(userInput) {
  Object.assign(options, userInput.defaultOptions);
  ReactDOM.render(<Pulsey
    options={options}
    tour={userInput.tour}
  />,
  document.getElementById('pulsey'));
}

// User launches pulsey with the following function call.

pulsey({
  defaultOptions: {
    //overrides defaults set in options.js
  },
  createSteps: [
    {
      create: true,
      header: 'yebo',
      note: 'bebo',
      step: 1,
      nextButton: 'Next',
      finishButton: 'Finish',
      skipButton: null,
      stepIndicator: true,
      style: {
        dot: {
          offset: {
            top: 20,
            left: 0,
          },
          front: {
            width: 25,
            height: 25,
            borderRadius: '100%',
          },
          back: {
            width: 25,
            height: 25,
            borderRadius: '100%',
          },
        },
        tooltip: {
          width: 250,
        },
        tip: {
          side: 'top',
          background: '#fff',
        }
      }
    }
  ]
});
