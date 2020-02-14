[X] Enable faster UI Testing
  [X] Extract comms from app.js
  [X] Make fake robot data simulator
[X] Structure
  [X] Move reducer into src
  [X] Move comms into src
[X] Implement progress circle with icon
[X] Progress circle value:
  [X] Seperate out multiplier from display multiplier
  [X] Add a unit parameter (can be empty by default)
  [X] Add format parameter (can be {:3f} by default)
  [X] Autoscale based on definable height
  [X] Add bar color changes based on percentage
[X] Icon progress circle:
  [X] Autoscale based on definable height
  [X] Bar color changes based on percentage
  [X] Add text option
  [X] If no icon is defined, make it default to text progress circle
  [X] Tidy up progress bar defaults
[] Connect page
  [] pass all screens to this page from the app file as a config
  [] Create a connected redux action and state
  [] Disable all subpages until connected
  [] Switch connect button to a disconnect button when connected
  [] Disable all subpages after disconnect
[X] UI Layout
  [X] Checkout https://facebook.github.io/react-native/docs/navigation
  [X] Work through the fundamentals: https://reactnavigation.org/docs/en/navigating.html
  [X] Decide on navigation scheme. Want:
    - landing page, pref connection page?
    - One page per GUI, navigation by swiping left/right
    - Some key elements which stick to all pages (health, connection, etc)
[] Plotting
  [X] Default colors for multi plots
  [X] Turn plot single into a specialized multiplot
  [] Create plot3DOF as a specialized multiplot
  [] Consider the 1, 1.5, 2, 3, 5, 8 scaling strategy
[] Other things
  [] Add leetware logo


Other ideas:
  * Could be useful to make a progress circle in a progress circle?
  * May be nice to have a progress circle with icon which also contains the
  labeled value

