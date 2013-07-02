define([
	'app/app',
	'app/common/eventHandler',
	/*'app/modules/movies/routers/movies',
	'app/modules/movies/controllers/movies',*/
	'app/modules/modal/views/layout',
	'app/modules/modal/views/liItem'
], function (app, eventHandler, ModalLayout, liItemView) {

	var ModalModule = app.module('ModalModule', function (ModalModule, app) {
		this.startWithParent = false;
		this.layout = null;

		this.show = function(regions){
			this.layout = new ModalLayout();
			app.vent.trigger('app:showView', this.layout);

			var itemView = new liItemView({
					collection: [{title:'asd'},{title:'dasa'}]
				});
			this.layout.$el.find('.nav-tabs').append(itemView.render().el);			
			_.each(regions, function(regionData){
				
				var $tabContainer = $('<div/>', {
				    id: regionData.title,
				    class: 'tab-pane active'
				});

				this.layout.$el.find('.tab-content').append($tabContainer);
				this.layout.addRegion(regionData.title, '#' + regionData.title);
				this.layout[regionData.title].show(regionData.view);
			}, this);

		};
	});
	

	return ModalModule;
});