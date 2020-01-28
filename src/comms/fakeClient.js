export default class Client {
  constructor(port = 11337, host, codec, store) {
    this.interval = null;
    this.client = null;
    this.codec = codec;
    this.bytes = "";
    this.store = store;
    this.items = {};
  }

  addItem(key, profile, noise) {
    this.items[key] = { profile, noise, i: 0 };
  }

  connect(options) {
    this.interval = setInterval(newData, ms = 200);
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
      const noise = 0;
      item.i++;
      if (item.i >= item.profile.length) {
        item.i = 0;
      }

      this.store.dispatch({
        type: 'new_data',
        key: key,
        value: base + noise
      });
    }
  }
}

