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
      'click .go-previous': 'goPreviousPage',
      'click .go-next'    : 'goNextPage',
      'click .page-number': 'gotoPageNumber'
    },

    initialize: function(){
      this.collection.on('sync', this.loadPageNumbers, this);
    },

    render: function () {
      return this;
    },
    loadPageNumbers: function(){
      var navigationNumbers = Number(this.collection.totalItems)/this.collection.pageSize;
      var paginationData = {
        'totalItems': this.collection.totalItems,
        'pageNumber': Number(this.collection.pageNumber),
        'pageSize': this.collection.pageSize,
        'navigationNumbers': Math.ceil(navigationNumbers)
      };
      this.$el.html(this.template(paginationData));
    },
    gotoPageNumber: function(evt){
      //@TODO use href attribute, in combination with filter query params
      this.collection.goToPage(Number($(evt.currentTarget).text()));
    },
    goPreviousPage: function (evt) {
      this.collection.previousPage();
      return false;
    },
    goNextPage: function (evt) {
      this.collection.nextPage();
      return false;
    }
  });

  return PaginatorView;
});