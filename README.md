# backbone.TbModal
================

## Bootstrap 3 Modal for using as backbonejs plugin

var modal = new Backbone.TbModal({
	title: 'Header',
	okText: 'Ok',
	cancelText: 'Cancel',
	body: new Backbone.View()//your view for modal body
});


Available public methods:
* show()
* hide()
* toggle()

Events:
* show
* shown
* hide
* hidden
