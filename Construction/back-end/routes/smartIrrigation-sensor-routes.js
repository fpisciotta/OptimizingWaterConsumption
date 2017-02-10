'use strict';
module.exports = function(app) {
  var smartIrrigation = require('../data_management/sensor_management');


  app.route('/sensors')
    .get(smartIrrigation.list_sensors)
    .post(smartIrrigation.create_sensor);


  app.route('/sensors/:sensorId')
    .get(smartIrrigation.read_sensor)
    .put(smartIrrigation.update_sensor)
    .delete(smartIrrigation.delete_sensor);
};


// Put MQTT consumer here temporary
var sensorHistoryManagement = require('../data_management/sensor_history_management')

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://52.35.182.188:1883')

var topics = ['arduino-temp', 'arduino-hum', 'arduino-soil', 'arduino-water']

client.on('connect', function () {
  console.log("Start mqtt")

  // subscribe topics
  for (var i = 0; i < topics.length; i++) {
    client.subscribe(topics[i])
  }
})

client.on('message', function (topic, message) {
  // get message from the subscribed topics

  if (topics[3] == topic) {
    // to be completed
  } else {
    sensorHistoryManagement.createSensorHistory(topic.toString(), message.toString(), function(err) {
      console.log("MQTT createSensorHistory error");
      console.log(err);
    });
  }
})
