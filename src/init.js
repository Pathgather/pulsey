var
  psAnchors = document.getElementsByClassName('pt-anchor'),
  psWelcome = document.getElementsByClassName('pt-welcome')[0],
  psFarewell = document.getElementsByClassName('pt-farewell')[0],
  welcomeHeader = psWelcome.getAttribute('data-pt-header'),
  welcomeNote = psWelcome.getAttribute('data-pt-content'),
  farewellHeader = psFarewell.getAttribute('data-pt-header'),
  farewellNote = psFarewell.getAttribute('data-pt-content'),
  pulseyTargets = Array.prototype.slice.call(psAnchors),
  pulseyTargetsSteps = [],
  noStepGiven = 0;
console.log(pulseyTargets);
for (var i = 0; i < pulseyTargets.length; i++) {
  var step = pulseyTargets[i].getAttribute('data-pt-step');
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

export { psAnchors, psWelcome, psFarewell, welcomeHeader, welcomeNote, farewellHeader, farewellNote, pulseyTargets, pulseyTargetsSteps }
