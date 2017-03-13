var assert = require('assert');
var app = require('../server/server.js');
var generator = require('../common/scripts/sampleDataGenerator');

describe('hooks', function () {

  before(function (done) {
    var mysqlDs = app.dataSources.mysqlDs;
    generator.init(mysqlDs, app);
    generator.createFullOwner();
    done();
  });

  describe('Owner', function () {
    it('should return details when the ownerId is valid', function (done) {
      var owner = app.models.Owner;
      owner.getContactDetails(1, function (err, result) {
        assert.deepEqual(result.Phone, '1212-321');
        done();
      });
    })
  })
});
