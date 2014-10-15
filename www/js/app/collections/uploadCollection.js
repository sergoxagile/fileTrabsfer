define(function (require) {

    "use strict";

        var $               = require('jquery'),
        Backbone            = require('backbone'),
        FsObjectModel       = require('../models/fsObject'),

        UploadCollection = Backbone.Collection.extend({
            model: FsObjectModel.FsObject,
            initialize: function (models, options) {
                this.options = options.options;
                this.options.on('change', _.bind(this.onChangeOptions, this));
                this.on('add', this.onAddModel, this);
                return this;
            },
            onAddModel: function(model, collection) {
                console.log('addd');
                if(collection.where({fullPath: model.get('fullPath')}).length > 1) {
                    collection.remove(model);
                } else {
                    model.set({ready:false, fileObject: false});
                    _.bind(model.attributes.file, model.attributes, _.bind(this.setFile, collection, model), _.bind(this.fail, this))();
                }
            },
            setFile: function(model, file) {
                model.set({fileObject: file, ready:true});
                this.filterFunction(model);
                this.trigger('readyToUpload');
            },
            fail: function(error) {
                console.log(error);
            },
            onChangeOptions: function() {
                this.filterModels();
                this.trigger('readyToUpload');
            },
            upload: function() {
                console.log(11111);
                _.each(this.where({uploaded: true}), _.bind(this.send, this));
            },
            send: function(model) {
                console.log(222);
                var url = _.bind(model.attributes.toURL, model.attributes)();
                var options = new FileUploadOptions();
                options.fileKey  = "file";
                options.fileName = url.substr(url.lastIndexOf('/') + 1);
                options.mimeType = model.get('fileObject').type;

                options.params = {};

                var ft = new FileTransfer();
                ft.upload(url, encodeURI(this.options.get('server')), _.bind(this.sendWin, this, model), _.bind(this.sendFail, this), options);

            },
            sendWin: function(model, event) {
                this.remove(model);
                if(this.length === 0) {
                    this.trigger('readyToUpload');
                }
            },
            getItemsLength: function () {
                return this.where({uploaded: true}).length;
            },
            sendFail: function() {
                alert("An error has occurred: Code = " + error.code);
                    console.log("upload error source " + error.source);
                    console.log("upload error target " + error.target);
            },
            filterModels: function() {
                console.log(this.length);
                return this.filter(_.bind(this.filterFunction, this));
            },
            filterFunction: function(model) {
                var uploaded = true;
                if (this.options.get('fileType')) {
                    var reg = new RegExp(this.options.get('fileType'));
                    if(!model.get('fileObject').type.match(reg)) {
                        uploaded = false;
                    }
                } else if (this.options.get('maxSize') !== 0) {
                    if (model.get('fileObject').size > this.options.get('maxSize')) {
                        uploaded = false;
                    }
                } else if (this.options.get('minSize') !== 0) {
                    if (model.get('fileObject').size < this.options.get('minSize')) {
                        uploaded = false;
                    }
                }
                model.set({'uploaded' : uploaded});
            
            }
        });
        return {
            UploadCollection: UploadCollection
        };
});