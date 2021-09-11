module.exports = setChatControls

function setChatControls(){
	
	var chatlog = $('.chatlog')
		,	textBox = $('.input')
	
	function chatHTML (data, bool){
		var msg = document.createElement('p')
			, box = document.createElement('div')
		;
		switch (data.from)
		{
			case 'bot':
				msg.classList.add('giveFeedBack')
				break;
			case 'opponent':
				msg.classList.add('opponentChat')
				break;
			case 'me':
				msg.classList.add('selfChat')
				break;
		}
		msg.textContent = data.text;
		box.appendChild(msg)		
		chatlog.append(box)
		chatlog[0].scrollTop = chatlog[0].scrollHeight;
	}
	
	socket.on('chat', function(data){
		chatHTML(data);
	})
		
	textBox.bind('keyup', function(evt){
		if(evt.keyCode === 13){
			var el = $('.input').children()[0];
			var text = el.textContent;
			socket.emit('chat', {text: text, from: 'opponent'});
			chatHTML({text: text, from: 'me'});
			el.textContent = '';
			$(el).focus();
		}
	})
	
	return chatHTML
	
}