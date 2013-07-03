define([
    'jquery',
    'underscore',
    'bbloader',
    'text!app/modules/pagination/views/templates/pagination.html'
], function ($, _, Backbone, paginationHTML) {
  
    //
    var PaginatorView = Backbone.Marionette.View.extend({

        tagName: 'div',

        template: _.template(paginationHTML),

        //
        events: {
            'click .go-previous': 'goPreviousPage',
            'click .go-next'    : 'goNextPage',
            'click .page-number': 'gotoPageNumber',
            'click .item-list-container .active': 'preventsNavigate',
            'click .item-list-container .disabled': 'preventsNavigate'
        },

        initialize: function () {

            this.listenTo(this.collection, 'sync', _.bind(this.loadPageNumbers, this));
        },

        loadPageNumbers: function () {

            this.totalPages = Math.ceil(this.collection.totalItems / this.collection.pageSize);

            this.$el.html(this.template({
                totalItems: this.collection.totalItems,
                pageNumber: this.collection.pageNumber,
                pageSize: this.collection.pageSize,
                totalPages: this.totalPages
            }));
        },
        changePage: function (page) {
          
            if (page >= 1 && page <= this.totalPages) {

                this.trigger('changePage', page);
            }
            return false;
        },
        gotoPageNumber: function (evt) {

            evt.preventDefault();
            this.changePage(Number($(evt.currentTarget).text()));
        },
        goPreviousPage: function (evt) {

            evt.preventDefault();
            var page = this.collection.pageNumber - 1;
            this.changePage(page);
            return false;
        },
        goNextPage: function (evt) {

            evt.preventDefault();
            var page = this.collection.pageNumber + 1;
            this.changePage(page);
            return false;
        },
        preventsNavigate: function(evt) {

            evt.preventDefault();
        }
    });

    return PaginatorView;
});