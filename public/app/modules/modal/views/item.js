define([
    'jquery',
    'bbloader',
    'text!app/modules/modal/views/templates/liItem.html'
], function ($, Backbone, liItemHTML) {
  
    var ModalItemView = Backbone.Marionette.ItemView.extend({

        tagName: 'li',

        template: liItemHTML
    });

    return ModalItemView;
});