var http     = require('http')
    , express = require('express')
    , app = express()
    , httpServ = http.createServer(app)
    , mosca    = require('mosca')
    , mqttServ = new mosca.Server({})
    , path = require('path')
    , mongoose = require('mongoose')
    , models = require('./models')

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
  if (packet.topic == '/addDataSensor') {
    let data = JSON.parse(packet.payload.toString());
    let deviceNodeName = data.deviceNodeName;
    let time = new Date(parseInt(data.time));
    let dataSen = data.data;
    console.log(packet.payload.toString())
    models.deviceNode.findOneAndUpdate(
      {name: deviceNodeName}, {
      $set: {
        data: dataSen
      }
    }, (err, data) => {
      if (!err) {
        models.dataSensor.create({
          deviceNodeId: data.deviceNodeId,//false findIdByName deviceNode, neu sai name deviceNode thi sai null id
          time: time,
          data: dataSen,
          trash: false,
        }, (err, data) => {
          if (!err) {
            console.log('ok');
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    })
    
    
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

