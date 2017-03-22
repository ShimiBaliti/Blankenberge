var loopback = require('loopback');
var array = require('lodash/array');

var self = module.exports = {

    dataSource: object = null,
    app: object = null,

    init: function (datasource, app) {
        this.dataSource = datasource;
        this.app = app;
    },

    createOwnersServices: function (owners) {
        var services = this.app.models.OwnersService;
        var categories = this.app.models.ServiceCategory;

        categories.find(function (err, instances) {
            self.dataSource.automigrate('OwnersService', function (err) {
                if (err) return ;
                services.create([{
                    ownerId: array.last(owners).id,
                    serviceCategoryId: array.last(instances).id
                },
                {
                    ownerId: array.first(owners).id,
                    serviceCategoryId: array.first(instances).id
                }], function(){});
            });
        });


    },

    createServiceCategories: function () {
        var categories = this.app.models.ServiceCategory;
        this.dataSource.automigrate('ServiceCategory', function (err) {
            if (err) return console.log(err);
            categories.create([{
                parentCategoryId: null,
                Name: "Beauty",
                Description: "Everything you need before going out..."
            },
            {
                parentCategoryId: null,
                Name: "Health",
                Description: "Everything you need to feel great..."
            },
            {
                Name: "Nail Polish",
                Description: "Nail Polish",
                parentCategoryId: 1
            },
            {
                Name: "Pedicure",
                Description: "Pedicure",
                parentCategoryId: 1
            },
            {
                Name: "Massage",
                Description: "Back, Neck Massage",
                parentCategoryId: 2
            },
            {
                Name: "Reflexology",
                Description: "Reflexology",
                parentCategoryId: 2
            }], function () { });
        });
    },

    createServiceReuqest: function () {
        var request = this.app.models.ServiceRequest;
        this.dataSource.automigrate('ServiceRequest', function (err) {
            if (err) return console.log(err);
            request.create([{
                userId: 1,
                serviceType: 1.1,
                preferredTime: 'NOW',
                preferredLocation: "NEAR_ME",
                currentLocation: new loopback.GeoPoint({ lat: 10.32424, lng: 5.84978 })
            }], function () { });
        });
    },

    createFullOwner: function () {
        self.createContacts(
            function (err, results) {
                if (err) throw err;
                self.createAddresses(results,
                    function (err) {
                        if (err) throw err;
                        self.createOwner(results,
                            function (err, owners) {
                                if (err) throw err;
                                self.createOwnersServices(owners);
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
            },
            {
                Phone: "2222-321",
                Mobile: "6666-222-777222",
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
            },
            {
                Name: "The 2nd best owner",
                password: "123456789",
                email: "a@s.com",
                contactId: contacts[1].id
            }], cb);
        });
    },


};
