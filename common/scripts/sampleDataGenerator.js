
var self = module.exports = {

    dataSource: object = null,
    app: object = null,

    init: function (datasource, app) {
        this.dataSource = datasource;
        this.app = app;
    },

    createFullOwner: function () {
        self.createContacts(
            function (err, results) {
                if (err) throw err;
                self.createAddresses(results,
                    function (err) {
                        if (err) throw err;
                        self.createOwner(results,
                            function (err) {
                                if (err) throw err;
                                console.log('> models created sucessfully');
                            })
                    });
            });
    },

    createContacts: function (cb) {
        var ContactDetails = this.app.models.ContactDetails;
        this.dataSource.automigrate('ContactDetails', function (err) {
            if (err) return cb(err);
            ContactDetails.create([{
                Phone: "1212-321",
                Mobile: "222-222-222",
                Email: 'asd@dsa.com'
            }], cb);
        });
    },

    createAddresses: function (contacts, cb) {
        var Address = this.app.models.Address;
        this.dataSource.automigrate('Address', function (err) {
            if (err) return cb(err);
            Address.create([{
                AddressLine1: '29 Flaxdale Street',
                AddressLine2: 'Birkdale',
                City: 'Auckland',
                Country: 'New Zealand',
                Postcode: '0626',
                contactId: contacts[0].id
            }], cb);
        });
    },

    createOwner: function (contacts, cb) {
        var Owner = this.app.models.Owner;
        this.dataSource.automigrate('Owner', function (err) {
            if (err) return cb(err);
            Owner.create([{
                Name: "The best owner",
                password: "123456",
                email: "aaa@sss.com",
                contactId: contacts[0].id
            }], cb);
        });
    },


};
