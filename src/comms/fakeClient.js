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

    this.addItem('ahrs/angles/pitch', [70.0], 5.0);
    this.addItem('ahrs/angles/yaw', [0.0], 2.0);

    this.addItem('health/os/cpuse', [40.0], 15.0);
    this.addItem('health/batt/v', [7.6], 0.2);
  }

  addItem(key, profile, noise) {
    this.items[key] = { profile, noise, i: 0 };
  }

  connect(options) {
    this.interval = setInterval(() => this.newData(), ms = 200);
    return (true);
  }

  disconnect() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  send(packets) {
  }

  newData() {
    for (key of Object.keys(this.items)) {
      const item = this.items[key];
      const base = item.profile[item.i];
      const noise = item.noise * (2.0 * Math.random() - 1.0);
      item.i++;
      if (item.i >= item.profile.length) {
        item.i = 0;
      }

      this.store.dispatch({
        type: 'NEW_DATA',
        key: key,
        value: base + noise
      });
    }
  }
}

