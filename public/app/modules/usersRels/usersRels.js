define([
	'underscore',
	'app/app',
	'app/common/eventHandler',
	'app/modules/usersRels/collections/rels',
	'app/modules/usersRels/views/layout',
    'app/modules/usersRels/views/collection',
    'app/modules/pagination/views/pagination'
], function (_, app, eventHandler, UsersRelsCollection, UsersRelsCollectionLayout, UsersRelsCollectionView, PaginationView) {

	var usersRels = app.module('UsersRels', function (UsersRels, app) {
		var usersRelsCollection, prevFilterParams, defaultParams;

		
		// Collection init
		usersRelsCollection = new UsersRelsCollection([]);


		//
		// METHODS
		//
		this.getLayout = function (config) {

			var collectionView = new UsersRelsCollectionView({collection: usersRelsCollection}),
				paginationView = new PaginationView({collection: usersRelsCollection}),
				layout = new UsersRelsCollectionLayout();

			defaultParams = config;

			//
			collectionView.on('itemView:confirmRemove', function (view) {

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
			layout.on('filter', function (params) {

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
			
			layout.on('render', function () {

				this.table.show(collectionView);
				this.pagination.show(paginationView);
				this.filter(1);
			});

			return layout;
		}
	});

	return usersRels;
});