var models = require('./models'), 
    DataSensorHandler = require('./DataSensorHandler'), 
    ExecConditonHandler = require('./ExecConditionHandler'),
    ActuatorHandler = require('./ActuatorHandler'),
    FunctionHandler = require('./FunctionHandler')

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
            let compare = await ExecConditonHandler.updateExecutionConditionCompare(deviceNode._id, parseFloat(data.data));
            if (compare === true) {
                let groupCondi = await ExecConditonHandler.getGroupConditionByDeviceNodeId(deviceNode._id);
                let groupCondiId = groupCondi._id;
                let statusGroup = await ExecConditonHandler.getStatusGroupCondition(groupCondiId);
                let execFunction = await FunctionHandler.getFunctionById(groupCondi.functionId);
                let actuator = await ActuatorHandler.findAndUpdateActuatorById(execFunction.actuatorId, statusGroup, execFunction.activityDuration );
                let returnObj = await Object.assign(actuator, {});
                returnObj.function = await FunctionHandler.getFunctionByActuatorId(actuator._id);
                return returnObj;
            }
        } else {
            return null;
        }
    }
}