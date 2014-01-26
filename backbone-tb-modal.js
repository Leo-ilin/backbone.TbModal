(function($, _, Backbone) {

	var template = _.template(
		'<div class="modal-dialog">\
		<div class="modal-content">\
		<% if (title) { %>\
		<div class="modal-header">\
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
			<h4><%=title%></h4>\
		</div>\
		<% } %>\
		<div class="modal-body"><% if(body) { %><%=body%><% } %></div>\
		<div class="modal-footer">\
			<% if (cancelText) { %>\
			<a href="#" class="btn btn-default cancel" data-dismiss="modal"><%=cancelText%></a>\
			<% } %>\
			<a href="<%=url%>" class="btn btn-warning ok"><%=okText%></a>\
		</div>\
		</div>\
		</div>\
		');

	var Modal = Backbone.View.extend({

			className: 'modal fade',

			events: {
				'click .cancel': function(e){
					this.trigger('cancel', this);
				},
				'click .ok': function(e){
					this.trigger('ok', this);
				}
			},

			_modalOptions: {},

			body: null,

			/**
			 * Creates an instance of a Bootstrap Modal
			 * @param {Object} options
			 * @param {String|View} [options.body] Modal content. Default: none
			 * @param {String} [options.title]        Title. Default: none
			 * @param {String} [options.okText]       Text for the OK button. Default: 'OK'
			 * @param {String} [options.cancelText]   Text for the cancel button. Default: 'Cancel'. If passed a falsey value, the button will be removed
			 * @param {Function} [options.template]   Compiled underscore template to override the default one
			 */
			initialize: function(options) {
				if(options && options.options){
					this._modalOptions = options.options;
					delete options.options;
				}
				if(options && options.content){
					options.body = options.content;
					delete options.content;
				}
				if(options.body && options.body.$el){
					this.body = options.body;
					delete options.body;
				}
				this.options = _.extend({
					title: null,
					body: null,
					okText: 'OK',
					cancelText: 'Отмена',
					template: template,
					url: '#'
				}, options);

				_.bindAll(this, '_shown', '_hidden');
				var _this = this;
				this.$el
					.on('shown.bs.modal', this._shown)
					.on('hidden.bs.modal', this._hidden)
					.on('show.bs.modal shown.bs.modal hide.bs.modal hidden.bs.modal', function(e){
						_this.trigger(e.type, this);
					});
				this.on('all', this._bodyProxyEvent, this);
			},

			/**
			 * Proxy all events to the Modal.body
			 * @param event
			 * @private
			 */
			_bodyProxyEvent: function(event){
				if(this.body && this.body.trigger){
					this.body.trigger(event, this);
				}
			},

			render: function() {
				this.$el.html(this.options.template(this.options));
				if (this.body && this.body.$el) {
					this.body.render();
					this.$('.modal-body').append(this.body.$el);
				}
				this.$el.modal(this._modalOptions);
				this.isRendered = true;
				this.trigger('render', this);
				return this;
			},

			show: function() {
				if (!this.isRendered) this.render();
				this.$el.modal('show');
				return this;
			},

			hide: function() {
				this.$el.modal('hide');
				return this;
			},

			toggle: function(){
				this.$el.modal('toggle');
				return this;
			},

			_hidden: function(){
				Modal.count--;
			},

			_shown: function(){
				Modal.count++;
				//Adjust the modal and backdrop z-index; for dealing with multiple modals
				var	numModals = Modal.count,
					$backdrop = $('.modal-backdrop:eq('+numModals+')'),
					backdropIndex = parseInt($backdrop.css('z-index'),10),
					elIndex = parseInt($backdrop.css('z-index'), 10);

				$backdrop.css('z-index', backdropIndex + numModals);
				this.$el.css('z-index', elIndex + numModals);
			}
		},
		{
			//STATICS The number of modals on display
			count: 0
		}
	);

	//EXPORTS
	//CommonJS
	if (typeof require == 'function' && typeof module !== 'undefined' && exports) {
		module.exports = Modal;
	}
	//AMD / RequireJS
	if (typeof define === 'function' && define.amd) {
		return define(function() {
			Backbone.TbModal = Backbone.BootstrapModal = Modal;
		})
	}
	//Regular; add to Backbone
	else {
		Backbone.TbModal = Backbone.BootstrapModal = Modal;
	}

}(jQuery, _, Backbone));