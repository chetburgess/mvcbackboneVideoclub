define([
	'app/common/eventHandler'
], function (eventHandler) {

	return {
		showCollectionView: function () {

			eventHandler.trigger('movies:router:collection');
		},
		showDetailView: function (id) {
			
			eventHandler.trigger('movies:router:detail', id);
		},
		showFormView: function (id) {
			
			eventHandler.trigger('movies:router:form', id);
		}
	};
});