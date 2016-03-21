var options;
export default options = {
  pulsey : {
    tourStarted: false,
    tourCompleted: false,
    tourSkipped: [],
  },
  dot: {
    step: null,
    offset: {
      top: 0,
      left: 0,
    },
    showDots: true,
  },
  tooltip: {
    width: '250',
    content: {
      header: 'Header not set',
      note: 'Note not set',
    },
    tip: {
      display: true,
      side: 'top',
      size: 10,
    },
    offset: {
      top: 20,
      left: 0,
    },
    labels: {
      next: 'Next',
      finish: 'Finish',
    },
    progress: true,
  },
  highlighter: {
    display: true,
  },
  welcome: {
    display: window.psWelcome,
    fixed: true,
  },
  farewell: {
    display: window.psWelcome,
    fixed: true,
  },
  underlay: {
    clickToClose: true,
  },
  storage: 'localStorage',
  removeStepOnClick: true,
  hideDotOnClick: true,
}
