define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/paginator/paginator.html'
], function($, _, Backbone, PaginatorHTML) {
  
  var PaginatorView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12',
    template: _.template(PaginatorHTML),
    //
    events: {
      'click .previous': 'goPreviousPage',
      'click .next': 'goNextPage',
      'click .pageNumber': 'gotoPageNumber'
    },

    initialize: function(){
      this.collection.on('sync', this.loadPageNumbers, this);
    },

    render: function () {
      //
      //this.$el.html(this.template());
      return this;
    },
    loadPageNumbers: function(){
      var paginationData = {
        'totalItems': this.collection.totalItems,
        'pageNumber': this.collection.pageNumber,
        'pageSize': this.collection.pageSize
      };
      this.$el.html(this.template(paginationData));
      /*_.each(this.collection.models, function (model) {
          this.createPageNumber(model);
      }, this);*/
     // this.collection.pageSize
    },
    createPageNumber: function(model){

    },
    
    // Guardamos los cambios en el modelo
    goNextPage: function (evt) {
      
      var attrs = {}
        , model = this.model 
        , add = !model
        , self = this; // Si no se paso un modelo

      // Buscamos los inputs y obtenemos el valor
      $(evt.target).find(':input').not('button').each(function () {

        var el = $(this);
        attrs[el.attr('name')] = el.val();
      });
      attrs.rating = Number(attrs.rating);
      attrs.year = Number(attrs.year);

      // Si es nuevo
      if (add) {        
        model = new this.collection.model({});
      }

      // Guardamos
      model.save(attrs, {
        success: function (mod, xhr, opt) {

          //self.collection.add([mod]); //@TODO ver si es necesario

          // Avisamos
          Modals.success({
            message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + ' con exito!',
            close: function () {

              //@TODO tenemos que volver a la vista del listado
            }
          });
        },
        error: function (mod, xhr, opt) {

          var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

          //@TODO Ver de centralizar este analisis
          if (xhr.status === 409) {
            msg = 'La pelicula ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
          }

          // 
          Modals.error({
            message: msg,
            close: function () {

              //@TODO ver si es necesario hacer algo
            }
          });
        }
      });

      evt.preventDefault();

      return false; // Evitamos que se recarge la pagina
    }
  });

  return PaginatorView;
});