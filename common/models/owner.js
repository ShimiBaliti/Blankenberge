'use strict';

module.exports = function (Owner) {
    var app = require('../../server/server.js');
var RemoteRouting = require('loopback-remote-routing');

RemoteRouting(Owner);

    Owner.getContactDetails = function (ownerId, cb) {
        var contactDetails = app.models.ContactDetails;
        Owner.findById(ownerId, function (err, instances) {
            if (err) {
                cb(err);
            }
            contactDetails.findById(instances.contactId, function (err, contacts) {
                if (err) {
                    cb(err);
                }
                cb(null, contacts);
            })

        });
    };

    Owner.remoteMethod(
        'getContactDetails',
        {
            accepts: [
                { arg: 'ownerId', type: 'number', required: true, description: 'Owner Id' }
            ],
            returns: {
                arg: 'contactDetails',
                type: 'object'
            },
            http: { path: '/:ownerId/contactDetails', verb: 'get' },
            description: "Get the owner's contact details"
        }
    );
};


// let disabledPrototypesRemoteMethods = ['patchAttributes']
// let enabledRemoteMethods = [
//   "create", "findById", "replaceById", "deleteById",
//   "replaceOrCreateQuestion"
// ]
// Survey.sharedClass.methods().forEach(function(method) {
//   if (enabledRemoteMethods.indexOf(method.name) == -1) {
//     Survey.disableRemoteMethodByName(method.name);
//   }
//   if (disabledPrototypesRemoteMethods.indexOf(method.name) > -1) {
//     Survey.disableRemoteMethodByName("prototype." + method.name);
//   }
// });