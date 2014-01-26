backbone.TbModal
================

Bootstrap 3 Modal for using as backbonejs plugin

var modal = new Backbone.TbModal({
	title: 'Заголовок',
	okText: 'Пуск',
	cancelText: 'Отмена',
	body: new Backbone.View()
});


Available public methods:
show()
hide()
toggle()

Events:
show
shown
hide
hidden
