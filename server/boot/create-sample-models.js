'use strict';
var generator = require('../../common/scripts/sampleDataGenerator');

module.exports = function (app) {
  var mysqlDs = app.dataSources.mysqlDs;
  generator.init(mysqlDs, app);
  generator.createFullOwner();
};