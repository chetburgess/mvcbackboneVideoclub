define([
    'underscore',
    'bbloader',
    'app/common/eventHandler',
    'text!app/modules/modal/views/templates/liItem.html'
], function(_, Backbone, eventHandler, liItemHTML) {
  
    var LiItemView = Backbone.Marionette.ItemView.extend({
        template: liItemHTML,
        el: '.nav-tabs',
        events: {
            'click li' : 'highlithTab'

        },

        serializeData: function(){
          return {
            items: this.options.collection || 'Title'
          }
        },

        onShow: function(){
            debugger;
        },
        highlithTab: function(ev){
            ev.preventDefault();
            this.$el.find('li').removeClass('active');
            $(ev.currentTarget).addClass('active');
            eventHandler.trigger('modal:showTabContent',  $('a', ev.currentTarget).attr('href'));
        }
    });

    return LiItemView;
});