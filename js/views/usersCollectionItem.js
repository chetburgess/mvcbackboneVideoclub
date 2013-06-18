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
      'click button.remove': 'removeModel'
    },

    //
    initialize: function () {
      
      // Agregamos listeners
      this.listenTo(this.model, 'all', function () { console.log('item', arguments); });
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
      this.trigger('viewRemoved', this);
    },

    // Avisa que se quiere eliminar
    removeModel: function() {

      this.trigger('removeModel', this);
    }
  });

  return UserCollectionItemView;
});