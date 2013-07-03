define([
    'underscore',
    'bbloader',
    'app/common/eventHandler',
    'text!app/modules/modal/views/templates/layout.html'
], function (_, Backbone, eventHandler, modalLayoutHTML) {
  
    //
    var ModalLayout = Backbone.Marionette.Layout.extend({

        tagName: 'div',

        className: 'modal hide',

        template: modalLayoutHTML,

        events: {
          'click button.close': 'closeModal'
        },

        regions: {
            titles: '.tab-titles'
        },

        closeModal: function () {
          
          this.trigger('closeModal', this);
        },

        setTitle: function (title) {
            
            this.$el.find('.title').html(title);
        },

        setActiveTab: function (pos) {
            
            this.$el.find('a[data-target="#modalTab' + pos + '"]').tab('show');
        }
    });

    return ModalLayout;
});