define([
    'jquery',
    'bbloader',
    'app/modules/modal/views/item'
], function ($, Backbone, ModalItemView) {
  
    var ModalCollectionView = Backbone.Marionette.CollectionView.extend({

    	tagName: 'ul',

    	className: 'nav nav-tabs',

        itemView: ModalItemView
    });

    return ModalCollectionView;
});