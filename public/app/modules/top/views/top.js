define([
  'bbloader',
  'text!app/modules/top/views/tempaltes/top.html'
], function (Backbone, topHTML) {

	var TopView = Backbone.Marionette.ItemView.extend({
	    template: topHTML
	});

	return TopView;
});