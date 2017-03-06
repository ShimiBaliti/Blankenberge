'use strict';

module.exports = function (Owner) {
    var app = require('../../server/server.js');

    Owner.disableRemoteMethodByName('prototype.__get__contactDetails');

    Owner.getContactDetails = function (id, cb) {
        var contactDetails = app.models.ContactDetails;
        Owner.findById(id, function (err, instances) {
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
                { arg: 'id', type: 'number', required: true, description: 'Owner Id' }
            ],
            returns: {
                arg: 'contactDetails',
                type: 'object'
            },
            http: { path: '/:id/contactDetails', verb: 'get' },
            description: "Get the owner's contact details"
        }
    );
};
