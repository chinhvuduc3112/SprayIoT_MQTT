var models = require('./models');

module.exports = {

    addDataSensor: async (data) => {
		let deviceNodeName = data.deviceNodeName;
        let time = new Date(parseInt(data.time));
        let dataSen = data.data;
        return await models.dataSensor.create({
            deviceNodeId: data._id,//false findIdByName deviceNode, neu sai name deviceNode thi sai null id
            time: time,
            data: dataSen,
            trash: false,
        })
    }
}