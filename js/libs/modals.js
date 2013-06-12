(function (factory){
  if( typeof define === 'function' && define.amd){
    //AMD
    define(['jquery'], factory);
  }else{
    factory(this.jQuery || this.ender );
  }
}(function($){

	var Modals = {};

	var newModal = function (message, callbackCancel, callbackAccept, config) {
		var div = $('<div/>').html('<div class="modal hide alert-' + config.type + '" tabindex="-1" role="dialog" aria-hidden="true">'+
			'<div class="modal-header">'+
			  '<button type="button" class="close cancel" data-dismiss="modal" aria-hidden="true">&times;</button>'+
			  '<h3>' + config.title + '</h3>'+
			'</div>'+
			'<div class="modal-body">'+
			  '<p>' + message + '</p>'+
			'</div>'+
			'<div class="modal-footer">'+
			  '<button class="btn cancel" data-dismiss="modal" aria-hidden="true">' + config.btnCancel + '</button>'+
			  ((config.type === 'warning')? '<button class="btn accept" data-dismiss="modal" aria-hidden="true">' + config.btnAccept + '</button>' : '')+
			'</div>'+
		'</div>').appendTo($('body'));

		//
		div.on('click button', function (evt) {

			if ($(evt.target).hasClass('cancel')) {

				if (typeof callbackCancel === 'function') {
					callbackCancel(evt);
				}
			}
			else {

				if (typeof callbackAccept === 'function') {
					callbackAccept(evt);
				}
			}

			div.remove();
		});

		//
		div.modal();
	};

	Modals.error = function (message, callback) {
		
		newModal(message, callback, null, {
			type: 'error',
			title: 'Error!',
			btnCancel: 'Aceptar'
		});
	};

	Modals.success = function (message, callback) {
		
		newModal(message, callback, null, {
			type: 'success',
			title: 'Exito!',
			btnCancel: 'Aceptar'
		});
	};

	Modals.confirm = function (message, callbackAccept, callbackCancel) {
		
		newModal(message, callbackAccept, callbackCancel, {
			type: 'warning',
			title: 'Confirmar',
			btnAccept: 'Aceptar',
			btnCancel: 'Cancelar'
		});
	};

	return Modals;
}));