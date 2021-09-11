module.exports = setUIControls

function setUIControls(){
	var sidebar = $('.sidebar')
	 	,	x = $('.boardOptions > h1')
		,	opts = $('.boardOptions')
		,	table = $('#table')
		,	gridX = $('#gridX')
		,	gridY = $('#gridY')
	;
	
	table.draggable()
	sidebar.draggable({
		handle: '.title'
	});
	gridX.bind('change', function(){
		game.config.x = this.value
	})
	
	gridY.bind('change', function(){
		game.config.y = this.value
	})
	
	$('#variantSelector input').bind('click', function(){
		game.config.variant = this.id;
		if (this.id == 'princes')
		{
			game.config.x = 7
			game.config.y = 7
		}
		else if (this.id == 'blank')
		{
			game.config.x = gridX.val()
			game.config.y = gridY.val()
		}
		else
		{
			game.config.x = 8
			game.config.y = 8
		}
	})
	
	x.click(function(){
		opts.toggleClass('hoverd');
		table.one('click drag', function(){
			opts.removeClass('hoverd');
		})
	})
}