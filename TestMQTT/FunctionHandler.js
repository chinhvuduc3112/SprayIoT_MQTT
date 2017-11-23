var models = require('./models');

module.exports = {

    getFunctionById: (functionId) => {
        return models.function.findById(functionId);
    },

    getFunctionByActuatorId: (actuatorId) => {
        return models.function.findOne({
            actuatorId: actuatorId
        });
    }
}