define([
	'backbone',
  'backbone.wreqr',
  'backbone.babysitter',
  'backbone.marionette'
], function(Backbone, Wreqr, Babysitter, Marionette) {

	// Sobre escribimos el loadTemplae para usar HTML en lugar de un selector
	Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId, callback) {
		var template = templateId;
			if (!template || template.length === 0){
			var msg = "Could not find template: '" + templateId + "'";
			var err = new Error(msg);
			err.name = "NoTemplateError";
			throw err;
		}

		template = this.compileTemplate(template);
		callback.call(this, template);
	};

	return Backbone;
});