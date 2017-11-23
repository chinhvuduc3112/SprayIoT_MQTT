var models = require('./models');

module.exports = {

    updateExecutionConditionCompare: async (deviceNodeId, data) => {
        
        let execCondi = await models.executionCondition.find({
            deviceNodeId: deviceNodeId
        });
        let check = false;
        for (let i = 0; i < execCondi.length; i++) {
            let compare = await compareToCondi(data, execCondi[i]);
            check = true;
        }
        return check;
    },

    getGroupConditionByDeviceNodeId: async (deviceNodeId) => {
        let execCondi = await models.executionCondition.findOne({
            deviceNodeId: deviceNodeId
        });
        let groupCondi = await models.groupExecutionCondition.findById(execCondi.groupExecutionConditionId);
        return groupCondi;
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
    },

     
}

//
async function compareToCondi (data, execCondi) {
    switch (execCondi.compare) {
        case 0:
            if (data == execCondi.compareValue) {
                await models.executionCondition.update({
                    _id: execCondi._id
                }, {
                    $set: {
                        status: true
                    }
                });
                return true;
            }  else {
                await models.executionCondition.update({
                    _id: execCondi._id
                }, {
                    $set: {
                        status: false
                    }
                });
                return false;
            }
            

        case 1:
            if (data < execCondi.compareValue) {
                await models.executionCondition.update({
                    _id: execCondi._id
                }, {
                    $set: {
                        status: true
                    }
                });
                return true;
            }  else {
                await models.executionCondition.update({
                    _id: execCondi._id
                }, {
                    $set: {
                        status: false
                    }
                });
                return false;
            }
            

        case 2: 
            if (data > execCondi.compareValue) {
                await models.executionCondition.update({
                    _id: execCondi._id
                }, {
                    $set: {
                        status: true
                    }
                });
                return true;
            }  else {
                await models.executionCondition.update({
                    _id: execCondi._id
                }, {
                    $set: {
                        status: false
                    }
                });
                return false;
            }
        
    }
}   