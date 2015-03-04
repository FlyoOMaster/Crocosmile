(function(){
	var messages = $('#messages'),
		textArea = $('#textArea'),
		btnSend = $('#sendMsg'),
		inputMsg = $('#inputMsg'),
		speed = 250;
		socket = new io();
	socket.on('connection', function(){
		alert('connect')
	})
	
	socket.on('system', function(message){
		var message = new Message('Система', message);
		appendMessage(message.template, speed)
	});

	socket.on('auth', function(user){
		var message = user?new Message('Система', user.username+' вошел'):new Message('Система', 'Ошибка авторизации');
		appendMessage(message.template, speed)
	});
	socket.on('message', function(msg){
		appendMessage(msg.template, speed)
	})
	socket.on('disconnected', function(){
		var msg = new Message('System', user.username+' вышел');
		appendMessage(msg.template, speed);
	})
	function appendMessage(text, speed){		
		messages.append(text);
		var msg = $('#messages div:last-child');
		msg.css({
			position: 'relative',
			'margin-left':0,
			opacity: 0
		});
		textArea.animate({ scrollTop: textArea[0].scrollHeight },500);
			msg.animate(
				{
					'margin-left': 30,
					opacity:1
				},
				speed, 
				function() {
					btnSend.prop('disabled', false);	
			});
		/**/
	}
	inputMsg.keyup(function(e) {
		if(e.keyCode === 13){
			btnSend.click();
			inputMsg.val('');
		}
	});
	btnSend.click(function(event) {
		btnSend.prop('disabled', true);
		console.log(user);
		var msg = new Message(user.username, inputMsg.val());
		socket.emit('message', msg, function(){
			appendMessage(msg.template, speed)
		})
	});
})();