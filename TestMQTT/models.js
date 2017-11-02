"use strict";
var mongoose = require('mongoose');

module.exports = {
  user: mongoose.model('User', mongoose.Schema({
    username: String,
    password: String,
    idGroupUser: mongoose.Schema.Types.ObjectId,
    idInfoUser: mongoose.Schema.Types.ObjectId,
    trash: Boolean,
    userInfo: {
      name: String,
      phone: String,
      address: String,
      email: String,
      description: String,
      image: String,
      trash: Boolean
    }
  })),

  groupUser: mongoose.model('GroupUser', mongoose.Schema({
    name: String,
    note: String,
    trash: {
      type: Boolean,
      default: false
    }
  })),

  permission: mongoose.model('Permission', mongoose.Schema({
    idGroupUser: mongoose.Schema.Types.ObjectId,
    menu: String,
    codelink: String,
    action: String,
    trash: {
      type: Boolean,
      default: false
    }
  })),

  area: mongoose.model('Area', mongoose.Schema({
    name: String,
    note: String,
    x: Number,
    y: Number,
    trash: {
      type: Boolean,
      default: false
    }
  })),

  node: mongoose.model('Node', mongoose.Schema({
    name: String,
    description: String,
    idArea: mongoose.Schema.Types.ObjectId,
    note: String,
    trash: {
      type: Boolean,
      default: false
    }
  })),

  deviceType: mongoose.model('DeviceType', mongoose.Schema({
    name: String,
    note: String,
    trash: {
      type: Boolean,
      default: false
    }
  })),

  deviceNode: mongoose.model('DeviceNode', mongoose.Schema({
    name: String,
    description: String,
    deviceTypeId: mongoose.Schema.Types.ObjectId,
    nodeId: mongoose.Schema.Types.ObjectId,
    note: String,
    data: {
      default: 0,
      type: Number
    },
    trash: {
      type: Boolean,
      default: false
    }
  })),

  dataSensor: mongoose.model('DataSensor', mongoose.Schema({
    deviceNodeId: mongoose.Schema.Types.ObjectId,
    time: {
      type: Date,
      default: new Date()
    },
    data: Number,
    trash: {
      type: Boolean,
      default: false
    }
  })),

  actuator: mongoose.model('Actuator', mongoose.Schema({
    name: String,
    description: String,
    deviceTypeId: mongoose.Schema.Types.ObjectId,
    idArea: mongoose.Schema.Types.ObjectId,
    time: Number,
    status: Boolean,
    trash: Boolean
  })),

  function: mongoose.model('Function', mongoose.Schema({
    name: String,
    actuatorId: mongoose.Schema.Types.ObjectId,
    status: Boolean,
    activityDuration: Number,
    description: String,
    trash: Boolean
  })),

  groupExecutionCondition: mongoose.model('GroupExecutionCondition', mongoose.Schema({
    name: String,
    description: String,
    functionId: mongoose.Schema.Types.ObjectId,
    trash: Boolean
  })),

  executionCondition: mongoose.model('ExecutionCondition', mongoose.Schema({
    name: String,
    description: String,
    groupExecutionConditionId: mongoose.Schema.Types.ObjectId,
    deviceNodeId: mongoose.Schema.Types.ObjectId,
    compare: Number, //0: bang; 1:nho hon; 2:lon hon
    compareValue: Number,
    status: {
      type: Boolean,
      default: false
    },
    trash: {
      type: Boolean,
      default: false
    }
  })),

  historyAction: mongoose.model('HistoryAction', mongoose.Schema({
    name: String,
    functionId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    trash: Boolean
  }))
}