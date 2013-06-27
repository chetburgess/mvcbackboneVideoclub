define([
    'underscore',
    'bbloader',
    'app/common/eventHandler',
    'text!app/modules/movies/views/templates/layout.html'
], function(_, Backbone, eventHandler, moviesLayoutHTML) {
  
    //
    var MoviesCollectionLayout = Backbone.Marionette.Layout.extend({

        tagName: 'div',

        className: 'span12',

        template: moviesLayoutHTML,

        regions: {
            pagination: '.pagination-container',
            table: '.collection-container'
        }
    });

    return MoviesCollectionLayout;
});