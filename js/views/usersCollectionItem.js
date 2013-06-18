define([
  'underscore',
  'backbone',
  'text!/templates/users/collectionItem.html',
], function(_, Backbone, UsersCollectionItemHTML) {
  
  // UserCollectionItemView es un clase que representa la vista del
  // usuario en la grilla (<tr>...</tr>)
  var UserCollectionItemView = Backbone.View.extend({
    //
    tagName: 'tr',
    
    //
    events: {
      'click button.remove': 'removeUser'
    },

    //
    initialize: function () {

      _.bindAll(this, ['modelUpdated', 'modelDestroyed']);
      
      // Agregamos listeners
      this.listenTo(this.model, 'change', this.modelUpdated);
      this.listenTo(this.model, 'destroy', this.modelDestroyed);
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
      this.trigger('viewRemoved', this);
    },

    // Avisa que se quiere eliminar
    removeUser: function() {

      this.trigger('removeUser', this);
    }
  });

  return UserCollectionItemView;
});