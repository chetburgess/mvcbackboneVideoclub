define([
  'underscore',
  'backbone',
  'text!/templates/users/collectionItem.html',
  'eventHandlers/usersHandler'
], function(_, Backbone, UsersCollectionItemHTML, UsersHandler) {
  
  // UsersCollectionItemView es un clase que representa la vista del
  // usuario en la grilla (<tr>...</tr>)
  var UsersCollectionItemView = Backbone.View.extend({
    //
    tagName: 'tr',
    
    //
    events: {
      'click button.remove': 'removeModel'
    },

    //
    initialize: function () {
      
      // Agregamos listeners
      this.listenTo(this.model, 'remove', _.bind(this.modelDestroyed, this));
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(UsersCollectionItemHTML),
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
    },

    // Avisa que se quiere eliminar
    removeModel: function() {

      UsersHandler.trigger('usersItemView:confirmRemove', this);
    }
  });

  return UsersCollectionItemView;
});