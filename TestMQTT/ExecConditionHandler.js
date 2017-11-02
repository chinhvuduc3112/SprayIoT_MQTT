var models = require('./models');

module.exports = {

    updateExecutionConditionCompare: async (deviceNodeId, data) => {
        let execCondi = await models.executionCondition.findOne({
            deviceNodeId: deviceNodeId
        });
        switch (execCondi.compare) {
            case 0:
                if (data == execCondi.value) {
                    await models.executionCondition.update({
                        deviceNodeId: deviceNodeId
                    }, {
                        $set: {
                            status: true
                        }
                    });
                    return true;
                }  else {
                    return false;
                }
                

            case 1:
                if (data < execCondi.value) {
                    await models.executionCondition.update({
                        deviceNodeId: deviceNodeId
                    }, {
                        $set: {
                            status: true
                        }
                    });
                    return true;
                }  else {
                    return false;
                }
                

            case 2: 
                if (data > execCondi.value) {
                    await models.executionCondition.update({
                        deviceNodeId: deviceNodeId
                    }, {
                        $set: {
                            status: true
                        }
                    });
                    return true;
                }  else {
                    return false;
                }
            
        }
    },

    getGroupConditionIdByDeviceNodeId: async (deviceNodeId) => {
        let groupCondi = await models.groupExecutionCondition.findOne({
            deviceNodeId: deviceNodeId
        });
        return groupCondi._id;
    },

    getStatusGroupCondition: async (groupExecutionConditionId) => {
        let listCondition = await models.executionCondition.find({
            groupExecutionConditionId: groupExecutionConditionId
        });
        for (let i = 0; i < listCondition.length; i++) {
            if (listCondition[i].status == false) {
                return false;
            }
        }
        return true;
    }

    
}

//