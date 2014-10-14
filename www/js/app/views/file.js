define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/file.html'),
        FsCollection        = require('app/collections/fsCollection'),
        template = _.template(tpl);

    return Backbone.View.extend({
        events: {
            "click li.folder": "onFolderClick",
            "click li.file": "onFileClick"
        },
        initialize: function () {
            this.fsCollection = new FsCollection.FsObjectCollection();
            this.fsCollection.on("reset", this.render, this);
            this.fsCollection.load();
        },
        render: function () {
            this.$el.html(template({fsObjectCollection: this.fsCollection}));
            this.delegateEvents();
            return this;
        },
        onFolderClick: function(event) {
            this.fsCollection.setPath($(event.currentTarget).data('path'));
            this.fsCollection.load();
        },
        onFileClick: function(event) {
            this.collection.add(this.fsCollection.get($(event.currentTarget).data('fuck')));
        }

    });

});