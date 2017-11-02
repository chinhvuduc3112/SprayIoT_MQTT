var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.4')
// ws://firstbrokerip:9001
client.on('connect', function () {
  console.log('abc')
  client.subscribe('/updateDataActuator')
})

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString())
  // client.end()
})

// setInterval(() => {
  let data = {
    deviceNodeName: "Shum0x416303FF",
    time: 1509551626733,
    data: 123456
  };
  client.publish('/addDataSensor', JSON.stringify(data));
//   client.publish('/addDataSensor', JSON.stringify({
//     deviceNodeName: "Lux416303FF",
//     time: 1508074757349,
//     data: 123456
//   }));
// }, 5000);