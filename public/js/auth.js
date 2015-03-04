(function(){
	$('button').click(function(){
		var username = $('#login').val(),
		password = $('#password').val();
		$.post('/auth',{username:username, password:password}, function(data, textStatus, xhr) {
			if (data.status === 200) {
				window.location = data.redirectTo;
			}
		})
		.error(function(err) {
			alert(err.message)
		});
	});
	$('button').hover(function() {
		Popup.init();
	});
	$('button').mousemove(function(e) {
		Popup.show(e, 'Если вы не зарегистрированы, то регистрация пройдет в автоматическом режиме');
	});
	$('button').mouseout(function() {
		Popup.hide();
	});
})();