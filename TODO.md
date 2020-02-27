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
[X] Connect page
  [X] pass all screens to this page from the app file as a config
  [X] Create a "connected" redux action and state
  [X] Switch connect button to a disconnect button when connected
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
  [X] Create plot3DOF as a specialized multiplot
  [X] Show Legend
  [X] Show Title
  [X] Add YAxis
  [] Consider the 1, 1.5, 2, 3, 5, 8 scaling strategy
[] Other things
  [] Add leetware logo
[] Redux tidy up
  [X] Refactor the reducer so that we can split state among reducers
  [] Make `new_data` = `newData`

[] Every dispatch rerenders all modules - we should look at a batch new data dispatch instead to deal with
  all data items at once



