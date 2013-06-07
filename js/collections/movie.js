define([
    'jquery',
    'underscore',
    'backbone',
    'localstorage',
    'models/movie'
], function($, _, Backbone, MovieModel) {
    
    // MovieCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
    var MovieCollection = Backbone.Collection.extend({
        model: MovieModel,
        localStorage: new Backbone.LocalStorage('Movies')
    });
    return MovieCollection;
});