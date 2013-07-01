define([
	'app/common/baseCollection',
	'app/modules/movies/models/movie'
], function(BaseCollection, MovieModel) {

	// MovieCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
	var MoviesCollection = BaseCollection.extend({
		model: MovieModel,
		url: '/movies'
	});

	return MoviesCollection;
});