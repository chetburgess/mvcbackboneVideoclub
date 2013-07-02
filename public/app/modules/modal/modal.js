define([
	'app/app',
	'app/common/eventHandler',
	'app/modules/modal/views/layout',
	'app/modules/modal/views/liItem'
], function (app, eventHandler, ModalLayout, liItemView) {

	var ModalModule = app.module('ModalModule', function (ModalModule, app) {
		this.startWithParent = false;
		this.layout = new ModalLayout();

		this.show = function(regions){

			var itemView = new liItemView({
				collection: regions
			});
			this.layout.$el.find('.nav-tabs').append(itemView.render().el);			

			_.each(regions, function(regionData){
				var $tabContainer = $('<div/>', {
				    id: regionData.title,
				    class: 'tab-pane'
				});

				this.layout.$el.find('.tab-content').append($tabContainer);
				this.layout.addRegion(regionData.title, '#' + regionData.title);
				this.layout[regionData.title].show(regionData.view);
			}, this);
			this.layout.regionManager.first().$el.addClass('active');
			return this.layout;
		};
		eventHandler.on('modal:showTabContent', function (contentTabSelector) {
			this.layout.regionManager.each(function(region){
				region.$el.removeClass('active');
			});
			this.layout[contentTabSelector.substring(1)].$el.addClass('active');
		}, this);
		
	});
	

	return ModalModule;
});