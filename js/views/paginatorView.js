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
      this.loadPageNumbers();
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
      var options = {'data': this.options.getFilterParams()};
      this.collection.goToPage(Number($(evt.currentTarget).text()), options);
    },
    goPreviousPage: function (evt) {
      var options = {'data': this.options.getFilterParams()};
      this.collection.previousPage(options);
      return false;
    },
    goNextPage: function (evt) {
      var options = {'data': this.options.getFilterParams()};
      this.collection.nextPage(options);
      return false;
    }
  });

  return PaginatorView;
});