define([
	'app/app',
	'app/common/eventHandler',
	'app/modules/usersRels/collections/rels',
	'app/modules/usersRels/views/layout',
    'app/modules/usersRels/views/collection',
    'app/modules/pagination/views/pagination'
], function (app, eventHandler, UsersRelsCollection, UsersRelsCollectionLayout, UsersRelsCollectionView, PaginationView) {

	var usersRels = app.module('UsersRels', function (UsersRels, app) {
		var usersRelsCollection, prevFilterParams, defaultParams;

		
		// Collection init
		usersRelsCollection = new UsersRelsCollection([]);


		//
		// EVENTOS DE LAS VISTAS
		//
		eventHandler.on('usersRels:collection:filter', function (params) {

			if (!params) {
				params = prevFilterParams;
			}
			else {
				prevFilterParams = params;
			}

			params = _.extend(params, defaultParams || {});

			usersRelsCollection.remove(usersRelsCollection.models);
			usersRelsCollection.fetch({data: params});
		});

		eventHandler.on('usersRels:collection:confirmRemove', function (view) {

			// Solicitamos confirmacion
			eventHandler.trigger('app:showConfirm', {
				message: 'Estas seguro de eliminar la relacion con el usuario "' + view.model.get('name') + '"?',
				accept: function () {

					// Destruimos el modelo
					view.model.destroy({
						// Si el modelo se elimino con exito
						success: function () {

							// Avisamos
							eventHandler.trigger('app:showSuccess', {
								message: 'La relacion fue eliminada con exito!'
							});
						},
						error: function () {

							// @TODO mostrar error

							// Avisamos
							eventHandler.trigger('app:showError', {
								message: '',
								close: function () {

									//@TODO ver si es necesario hacer algo
								}
							});
						}
					});
				}
			});
		});


		//
		// VIEWS
		//
		var collectionView = new UsersRelsCollectionView({collection: usersRelsCollection});
		var paginationView = new PaginationView({collection: usersRelsCollection});
		
		//
		this.layout = new UsersRelsCollectionLayout();
		this.layout.table.show(collectionView);
		this.layout.pagination.show(paginationView);
		this.layout.on('render', function () {

			eventHandler.trigger('usersRels:collection:filter');
		});


		//
		// METHODS
		//
		this.setConfig = function (config) {
			defaultParams = config;
		}
	});

	return usersRels;
});