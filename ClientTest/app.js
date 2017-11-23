var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.1.9')
// ws://firstbrokerip:9001
client.on('connect', function () {
  client.subscribe('/function')
})

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(JSON.parse(message.toString()));
  // client.end()
})

// setInterval(() => {
  // data tu Pi gui len khi co 
  let data = {
    deviceNodeName: "Lux0x416303FF",
    time: 1509551626733,
    data: 55
  };
  client.publish('/addDataSensor', JSON.stringify(data));
//   client.publish('/addDataSensor', JSON.stringify({
//     deviceNodeName: "Lux416303FF",
//     time: 1508074757349,
//     data: 123456
//   }));
// }, 5000);