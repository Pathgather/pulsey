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


NEXT FEATURES (no additions allowed!)
Completed: 7/16

- basic optional welcome screen and finish screen with customizable header, message, button, etc.
- progress/step badges and/or progress bar
- detect if no dots are left, and show "finish" in place of "next" in the next button
- send an event whenever a dot is clicked or tour is started or completed so user can listen for the events and do something
- ability to pass Pulsey a custom ID that the user can use to identify who is taking the tour and that they've completed it (as opposed to relying on localStorage)
- option to use sessionStorage instead of localStorage
- allow user to put html inside tooltip via data attribute
- provide user with multiple pre-designed options for look and animation of dots and tooltips just by changing one option.  or they can choose to use their own css.
- tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off

FEATURES

- user chooses html elements to be dotted
- no jQuery required (requires Velocity)
- each element has its own class that the user can easily identify and use to modify the styles without having to dive into the code or api
- option to have tooltip arrow or not, and which side it will be on
- give each dot a class of "pulsey-dot-" + po.dot.id so users can easily customize the CSS without using the API

ISSUES

- options are not currently specific to each dot and each tooltip - they're global and shouldn't be
- auto-scrolling not working correctly (not properly aligned with steps)
- need to stress-test the way clicking through dots works, their ordering, etc.
- on screenresize (and probably scroll) don't want highlight-back element to have a transition duration (currently lags and looks bad)
- tooltip needs to be based off the outside of the pulsey target, not off the center
- only want to remove highlight-target class from target element after highlighter has completed transition to next step
- only want to transition underlay on dotclick() and close()
