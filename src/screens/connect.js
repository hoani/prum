export default class ConnectScreen extends React.Component {
  render() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image
                resizeMode="center"
                width={Dimensions.get('window').width}
                source={require("./images/autodesk.png")}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Button
                onPress={() => {
                  client.connect({localAddress: 'localhost'});
                }}
                title="Connect"
              />
              <Text style={styles.sectionTitle}>Hoani's Robot Control</Text>
              <Text style={styles.sectionDescription}>
                Manual Control
              </Text>
            </View>

            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:10, flexDirection:'column'}}>
                <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['FW', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="Forward"
                    />
                  </View>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                </View>
                <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['LT', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="Left"
                    />
                  </View>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['RT', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="RIGHT"
                    />
                  </View>
                </View>
                <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['BW', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="Reverse"
                    />
                  </View>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                </View>
              </View>
              <View style={{flex:1}} />
              <View style={{flex:3}} >
                <ProgressCircleValue path="health/os/cpuse" multiplier={0.01} />
              </View>
              <View style={{flex:1}} />
            </View>
            <View style={{flex:3}}>
              <PlotSingle path = "imu/gyros/x" show_x = {false} />
              <PlotMulti paths = {["imu/gyros/y", "imu/gyros/z"]} colors = {['#8a2be2', '#ff1493']}/>
              <PlotMulti paths = {["imu/accel/x", "imu/accel/y","imu/accel/z"]} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
  );
                    }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});