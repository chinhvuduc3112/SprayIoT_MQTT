var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.4')
// ws://firstbrokerip:9001
client.on('connect', function () {
	console.log('abc')
  // client.subscribe('topic/led')
  
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString())
  // client.end()
})

setInterval(() => {
  let data = {
    deviceNodeId: "59999aa1df986f212c94f275", 
    time: 1508074757349,
    data: 1112};
    client.publish('/addDataSensor', JSON.stringify(data));
}, 5000);
  // let data = {
  //   x: Math.random() * 7,
  //   y: Math.random() * 7,
  //   status: Math.round(Math.random())
  // };
  // client.publish('updateloc', JSON.stringify(data));