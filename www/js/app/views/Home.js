define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        FileList            = require('app/views/file'),
        tpl                 = require('text!tpl/Home.html'),
        UploadView          = require('app/views/head'),
        UploadCollection    = require('app/collections/uploadCollection'),
        Options             = require('app/models/options'),
        OptionsView         = require('app/views/options'),
        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.options = new Options.Options();
            this.uploadCollection = new UploadCollection.UploadCollection([], {options: this.options});
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new FileList({el: $(".scroller", this.el), collection: this.uploadCollection});
            this.uploadView = new UploadView({el: $("h1", this.el), collection: this.uploadCollection});
            this.optionsView = new OptionsView({el: $('.options', this.el), model: this.options});
            return this;
        }

    });

});