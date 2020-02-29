import tcpSockets from 'react-native-tcp-socket';
import {Packet} from 'leap-protocol';

export default class Client {
  constructor(port = 11337, host, codec, store) {
    this.port = port;
    this.host = host;
    this.client = null;
    this.codec = codec;
    this.bytes = "";
    this.store = store;
  }

  connect(options) {
    console.log(options)
    this.client = tcpSockets.createConnection({ port: this.port, ...options});
    this.client.on('data', this.data.bind(this));
    this.client.on('error', this.error.bind(this));
    this.store.dispatch({
      type: 'CONNECTED',
      isConnected: true
    });
    return (this.client !== null);
  }

  disconnect() {
    this.client.destroy();
    this.client = null;
    this.store.dispatch({
      type: 'CONNECTED',
      isConnected: false
    });
  }

  send(packets) {
    if (packets instanceof Packet) {
      packets = [packets];
    }
    let data = "";
    for (packet of packets) {
      data += this.codec.encode(packet);
    }
    this.client.write(data);
  }

  data(data) {
    this.bytes += data;
    [this.bytes, packets] = this.codec.decode(this.bytes);
    for (let packet of packets) {
      const newData = {}
      const unpacked = this.codec.unpack(packet);
      for (const key in unpacked) {
        newData[key] = unpacked[key];
      }
      this.store.dispatch({
        type: 'NEW_DATA',
        data: newData,
      });
    }
    
  }

  error(error) {
    console.log("TCP ERROR: ", error);
    this.disconnect();
  }
}

