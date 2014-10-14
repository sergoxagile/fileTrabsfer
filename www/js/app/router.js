define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('app/views/Home'),
        _ = require('underscore'),

        homeView = new HomeView({el: $('body')});

    return Backbone.Router.extend({

        routes: {
            "": "home"
        },

        home: function () {
            homeView.delegateEvents();
            homeView.render();
        }

    });

});