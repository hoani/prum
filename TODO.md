
[X] UI
  [X] Add leetware logo and power indicator to header top right

[] Every dispatch rerenders all modules - we should look at a batch new data dispatch instead to deal with
  all data items at once

[] Connect GUI
  [] Link text input to connect button
    - add to redux a set of input states, in this case:
      input: {
        tcp/addr: "", 
        control/pid/kp: "",
        control/pid/ki: "",
        control/pid/kd: "",
        control/pid/setpoint: "",
      }

[] Add health GUI
[] Add PID GUI






