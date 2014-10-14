define(function (require) {

    "use strict";

        var $               = require('jquery'),
        Backbone            = require('backbone'),
        FsObjectModel       = require('../models/fsObject'),

        FsObjectCollection = Backbone.Collection.extend({
            path: null,
            parentPath: null,
            model: FsObjectModel.FsObject,
            initialize: function () {
                return this;
            },
            load: function() {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, _.bind(this[this.path ? 'loadDirectory' : 'gotFS'], this), _.bind(this.fail, this));
            },
            gotFS: function(fileSystem) {
                this.readDirectory(fileSystem.root);
            },
            sucsses: function(entries) {
                if(this.path && !this.parentPath) {
                    entries = this.createParentDirModel().concat(entries);
                }
                this.reset(entries);
            },
            fail: function(error) {
                console.log(error);
            },
            loadDirectory: function(fileSystem) {
                fileSystem.root.getDirectory(this.path, {create: false}, _.bind(this.readDirectory, this), _.bind(this.fail, this));
            },
            readDirectory: function(directory) {
                var reader = directory.createReader();
                reader.readEntries(_.bind(this.sucsses, this), _.bind(this.fail, this));
            },
            setPath: function(path) {
                this.parentPath = null;
                this.path = path.substr(1);
                if(this.path.length === 0) {
                    this.path = null;
                }
            },
            getPath: function() {
                return '/' + this.path;
            },
            createParentDirModel: function() {
                return [{
                    ifFile: false,
                    isFolder: true,
                    name: '..',
                    fullPath: '/' + (this.parentPath ? this.parentPath : '')
                }];
            }
        });

    return {
        FsObjectCollection: FsObjectCollection
    };

});