var Popup = (function(){
	var me = this;
	me.el;
	me._template = '<div class="popup"><p>asdasdasd</p></div>';
	me.init = function(){
		$('body').append(_template);
		me.el = $('.popup');		
	};
	me.show = function(e,text){
		me.el.css({
			left: e.pageX+25,
			top: e.pageY-me.el.height()-25
		});
		$('.popup p').text(text);
		$('.popup').animate({
			opacity: 1},500);
	};
	me.hide = function(){
		if(!me.el) return;		
		$(me.el).remove();
	};

	return me;
})();

function Message(username, msg){
	this.from = username;
	this.message = msg;
	this.template = '<div class="message">'+username+': '+msg+'</div>';
	return this;
}