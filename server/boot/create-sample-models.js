'use strict';


// var async = require('async');
module.exports = function (app) {
  var mysqlDs = app.dataSources.mysqlDs;
  createContacts(
    function (err, results) {
      if (err) throw err;

        createAddresses(results, function (err) {
          createOwner(results, function (err) {
          console.log('> models created sucessfully');
        })
      });
    });

  function createAddresses(contacts, cb) {
    mysqlDs.automigrate('Address', function (err) {
      if (err) return cb(err);
      var Address = app.models.Address;
      Address.create([{
        AddressLine1: '29 Flaxdale Street',
        AddressLine2: 'Birkdale',
        City: 'Auckland',
        Country: 'New Zealand',
        Postcode: '0626',
        contactId: contacts[0].id
      }], cb);
    });
  }

  function createContacts(cb) {
    mysqlDs.automigrate('ContactDetails', function (err) {
      if (err) return cb(err);
      var ContactDetails = app.models.ContactDetails;
      ContactDetails.create([{
        Phone: "1212-321",
        Mobile: "222-222-222",
        Email: 'asd@dsa.com'
      }], cb);
    });
  }

  function createOwner(contacts, cb) {
    mysqlDs.automigrate('Owner', function (err) {
      if (err) return cb(err);
      var Owner = app.models.Owner;
      Owner.create([{
        Name: "The best owner",
        password:"123456",
        email:"aaa@sss.com",
        contactId:contacts[0].id
      }], cb);
    });
  }




};