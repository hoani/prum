
[X] UI
  [X] Add leetware logo and power indicator to header top right

[X] Every dispatch rerenders all modules - we should look at a batch new data dispatch instead to deal with
  all data items at once
  [X] Resolve the plotting problem

[X] Connect GUI
  [X] Link text input to connect button
    - add to redux a set of input states, in this case:
      input: {
        tcp/addr: "",
        control/pid/kp: "",
        control/pid/ki: "",
        control/pid/kd: "",
        control/pid/setpoint: "",
      }

[] Add PID GUI
  [] Gain inputs and update button
    [X] Layout
    [] Disable/Enable on incorrect inputs
    [] Send updates to robot
  [] Setpoint Input and update button
    [X] Layout
    [] Disable/Enable on incorrect inputs
    [] Send updates to robot
  [] Enable toggle
    [X] Layout
    [] Enable/disable PID control toggle
    [] Sticks on when enabled
    [] Sticks off when disabled
  [X] Show yaw and pitch angles
  [] Show motor input

[] Add diagnostics GUI
  [] CPU Usage
  [] Battery
  [] Accelerometer
  [] Gyros
  [] Magnetometer

[] clean up unnecessary imports on files







