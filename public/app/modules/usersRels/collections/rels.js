define([
	'app/common/baseCollection',
	'app/modules/usersRels/models/usersRels.js'
], function (BaseCollection, UsersRelsModel) {

	// Esta es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
	var UsersRelsModelCollection = BaseCollection.extend({
		model: UsersRelsModel,
		url: '/usersRels'
	});

	return UsersRelsModelCollection;
});