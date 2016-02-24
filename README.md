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
Completed: 3/17

- give users option for Tooltip component to animate between dots, in addition to current version (UniTooltip)
- option for dots to be hidden

- tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off
- basic optional welcome screen and finish screen with customizable header, message, button, etc.
- progress/step badges and/or progress bar
- detect if no dots are left, and show "finish" in place of "next" in the next button
- ability to turn clickToClose off for underlay
- option for introjs-like highlight of target element - pretty simple, make z-index super high and add a div of same size underneath it to add box-shadow
- send an event whenever a dot is clicked or tour is started or completed so user can listen for the events and do something
- ability to pass Pulsey a custom ID that the user can use to identify who is taking the tour and that they've completed it (as opposed to relying on localStorage)
- option to use sessionStorage instead of localStorage
- allow user to put html inside tooltip via data attribute
- provide user with multiple pre-designed options for look and animation of dots and tooltips just by changing one option.  or they can choose to use their own css.
- option to be able to go back and forth between dots (as opposed to current situation where we store them in local storage and you can)

ICEBOX

- options are not currently specific to each dot and each tooltip - they're global and shouldn't be

FEATURES

- user chooses html elements to be dotted
- no jQuery required (requires Velocity)
- each element has its own class that the user can easily identify and use to modify the styles without having to dive into the code or api
- option to have tooltip arrow or not, and which side it will be on
- give each dot a class of "pulsey-dot-" + po.dot.id so users can easily customize the CSS without using the API
