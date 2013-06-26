define([
  'app/app',
	'app/common/eventHandler',
  'app/modules/movies/routers/movies',
	'app/modules/movies/controllers/movies',
  'app/modules/movies/models/movie',
  'app/modules/movies/collections/movies',
  'app/modules/movies/views/collection',
  'app/modules/movies/views/form',
  'app/modules/movies/views/detail'
], function (app, eventHandler, MoviesRouter, moviesController, MovieModel, MoviesCollection, MoviesCollectionView, MoviesFormView, MoviesDetailView) {

	var movies = app.module('Movies', function (Movies, app) {

		// Collection init
		var moviesCollection = new MoviesCollection([{
		   "_id": "827ab53afbe25a7dbc462a4f73000f6c",
		   "_rev": "2-89dcc1a86f6992d8836cf804b924a3e2",
		   "title": "Hobbit",
		   "genre": "Fantasia",
		   "year": 2012,
		   "rating": 5
		},{
		   "_id": "827ab53afbe25a7dbc462a4f7300411e",
		   "_rev": "7-cf42e09cbe90fc5800720dcf024d4e15",
		   "title": "Rambo II",
		   "genre": "Terror",
		   "year": 1993,
		   "rating": 1
		}]);


		// Listeners
		eventHandler.on('movies:router:collection', function () {

			var view = new MoviesCollectionView({
				collection: moviesCollection
			});

			app.vent.trigger('app:showView', view);
		});

		eventHandler.on('movies:router:form', function (id) {

			//TODO validar id contra la base de datos
			var model = false;
			if (!!id) {
				model = moviesCollection.get(id);
			}
			if (!model) {
				model = new MovieModel();
			}

			//
			var view = new MoviesFormView({
				model: model
			});

			app.vent.trigger('app:showView', view);
		});

		eventHandler.on('movies:router:detail', function (id) {

			//TODO validar id contra la base de datos
			var model = false;
			if (!!id) {
				
				model = moviesCollection.get(id);
				if (!!model) {

					//
					var view = new MoviesDetailView({
						model: model
					});

					app.vent.trigger('app:showView', view);
					return false;
				}
			}
		});


		// Router Init
		var router = new MoviesRouter({controller: moviesController});

	});

	return movies;
});