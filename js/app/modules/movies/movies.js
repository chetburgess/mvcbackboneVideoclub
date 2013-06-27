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
		var moviesCollection, prevFilterParams, router, validate;

		
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

			$.when(model.fetch())
				.done(function (response) {

					//
					dfd.resolve(model);
				})
				.fail(function () {

					dfd.reject(model);

					// Mostramos el listado
					router.navigate('movies', {trigger: true});
				});

			return dfd.promise();
		}


		//
		// EVENTOS DEL ROUTER
		//
		eventHandler.on('movies:router:collection', function () {

			var layout = new MoviesCollectionLayout(),
				paginationView = new PaginationView({collection: moviesCollection}),
				collectionView = new MoviesCollectionView({collection: moviesCollection});

			// Escuchamos cuando se cambia de pagina
			collectionView.listenTo(paginationView, 'changePage', function (page) {

				// Avisamos que se cambio de pagina
				prevFilterParams.page = page;
				eventHandler.trigger('movies:collection:filter', collectionView, prevFilterParams);
			});

			//
			app.vent.trigger('app:showView', layout, Movies.menuConf);

			eventHandler.trigger('movies:collection:filter', collectionView, {});

			// Seteamos las vistas para las regiones
			layout.pagination.show(paginationView);
			layout.table.show(collectionView);
		});

		eventHandler.on('movies:router:form', function (id) {

			var success = function (model) {

				var view = new MoviesFormView({
					model: model
				});

				app.vent.trigger('app:showView', view);
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

		eventHandler.on('movies:router:detail', function (id) {

			var success = function (model) {
				
				// Instanciamos
				view = new MoviesDetailView({model: model});

				app.vent.trigger('app:showView', view);
			};

			// Validamos que la pelicula exista
			validate(id)
				.done(success);
		});


		//
		// EVENTOS DE LAS VISTAS
		//
		eventHandler.on('movies:collection:filter', function (view, params) {

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

		eventHandler.on('movies:form:save', function (model, attrs) {
			var self = this,
				add = !model._id;

			// Guardamos
			model.save(attrs)
				.done( function () {

					// Avisamos
					eventHandler.trigger('app:showSuccess', {
						message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + ' con exito!',
						close: function () {

							router.navigate('movies', {trigger: true});
						}
					});
				})
				.fail( function (response) {

					var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

					//@TODO Ver de centralizar este analisis
					if (xhr.status === 409) {
						msg = 'El registro ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
					}

					// 
					eventHandler.trigger('app:showError', {message: msg});
				});
		});


		// Router Init
		router = new MoviesRouter({controller: moviesController});

	});

	//
	movies.menuConf = {
		label: 'Movies',
		routePath: '#movies'
	};

	return movies;
});