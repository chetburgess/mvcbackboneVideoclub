define([
	'backbone',
	'app/common/baseCollection'
], function(Backbone, BaseCollection) {

	// ModalCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
	var ModalCollection = BaseCollection.extend({
		model: Backbone.Model
	});

	return ModalCollection;
});