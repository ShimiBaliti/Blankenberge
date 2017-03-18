'use strict';
var array = require('lodash/array');
var serviceCategories = require("../../server/storage/serviceCategories.json")
var serviceSubCategories = require("../../server/storage/serviceSubCategories.json")

module.exports = function (ServiceCategory) {

    ServiceCategory.getServiceCategories = function (cb) {
        var response = serviceCategories.categories;
        cb(null, response);
    };

    ServiceCategory.remoteMethod('getServiceCategories', {
        returns: {
            arg: 'response',
            type: 'object'
        },
        http: {
            path: '/getServiceCategories',
            verb: 'get'
        }
    });


    ServiceCategory.getServiceSubCategories = function (cb) {
        var response = serviceSubCategories.subCategories;
        cb(null, response);
    };

    ServiceCategory.remoteMethod('getServiceSubCategories', {
        returns: {
            arg: 'response',
            type: 'object'
        },
        http: {
            path: '/getServiceSubCategories',
            verb: 'get'
        }
    });

    ServiceCategory.getSubCetgoriesByCategoryId = function (id, cb) {
        var subs = serviceSubCategories.subCategories;
        var response = [];

        subs.forEach(function callback(currentValue, index, array) {
            if (currentValue.categoryId == id)
                response.push(currentValue);
        });

        cb(null, response);
    }

    ServiceCategory.remoteMethod('getSubCetgoriesByCategoryId', {
        accepts: [
            { arg: 'categoryId', type: 'number', required: true, description: 'Category Id' }
        ],
        returns: {
            arg: 'response',
            type: 'object'
        },
        http: {
            path: '/:categoryId/getSubCetgoriesByCategoryId',
            verb: 'get'
        },
        description: "Get a service category with all sub-categories"
    });
};



