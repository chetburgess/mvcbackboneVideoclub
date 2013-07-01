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
		var moviesCollection, prevFilterParams, validate, router;

		
		// Collection init
		moviesCollection = new MoviesCollection([]);

		//
		prevFilterParams = {};

		moviesCollection.on('request', function(){
			app.vent.trigger('app:showSpinner');
		});
		moviesCollection.on('sync', function(){
			app.vent.trigger('app:hideSpinner');
		});

		//
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
		}


		//
		// EVENTOS DE LAS VISTAS
		//
		eventHandler.on('movies:collection:filter', function (params) {

			if (!params) {
				params = prevFilterParams;
			}
			else {
				prevFilterParams = params;
			}

			moviesCollection.remove(moviesCollection.models);
			moviesCollection.fetch({data: params});
		});

		eventHandler.on('movies:collection:confirmRemove', function (view) {

			// Solicitamos confirmacion
			eventHandler.trigger('app:showConfirm', {
				message: 'Estas seguro de eliminar la pelicula "' + view.model.get('title') + '"?',
				accept: function () {

					// Destruimos el modelo
					view.model.destroy({
						// Si el modelo se elimino con exito
						success: function () {

							// Avisamos
							eventHandler.trigger('app:showSuccess', {
								message: 'La pelicula fue eliminada con exito!'
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

		eventHandler.on('movies:collection:showInfo', function (view) {

			//
			var detail = new MoviesDetailView({model: view.model});

			//
			app.UsersRels.setConfig({
				idReg: view.model.get('id'),
				typeReg: 'movie'
			}); 

			// 
			app.Modal.show([
				{view: detail, title: 'Details'},
				{view: app.UsersRels.layout, title: 'Users'}
			]);
		});

		eventHandler.on('movies:form:save', function (model, attrs) {
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


		//
		// Router Init
		//
		router = new MoviesRouter({controller: moviesController});
		
		router.on('route:showCollectionView', function () {

			var layout = new MoviesCollectionLayout(),
				paginationView = new PaginationView({collection: moviesCollection}),
				collectionView = new MoviesCollectionView({collection: moviesCollection});

			// Escuchamos cuando se cambia de pagina
			collectionView.listenTo(paginationView, 'changePage', function (page) {

				// Avisamos que se cambio de pagina
				prevFilterParams.page = page;
				eventHandler.trigger('movies:collection:filter', prevFilterParams);
			});

			//
			app.vent.trigger('app:showView', layout, Movies.menuConf);

			eventHandler.trigger('movies:collection:filter', {});

			// Seteamos las vistas para las regiones
			layout.pagination.show(paginationView);
			layout.table.show(collectionView);
		});

		router.on('route:showFormView', function (id) {

			var success = function (model) {

				var view = new MoviesFormView({
					model: model
				});

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