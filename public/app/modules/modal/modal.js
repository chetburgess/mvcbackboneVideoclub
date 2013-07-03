define([
	'jquery',
	'underscore',
	'app/app',
	'app/modules/modal/views/layout',
  'app/modules/modal/views/collection',
  'app/modules/modal/collections/modals'
], function ($, _, app, ModalLayout, ModalCollectionView, ModalCollection) {

	var ModalModule = app.module('ModalModule', function (ModalModule, app) {
		
		this.getLayout = function (config) {

			var layout = new ModalLayout();

			//
			_.each(config.tabs, function (tab, index) {
				tab._index = index;
			});

			//
			layout.on('render', function () {

				//
				this.setTitle(config.title);

				//
			  this.titles.show(new ModalCollectionView({
			    collection: new ModalCollection(config.tabs)
			  }));

			  _.each(config.tabs, function (tab) {

			    var tabName = 'modalTab' + tab._index,
			      $title = $('<div/>', {
			        html: tab.title,
			        id: tabName,
			        class: 'tab-pane'
			      });

			    this.$el.find('.tab-content').append($title);
			    this.addRegion(tabName, '#' + tabName);
			    this[tabName].show(tab.view);
			  }, this);
			});

			layout.on('closeModal', function () {

				this.close();
			});

			return layout;
		};
	});
	
	return ModalModule;
});