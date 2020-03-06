
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
  [X] Gain inputs and update button
    [X] Layout
    [X] Disable/Enable on incorrect inputs
    [X] Send updates to robot
  [X] Setpoint Input and update button
    [X] Layout
    [X] Disable/Enable on incorrect inputs
    [X] Send updates to robot
  [X] Enable toggle
    [X] Layout
    [X] Enable/disable PID control toggle
    [X] Sticks on when enabled
    [X] Sticks off when disabled
  [X] Show yaw and pitch angles
  [] Test with Robot

[] Add diagnostics GUI
  [] CPU Usage
  [] Battery
  [] Accelerometer
  [] Gyros
  [] Magnetometer

[X] clean up unnecessary imports on files







