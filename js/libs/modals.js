(function (factory){
  if( typeof define === 'function' && define.amd){
    //AMD
    define(['jquery'], factory);
  }else{
    factory(this.jQuery || this.ender );
  }
}(function($){

	var Modals = {};

	var newModal = function (config) {
		var div = $('<div/>').html('<div class="modal hide alert alert-' + config.type + '" tabindex="-1" role="dialog" aria-hidden="true">'+
			'<div class="modal-header">'+
			  '<button type="button" class="close cancel" data-dismiss="modal" aria-hidden="true">&times;</button>'+
			  '<h4>' + config.title + '</h4>'+
			'</div>'+
			'<div class="modal-body">'+
			  '<p>' + config.message + '</p>'+
			'</div>'+
			'<div class="modal-footer">'+
			  '<button class="btn cancel" data-dismiss="modal" aria-hidden="true">' + config.btnCancel + '</button>'+
			  ((config.type === 'block')? '<button class="btn btn-warning accept" data-dismiss="modal" aria-hidden="true">' + config.btnAccept + '</button>' : '')+
			'</div>'+
		'</div>').appendTo($('body'));

		//
		div.on('click button', function (evt) {

			if ($(evt.target).hasClass('cancel')) {

				if (typeof config.cancel === 'function') {
					config.cancel(evt);
				}
			}
			else {

				if (typeof config.accept === 'function') {
					config.accept(evt);
				}
			}

			div.remove();
		});

		//
		div.modal();
	};

	// Despiega una ventana estilo error
	// @params: config: message (string), close (function)
	// @returns: void
	Modals.error = function (config) {
		
		newModal({
			message: config.message,
			cancel: config.close,
			type: 'error',
			title: 'Error!',
			btnCancel: 'Aceptar'
		});
	};

	// Despiega una ventana estilo exito
	// @params: config: message (string), close (function)
	// @returns: void
	Modals.success = function (config) {
		
		newModal({
			message: config.message,
			cancel: config.close,
			type: 'success',
			title: 'Exito!',
			btnCancel: 'Aceptar'
		});
	};

	// Despiega una ventana estilo exito
	// @params: config: message (string), accept (function), cancel (function)
	// @returns: void
	Modals.confirm = function (config) {
		
		newModal({
			message: config.message,
			accept: config.accept,
			cancel: config.cancel,
			type: 'block',
			title: 'Confirmar',
			btnAccept: 'Aceptar',
			btnCancel: 'Cancelar'
		});
	};

	return Modals;
}));