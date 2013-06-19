define([
  'underscore',
  'backbone',
  'text!/templates/movies/collectionItem.html',
], function(_, Backbone, MoviesCollectionItemHTML) {
  
  // MoviesCollectionItemView es un clase que representa la vista de
  // la pelicula en la grilla (<tr>...</tr>)
  var MoviesCollectionItemView = Backbone.View.extend({
    //
    tagName: 'tr',
    
    //
    events: {
      'click button.remove': 'removeModel'
    },

    //
    initialize: function () {
      
      // Agregamos listeners
      this.listenTo(this.model, 'all', function () { console.log('item', arguments); });
      this.listenTo(this.model, 'remove', _.bind(this.modelDestroyed, this));
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(MoviesCollectionItemHTML),
    render: function () {
      
      this.$el.html(this.template({model: this.model}));
      return this;
    },

    //
    modelUpdated: function () {

      this.$el.html(this.template({model: this.model}));
    },

    //
    modelDestroyed: function () {

      this.remove();
      this.trigger('viewRemoved', this);
    },

    // Avisa que se quiere eliminar
    removeModel: function() {

      this.trigger('removeModel', this);
    }
  });

  return MoviesCollectionItemView;
});