define([
    'underscore',
    'bbloader',
    'text!app/modules/modal/views/templates/liItem.html'
], function(_, Backbone, liItemHTML) {
  
    var LiItemView = Backbone.Marionette.ItemView.extend({
        template: liItemHTML,
        //className: '.ul-list',
        events: {
            'click li' : 'highlithTab'

        },

        serializeData: function(){
          return {
            items: this.options.collection || 'Titlea'
          }
        },

        onShow: function(){
            debugger;
        },
        highlithTab: function(ev){
            ev.preventDefault();
            this.$el.find('li').removeClass('active');
            
        }
    });

    return LiItemView;
});