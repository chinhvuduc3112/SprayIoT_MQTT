var models = require('./models');

module.exports = {

    findAndUpdateActuatorById: async (actuatorId, status, time) => {
        await models.actuator.update({
            _id: actuatorId
        }, {
            $set: {
                status: status,
                time: time
            }
        });
        return models.actuator.findOne({
            _id: actuatorId
        });
    }
}