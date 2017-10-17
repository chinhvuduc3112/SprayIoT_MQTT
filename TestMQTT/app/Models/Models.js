'use strict';

var mongoose = require('mongoose');

module.exports = {
  rssi: mongoose.model('Rssi', mongoose.Schema({
    r1: Number,
    r2: Number,
    r3: Number,
    created: {
      default: new Date(),
      type: Date
    }
  })),
  rssi2: mongoose.model('Rssi2', mongoose.Schema({
    r1: Number,
    r2: Number,
    r3: Number,
    created: {
      default: new Date(),
      type: Date
    }
  }))
}