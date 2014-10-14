define(function (require) {

    "use strict";

        var $               = require('jquery'),
        Backbone            = require('backbone'),

        Options = Backbone.Model.extend({
            defaults: {
                'fileType': false,
                'minSize' : 0,
                'maxSize' : 0,
                'server'  : "http://petrushin-sci.dev7.oxagile.com/upload.php"
            },
            initialize: function () {
                return this;
            },
            updateOptions: function(options) {
                this.set(options);
            }

        });

    return {
        Options: Options
    };
});