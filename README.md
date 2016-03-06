# Pulsey
Create beautiful pulsey tours for your app

Component Map
- 1 Pulsey
- 2 Dot
- 3 Underlay
- 4 Tooltip
- 5 Welcome
- 6 Progress

OPTIONS
- utilities
  - launch
  - storage
  - ordered
  - keyboardNav
  - animateScroll
  - defaultStyles
  - defaultAnimations
  - callbacks
    - tourComplete
    - stepComplete
    - exitTour  
- dot
  - style
  - animation
  - counter
    - style
    - animation
  - offset
    - left
    - top
- tooltip
  - style
  - animation
  - offset
    - left
    - top
  - counter
    - style
  - edgesense
  - arrow
    - display
    - style
  - closeButton
    - display
    - style
  - nextButton
    - display
    - style
    - text
  - endButton
    - display
    - style
    - text
  - content
    - header
      - display
      - style
      - text
    - note
      - display
      - style
      - text
- underlay
  - style
  - animation
- welcome
  - use
  - style
  - header
    - style
    - text
  - note
    - style
    - text
  - continueButton
    - style
- progress
  - display
  - container
  - style

STYLES
- tour
- dot
- tooltip
- underlay
- welcome
- progress


NEXT FEATURES
Completed: 8/14

- basic optional welcome screen and finish screen with customizable header, message, button, etc.
- progress/step badges and/or progress bar
- tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off
- provide user with multiple pre-designed options for look and animation of dots and tooltips just by changing one option.  or they can choose to use their own css.

FEATURES

- user chooses html elements to be dotted
- no jQuery required (requires Velocity)
- each element has its own class that the user can easily identify and use to modify the styles without having to dive into the code or api
- option to have tooltip arrow or not, and which side it will be on
- give each dot a class of "pulsey-dot-" + po.dot.id so users can easily customize the CSS without using the API

ISSUES

- options are not currently specific to each dot and each tooltip - they're global and shouldn't be
- tooltip needs to be based off the outside of the pulsey target, not off the center
- only want to transition underlay on dotclick() and close() (not nextStep())
- nextLabel doesn't change to 'finish' when removeStepOnClick is false
