
const net = require('react-native-tcp-socket').default;
const leap = require('leap-protocol');

export default class TcpClient {
  constructor(port = 11337, host, codec) {
    this.port = port;
    this.host = host;
    this.client = null;
    this.codec = codec;
    this.bytes = "";
  }

  connect() {
    this.client = net.createConnection({port: 11337, host: '192.168.1.13'});
    this.client.on('data', this.data); 
    this.client.on('error', this.error); 
    return (this.client !== null);
  }
  
  disconnect() {
    this.client.destroy();
    this.client = null;
  }

  send(packets) {
    if (packets instanceof leap.Packet) {
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
    [this.bytes, packets] = codec.decode(this.bytes);
    for (packet of packets) {
      unpacked = codec.unpack(packet);
      for (key of Object.keys(unpacked)) {
        store.dispatch({
          type: 'new_data',
          key: key,
          value: unpacked[key]
        });
      }
    }
  }

  handleError() {
    console.log("TCP ERROR: ", error);
    this.disconnect();
  }
}

