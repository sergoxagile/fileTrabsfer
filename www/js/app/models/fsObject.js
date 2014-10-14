define(function (require) {

    "use strict";

        var $               = require('jquery'),
        Backbone            = require('backbone'),

        FsObject = Backbone.Model.extend({

            initialize: function () {
                return this;
            }

        });

    return {
        FsObject: FsObject
    };

});