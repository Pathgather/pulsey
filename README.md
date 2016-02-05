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
- fix next button
- fix animations when going form one dot to another
- tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off
- detect if next pulse is offscreen and animate document scroll to it

- consider changing Tooltip component so it is just one that follows the dots, so you can animate transition between the dots.  this could be an option.
- create next and skip tour buttons, which can be turned on or off
- Pulsey shows ordered or unordered dots
- clicked dots show html, which the user adds using data attributes in their html file.
- option to show dot or not (in case they just want to use the next button)
- determine next dot to show by looking at dot ids if ps-step hasn't been set by user
- pulses stay with html element, regardless of screen width changes, positioning changes, or scrolling (issue)
- detect mobile devices and be mobile friendly
- provide user with multiple pre-designed options for look and animation of dots and tooltips just by changing one option.  or they can choose to use their own css.
- sends an event whenever a dot is clicked or tour is started or completed so user can listen for the events and do something
- option to nav by keyboard
- ability to pass Pulsey a custom ID that the user can use to identify who is taking the tour and that they've completed it (as opposed to relying on localStorage)
- option to use sessionStorage instead of localStorage
- basic optional welcome screen with customizable header, message, button, etc.
- optional progress bar, whose look can be customized

COMPLETED FEATURES
- fix the way you handle screen size changes and scrolling
- user chooses html elements to be dotted
- no jQuery required (requires Velocity)
- each element has its own class that the user can easily identify and use to modify the styles without having to dive into the code or api
- option to have tooltip arrow or not, and which side it will be on

NEW FEATURE IDEAS
- give each dot a class of "pulsey-dot-" + po.dot.id so users can easily customize the CSS without using the API
- two options for tooltips - use same one that animates between dots, and one where each dot has its own tooltip

ISSUES
- properly import velocity.ui.js from node_modules
- options are not currently specific to each dot and each tooltip - they're global and shouldn't be

NOTES
triggering next dot
- we initialize the state of showDot to this.props.po.dot.id == options.dot.firstDotId, which is set to 1 by default
- click next button, triggers onClick event which triggers pulsey handler,
- which sets a pulsey state of showDot to Pulsey's state id to += 1
- Dot has state of showDot: this.props.nextDot == this.po.dot.id
- and then we have this.state.showDot ? dot : null;
