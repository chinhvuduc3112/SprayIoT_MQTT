var models = require('./models'), 
    DataSensorHandler = require('./DataSensorHandler'), 
    ExecConditonHandler = require('./ExecConditionHandler')

module.exports = {

    updateDeviceNode: async (deviceNodeName, data) => {
        
        let deviceNode = await models.deviceNode.findOneAndUpdate(
            {name: deviceNodeName}, {
            $set: {
                data: data.data
            }
        });
        if (deviceNode != null) {
            await DataSensorHandler.addDataSensor(data);
            let compare = await ExecConditonHandler.updateExecutionConditionCompare(deviceNode._id, parseFloat(data.dataSen));
            if (compare === true) {
                let groupCondiId = await ExecConditonHandler.getGroupConditionIdByDeviceNodeId(deviceNode._id);
                let statusGroup = await ExecConditonHandler.getStatusGroupCondition(groupCondiId);
                return status;
            }
        } else {
            return null;
        }
    }


}