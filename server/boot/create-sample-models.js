'use strict';
var generator = require('../../common/utils/sampleDataGenerator');

module.exports = function (app) {
  if (process.env.npm_lifecycle_event != "test") {
    var mysqlDs = app.dataSources.mysqlDs;
    generator.init(mysqlDs, app);
    generator.createServiceCategories();
    generator.createFullOwner();
    generator.createServiceReuqest();
    
  }
};