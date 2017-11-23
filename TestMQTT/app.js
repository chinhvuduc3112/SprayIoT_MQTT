var http     = require('http')
    , express = require('express')
    , app = express()
    , httpServ = http.createServer(app)
    , mosca    = require('mosca')
    , mqttServ = new mosca.Server({})
    , path = require('path')
    , mongoose = require('mongoose')
    , models = require('./models')
    , DeviceNodeHandler = require('./DeviceNodeHandler')
    , Buffer = require('buffer').Buffer;
    

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SprayIoT', {
  useMongoClient: true,
  /* other options */
}),

mqttServ.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
mqttServ.on('published', function(packet, client) {
  // console.log(packet);
  
  if (packet.topic == '/addDataSensor') {
    let data = JSON.parse(packet.payload.toString());
    let deviceNodeName = data.deviceNodeName;
    let time = new Date(parseInt(data.time));
    let dataSen = data.data;

    DeviceNodeHandler.updateDeviceNode(deviceNodeName, data).then(data => {
      let publishData = {
        name: data.name,
        id: data._id,
        status: data.status,
        time: data.time,
        function: data.function
      }
      // console.log(publishData);
      
      let payload = Buffer.from(JSON.stringify(publishData), 'utf8');
      let myPacket = packet;
      myPacket.payload = payload;
      myPacket.topic = '/function';
      
      mqttServ.publish(myPacket, client);
    }).catch(e => {
      console.log(e);
    });
  }
});

mqttServ.on('ready', () => {
  console.log('MQTT server is listen on port ' + 1883);
});


mqttServ.attachHttpServer(httpServ);
app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/a.html'));
})

httpServ.listen(3000);

