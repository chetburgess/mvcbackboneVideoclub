define([
    'underscore',
    'bbloader',
    'app/common/eventHandler',
    'text!app/modules/modal/views/templates/layout.html'
], function(_, Backbone, eventHandler, modalLayoutHTML) {
  
    //
    var ModalLayout = Backbone.Marionette.Layout.extend({

        tagName: 'div',

        className: 'span12',

        template: modalLayoutHTML,

        /*regions: {
            pagination: '.pagination-container',
            table: '.collection-container'
        }*/
    });

    return ModalLayout;
});