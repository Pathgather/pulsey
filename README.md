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
dot
  style
  animation
  counter
    style
    animation
  offset
    left
    top
tooltip
  style
  animation
  offset
    left
    top
  counter
    style
  edgesense
  arrow
    display
    style
  closeButton
    display
    style
  nextButton
    display
    style
    text
  endButton
    display
    style
    text
  content
    header
      display
      style
      text
    note
      display
      style
      text
underlay
  style
  animation
welcome
  use
  style
  header
    style
    text
  note
    style
    text
  continueButton
    style
progress
  display
  container
  style

STYLES
tour
dot
tooltip
underlay
welcome
progress

  FEATURES
  - user chooses html elements to be dotted
  - PulseyTour shows ordered or unordered dots
  - clicked dots show html, which the user adds using data attributes in their html file.  optional next/skip buttons
  - underlay can have 0 to 1 opacity
  - pulse's stay with html element, regardless of screen width changes, positioning changes, or scrolling
  - must detect mobile devices and be mobile friendly - allow them to enter a second comma-separate option for any mobile differences?
  - provide user with multiple pre-designed options for look and animation of dots and tooltips just by changing one option.  or they can choose to use their own css.
  - tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off
  - sends and event whenever a dot is clicked or tour is started or completed so user can listen for the events and do something
  - option to 'highlight' the anchor element
  - option to choose which direction tooltip pops
  - option to nav by keyboard
  - incredibly easy to use and customize
  - optional progress bar, whose look can be customized
  - each element has its own class that the user can easily identify and use to modify the styles without having to dive into the code or api
  - PulseyTour listens for an event befoe starting.  that event is when the document loads by default.
  - ability to pass PulseyTour a custom ID that the user can use to identify who is taking the tour and that they've completed it (as opposed to relying on localStorage)
  - option to use sessionStorage instead of localStorage
  - no jQuery required (requires Velocity)
  - option to show/not show and position the triangle arrow
  - detect if next pulse is offscreen and animate document scroll to it
  - basic optional welcome screen with customizable header, message, button, etc.
