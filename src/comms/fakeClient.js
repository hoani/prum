import { connected } from '../state/reducer';

const pitchValues = [
  -120, -115, -110, -105, -100, -95, -90, -85, -80, -75, -70,
  -65, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10,
  -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
  75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 110, 90, 85, 40,
  10, -15, -30, -50, -80, -110,
  -140, -150, -170, -190, -180, -170, -160,
  -140, -150, -170, -190, -180, -170, -160,
  -140, -150, -170, -190, -180, -170, -160,
  -140, -150, -170, -190, -180, -170, -160,
];

export default class Client {
  constructor(port = 11337, host, codec, store) {
    this.interval = null;
    this.items = {};
    this.store = store;

    this.addItem('imu/accel/x', [1.0], 1.0);
    this.addItem('imu/accel/y', [-1.0], 1.2);
    this.addItem('imu/accel/z', [9.82], 0.9);

    this.addItem('imu/gyros/x', [0.4], 0.3);
    this.addItem('imu/gyros/y', [-0.7], 0.5);
    this.addItem('imu/gyros/z', [0.2], 0.45);

    this.addItem('imu/magne/x', [26.3], 4.5);
    this.addItem('imu/magne/y', [-37.1], 3.4);
    this.addItem('imu/magne/z', [-20.8], 5.7);

    this.addItem('ahrs/angles/pitch', pitchValues, 5.0);
    this.addItem('ahrs/angles/yaw', [0.0], 2.0);

    this.addItem('health/os/cpuse', [40.0], 15.0);
    this.addItem('health/batt/v', [7.6], 0.2);
  }

  addItem(key, profile, noise) {
    this.items[key] = { profile, noise, i: 0 };
  }

  connect(options) {
    this.interval = setInterval(() => this.newData(), ms = 200);
    this.store.dispatch({
      type: 'CONNECTED',
      isConnected: true
    });
    return (true);
  }

  disconnect() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.store.dispatch({
        type: 'CONNECTED',
        isConnected: false
      });
      this.interval = null;
    }
  }

  send(packets) {
  }

  newData() {
    let newData = {}
    for (key of Object.keys(this.items)) {
      const item = this.items[key];
      const base = item.profile[item.i];
      const noise = item.noise * (2.0 * Math.random() - 1.0);
      item.i++;
      if (item.i >= item.profile.length) {
        item.i = 0;
      }

      newData[key] = base + noise;
    }
    this.store.dispatch({
      type: 'NEW_DATA',
      data: newData,
    });
  }
}

