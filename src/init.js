export default function pulseyInit() {
  // var
  //   psAnchors = document.getElementsByClassName('ps-anchor'),
  //   psWelcome = document.getElementsByClassName('ps-welcome')[0],
  //   psFarewell = document.getElementsByClassName('ps-farewell')[0],
  //   welcomeHeader = psWelcome.getAttribute('data-ps-header'),
  //   welcomeNote = psWelcome.getAttribute('data-ps-content'),
  //   farewellHeader = psFarewell.getAttribute('data-ps-header'),
  //   farewellNote = psFarewell.getAttribute('data-ps-content'),
  //   pulseyTargets = Array.prototype.slice.call(psAnchors),
  //   pulseyTargetsSteps = [],
  //   noStepGiven = 0;
  window.psAnchors = document.getElementsByClassName('ps-anchor');
  window.psWelcome = document.getElementsByClassName('ps-welcome')[0];
  window.psFarewell = document.getElementsByClassName('ps-farewell')[0];
  window.welcomeHeader = psWelcome.getAttribute('data-ps-header');
  window.welcomeNote = psWelcome.getAttribute('data-ps-content');
  window.farewellHeader = psFarewell.getAttribute('data-ps-header');
  window.farewellNote = psFarewell.getAttribute('data-ps-content');
  window.pulseyTargets = Array.prototype.slice.call(psAnchors);
  window.window.pulseyTargetsSteps = [];
  window.noStepGiven = 0;
  for (var i = 0; i < pulseyTargets.length; i++) {
    var step = pulseyTargets[i].getAttribute('data-ps-step');
    if (step == '' || step == null) {
      noStepGiven++;
    }
    else {
      pulseyTargetsSteps.push(parseInt(step));
    }
  }
  var ptsClone = pulseyTargetsSteps.slice();
  ptsClone.sort(function(a,b) {
    return a - b;
  });
  var nextPsStep = ptsClone.slice(-1)[0] ? ptsClone.slice(-1)[0] + 1 : 1;
  if (noStepGiven > 0) {
    for (var i = 0; i < noStepGiven; i++) {
      pulseyTargetsSteps.push(nextPsStep);
      nextPsStep++;
    }
  }
  else {
    for (var i = 0; i < noStepGiven; i++) {
      nextPsStep++;
      stepsArray.push(nextPsStep);
    }
  }
  window.targetsArray = pulseyTargets.slice();
  window.stepsArray = pulseyTargetsSteps.slice();
  stepsArray.sort(function(a,b) {
    return a - b;
  });
}
