import React from 'react'
import ReactDOM from 'react-dom'
import options from './options'
import Pulsey from 'components/Pulsey'

function pulsey(user) {
  Object.assign(options, user.defaultOverride);
  ReactDOM.render(<Pulsey
    options={options}
    create={user.create}
  />,
  document.getElementById('pulsey'));
}

// User launches pulsey with the following function call.

pulsey({
  defaultOverride: {
    //overrides defaults set in options.js
  },
  create: {
    welcome: {
      header: "Welcome to Pulsey",
      note: "Use Pulsey to create beautiful pulsey tours for your app."
    },
    farewell: {
      header: "Thanks for checking Pulsey out!",
      note: "Don't be a stranger, now."
    },
    steps: [
      {
        display: true,
        header: 'Unified Search',
        note: 'Search here anytime for awesome things to learn!',
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
      },
      {
        display: true,
        header: 'Unified Search 2',
        note: 'Search here anytime for awesome things to learn!',
        step: 2,
        nextButton: 'Next',
        finishButton: 'Finish',
        skipButton: null,
        stepIndicator: true,
      },
      {
        display: true,
        header: 'Unified Search 3',
        note: 'Search here anytime for awesome things to learn!',
        step: 3,
        nextButton: 'Next',
        finishButton: 'Finish',
        skipButton: null,
        stepIndicator: true,
      }
    ]
  }
});
