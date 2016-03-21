# Pulsey
Create beautiful pulsey tours for your app

GETTING STARTED
- users choose html elements that they want to be included in the tour by adding the class 'ps-anchor'
- users may optionally specify the order of their tour by passing a number to a data-ps-step attribute
  - however, this is not required.  if users do not specify a data-ps-step, pulsey will add one for them in the order that they appear in the html.  pulsey will also handle the case where the user only sets data-ps-step for some and not others
- users should specify the content of their tooltip in data-attributes as well, namely data-ps-header and data-ps-note.  in future release user will be able to put html inside the tooltip
- once the 'ps-anchor' classes are set and data-attributes are supplied, users can just add 'pulsey()' to their js and pulsey ...should... just work

FEATURES
- once pulsey() is called, one of a couple things will happen depending upon how options are configured
  - in all cases, all targeted html elements will receive a pulsey dot at their center
  - if a number is passed to options.dot.step (default is null) then pulsey will automatically start at that step
  - if options.welcome.display is true, pulsey will show an intro screen prior to the first tooltip/dot
- if options.highlighter.display is true, the target html element will receive a highlighting div that will transition between each step
- navigate by clicking the next button or the arrow keys
- if any of the target html elements have fixed position pulsey will have already accounted for this
- pulsey dots track their html targets responsively
- each pulsey component has its own class ('pulsey-dot-' + {this.props.id}) that users can use to easily customize styling
- no jQuery required (requires Velocity)
- other awesome stuff, and more to come, maybe

OPTIONS
- pulsey
  - tourStarted: boolean
  - tourCompleted: boolean
  - tourSkipped: array // if user skips, pulsey creates an array with the step skipped on and how many remaining steps
  - keyboardNav: boolean // currently N/A
  - animateScroll: boolean // currently N/A
- dot
  - step: integer // default is null; change to a number to specify which step you would like tour to start on
  - offset
    - top: integer
    - left: integer
  - showDots: boolean // gives you option to allow users to pick and choose which dots they want to start on, or else be required to follow the order you specify
- tooltip
  - width: integer
  - content
    - header: string
    - note: string
  - tip
    - display: boolean
    - side: string // accepts one of 'top', 'bottom', 'left', 'right'
    - size: integer
  - offset
    - left: integer
    - top: integer
  - labels
    - next: 'string' // label for button that triggers next tooltip to be shown
    - finish: 'string' // label for button that is shown on the last tooltip, immediately prior to tourComplete
  - progress: boolean // show or hide a step progress counter
  - edgesense: boolean // currently N/A
  - showButtons // currently N/A
    - close: boolean
    - next: boolean
    - previous: boolean
    - skip: boolean
- highlighter
  display: boolean // when true a highlight div is placed underneath the target element and that element's z-index is raised above the underlay
- welcome
  - display: boolean // an optional welcome modal prior to commencement of tour
  - fixed: boolean // when false, position is absolute
  - header: string // currently N/A
  - note: string // currently N/A
- farewell
  - display: boolean // an optional farewell modal once last tooltip has been completed
  - fixed: boolean // when false, position is absolute
  - header: string // currently N/A
  - note: string // currently N/A
  - finishButton: boolean
- underlay
  - clickToClose: boolean // when true clicking anywhere outside of the tooltip (ie clicking the underlay) will close the tooltip
- storage : 'string' // accepts one of 'localStorage' or 'sessionStorage'; default is 'localStorage'
- removeStepOnClick: boolean // when true, pulsey will only show a tooltip once
- hideDotOnClick: boolean // if removeStepOnClick is false, leaving this as true will ensure that the dots are not shown

STYLES // readme forthcoming - still need to determine what needs to be customizable and what doesn't
- dot
- tooltip
- underlay
- welcome
- farewell
- progress

NEXT
- animate pulses via velocity
- ensure it works with a react app (not html-based)
- make sure that whenever app rerenders/receives new data Pulsey recognizes this and updates

ISSUES
- some variables are being stored on the window and probably shouldn't be - find a better way
- options are not currently specific to each dot and each tooltip - they're global and shouldn't be
- tooltip needs to be based off the outside of the pulsey target, not off the center
- only want to transition underlay on dotclick() and close() (not nextStep())
- nextLabel doesn't change to 'finish' when removeStepOnClick is false
- highlighter doesn't disappear after farewell screen is clicked
- highlighter shouldnt be shown unless no steps have been clicked yet

FUTURE
- give user option to use without velocity (and thus no animations)
- consider giving alternative to data attributes (pass in through javascript)
- customizable look and animation of dots and tooltips
- test and fix lots of issues
- tooltips recognize whether they are overflowing the screen and reposition themselves automatically, unless user decides to turn this functionality off
- allow users to put html inside tooltip
- give user a way to modify styles of each individual dot - probably need to object.assign each styles object for each component with whatever the user passes in via pulsey()
