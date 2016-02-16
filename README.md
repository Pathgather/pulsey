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

CORE
- detect if next pulse is offscreen and animate document scroll to it
- tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off
- give users option for Tooltip component to animate between dots, in addition to current version.
- Pulsey shows ordered or unordered dots
- option to show dot or not (in case they just want to use the next button)
- basic optional welcome screen with customizable header, message, button, etc.

NICETIES
- swap text of next button with 'finish' if its the last dot
- option to nav by keyboard
- detect if no dots are left, and show "finish" in place of "next" in the next button
- provide user with multiple pre-designed options for look and animation of dots and tooltips just by changing one option.  or they can choose to use their own css.
- ability to turn clickToClose off for underlay
- option for introjs-like highlight of target element - pretty simple, make z-index super high and add a div of same size underneath it to add box-shadow
- send an event whenever a dot is clicked or tour is started or completed so user can listen for the events and do something
- ability to pass Pulsey a custom ID that the user can use to identify who is taking the tour and that they've completed it (as opposed to relying on localStorage)
- option to use sessionStorage instead of localStorage
- optional progress bar, whose look can be customized
- allow user to put html inside tooltip via data attribute
- cleanup and optimize for easy installation and use by randos
- create clear and helpful documentation
- create demo and open source

FEATURES
- user chooses html elements to be dotted
- no jQuery required (requires Velocity)
- each element has its own class that the user can easily identify and use to modify the styles without having to dive into the code or api
- option to have tooltip arrow or not, and which side it will be on
- give each dot a class of "pulsey-dot-" + po.dot.id so users can easily customize the CSS without using the API

NEW FEATURE IDEAS

ISSUES
- options are not currently specific to each dot and each tooltip - they're global and shouldn't be
