define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.View.extend({
        events: {
            "change #fileType, #minSize, #maxSize": 'onChangeOptions'
        },
        initialize: function () {
            return this;
        },
        onChangeOptions: function(event) {

            var id = event.currentTarget.id,
                res = {};
            if(event.currentTarget.tagName === 'INPUT') {
                res[id] = parseInt(event.currentTarget.value, 10);
            } else {
                res[id] = event.currentTarget.value;
            }
            this.model.updateOptions(res);
        }
    });

});