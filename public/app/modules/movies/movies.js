define([
	'app/app',
	'app/common/eventHandler',
	'app/modules/movies/routers/movies',
	'app/modules/movies/controllers/movies',
	'app/modules/movies/collections/movies',
	'app/modules/movies/views/layout',
    'app/modules/movies/views/collection',
    'app/modules/pagination/views/pagination',
	'app/modules/movies/views/form',
	'app/modules/movies/views/detail'
], function (app, eventHandler, MoviesRouter, moviesController, MoviesCollection, MoviesCollectionLayout, MoviesCollectionView, PaginationView, MoviesFormView, MoviesDetailView) {

	var movies = app.module('Movies', function (Movies, app) {

		var moviesCollection = new MoviesCollection([]), 

			prevFilterParams = {},

			validate = function (id) {
	      
				var model = new moviesCollection.model({_id: id}),
					dfd = jQuery.Deferred();

				//
				app.vent.trigger('app:showSpinner');

				//
				$.when(model.fetch())
					.done(function (response) {

						//
						dfd.resolve(model);
					})
					.fail(function () {

						dfd.reject(model);

						// Mostramos el listado
						router.navigate('movies', {trigger: true});
					})
					.always(function () {

						//
						app.vent.trigger('app:hideSpinner');
					});

				return dfd.promise();
			}, 

			router =  new MoviesRouter({controller: moviesController});


		// Collection events
		moviesCollection.on('request', function(){
			app.vent.trigger('app:showSpinner');
		});
		moviesCollection.on('sync', function(){
			app.vent.trigger('app:hideSpinner');
		});


		//
		router.on('route:showCollectionView', function () {

			var paginationView = new PaginationView({collection: moviesCollection}),
				collectionView = new MoviesCollectionView({collection: moviesCollection}),
				layout = new MoviesCollectionLayout();

			//
			paginationView.on('changePage', function (page) {

				layout.filter(page);
			});

			//
			collectionView.on('itemview:confirmRemove', function (view) {

				// Solicitamos confirmacion
				eventHandler.trigger('app:showConfirm', {
					message: 'Estas seguro de eliminar la pelicula "' + view.model.get('title') + '"?',
					accept: function () {

						// Destruimos el modelo
						view.model.destroy({
							success: function () {

								// Mostramos el exito
								eventHandler.trigger('app:showSuccess', {
									message: 'La pelicula fue eliminada con exito!'
								});
							},
							error: function () {

								// Mostramos el error @TODO obtener el error
								eventHandler.trigger('app:showError', {
									message: ''
								});
							}
						});
					}
				});
			});
			collectionView.on('itemview:showInfo', function (view) {

				var detailView = new MoviesDetailView({model: view.model}),

					usersRelsLayout = app.UsersRels.getLayout({
						idReg: view.model.get('id'),
						typeReg: 'movie'
					}),

					modalLayout = app.ModalModule.getLayout({
						title: view.model.get('title'),
						tabs: [
							{view: detailView, title: 'Details'},
							{view: usersRelsLayout, title: 'Users'}
						]
					});

				app.vent.trigger('app:showModal', modalLayout);
			}, this);

			//
			layout.on('filter', function (params) {

				if (!params) {
					params = prevFilterParams;
				}
				else {
					prevFilterParams = params;
				}

				moviesCollection.remove(moviesCollection.models);
				moviesCollection.fetch({data: params});
			});
			layout.on('render', function () {
				this.pagination.show(paginationView);
				this.table.show(collectionView);
				this.filter(1);
			});
			app.vent.trigger('app:showView', layout, Movies.menuConf);
		});
		
		//
		router.on('route:showFormView', function (id) {

			var success = function (model) {

				var view = new MoviesFormView({
					model: model
				});

				//
				view.on('save', function (model, attrs) {

					var self = this,
						add = !model.get('_id');

					// Guardamos
					model.save(attrs)
						.done(function () {

							// Avisamos
							eventHandler.trigger('app:showSuccess', {
								message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + ' con exito!',
								close: function () {

									router.navigate('movies', {trigger: true});
								}
							});
						})
						.fail(function (res) {

							var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

							//@TODO Ver de centralizar este analisis
							if (res.status === 409) {
								msg = 'El registro ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
							}

							// 
							eventHandler.trigger('app:showError', {message: msg});
						});
				});
				view.on('showError', function (msg) {

					eventHandler.trigger('app:showError', msg);
				});

				//
				app.vent.trigger('app:showView', view, Movies.menuConf);
			};

			// Si pasamos un id
			if (!!id) {

				// Validamos que la pelicula exista
				validate(id)
					.done(success);
			}
			else {

				success(new moviesCollection.model);
			}
		});
		
		//
		router.on('route:showDetailView', function (id) {

			// Validamos que la pelicula exista
			validate(id)
				.done(function (model) {
				
					// Instanciamos
					var view = new MoviesDetailView({model: model});

					app.vent.trigger('app:showView', view, Movies.menuConf);
			});
		});
	});

	//
	movies.menuConf = {
		label: 'Movies',
		routePath: '#movies'
	};

	return movies;
});