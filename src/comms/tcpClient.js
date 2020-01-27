import tcpSockets from 'react-native-tcp-socket';
import Packet from 'leap-protocol';

export default class TcpClient {
  constructor(port = 11337, host, codec, store) {
    this.port = port;
    this.host = host;
    this.client = null;
    this.codec = codec;
    this.bytes = "";
    this.store = store;
  }

  connect(options) {
    this.client = tcpSockets.createConnection({...options, port: this.port, host: this.host});
    this.client.on('data', this.data.bind(this));
    this.client.on('error', this.error.bind(this));
    return (this.client !== null);
  }

  disconnect() {
    this.client.destroy();
    this.client = null;
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
    for (packet of packets) {
      const unpacked = this.codec.unpack(packet);
      for (key of Object.keys(unpacked)) {
        this.store.dispatch({
          type: 'new_data',
          key: key,
          value: unpacked[key]
        });
      }
    }
  }

  error(error) {
    console.log("TCP ERROR: ", error);
    this.disconnect();
  }
}

