define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.View.extend({
        events: {
            "click": 'onUploadClick'
        },
        initialize: function () {
            this.render();
            this.collection.on('readyToUpload', this.render, this);
        },

        render: function () {
            this.$el.html('Tap to upload ' + this.collection.getItemsLength() + ' files');
            return this;
        },
        onUploadClick: function() {
            this.collection.upload();
            this.$el.html('Files uploading please wait');
        }
    });

});