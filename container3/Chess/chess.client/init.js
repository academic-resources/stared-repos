module.exports = init;

function init ($game){
	
	var winX = $('body').width()
			, winY = window.innerHeight
	;
	
	this.table = document.getElementById('table');
	
	var checker = Math.floor((Math.min(winX, winY) - 20) / 8)
		, style = document.createElement('style');

	checker = Math.min(checker, 100);
	style.textContent = '#table div {height:'+checker+'px; width:'+checker+'px;}';
	
	var boardWidth = (checker * 8)
		,	chatWidth = 320
		,	right = 0;
	
	var sidebarLeft = boardWidth / 2 + winX / 2 
	
	style.textContent += '#table {width:'+boardWidth+'px;height:'+boardWidth+'px}'
	style.textContent += '.sidebar{left:'+(boardWidth+10)+'px}'

	document.body.appendChild(style)

	if(!$game)
	{				
		
		var board = this.board = this.betaBoard(this.config);
		
		this.moves = []
		
		setBoard(board)
		
		socket.emit('boardSet', board)		
	}

	else 
	{	
	
		var board = this.board = $game.board;
		this.moves = $game.moves || []
		setBoard(board);
		if ($game.moves) 
			{
					$game.moves.forEach(function(move){
					game.move(move)
				})
			}
	}	
				
		function setBoard(board){			
			board.forEach(function(row,x){
				
				var x = x;
				
				row.forEach(function(obj, y){
					
					var div = Div(obj.ordinal, x, y);
					makeDroppable(div);
					if(obj.occupant) 
					{
						var pieceIMG = piece(obj, x, y);
						div.appendChild(pieceIMG);
					}
					
					game.table.appendChild(div) 
					
				})
				
			})
						
			function piece(obj, x, y){
				var o = obj.occupant;
				var div = document.createElement('div');
				div.classList.add('piece');
				div.classList.add(o.type + '_' + o.color);
				div.id = 'p' + obj.ordinal;
				div.setAttribute('data-checker', [x,y].join(','));
				dragnMotion(div);
				return div
				/*
				var img = document.createElement('img');
				img.src = '../images/chesspieces/'+[o.type, o.color].join('.')+'.png'
				img.id = 'p' + obj.ordinal;
				img.setAttribute('data-checker', [x,y].join(','))
				dragnMotion(img)
				return img
				*/
			}
			
			function Div (ordinal, x, y){
				var div = document.createElement('div');
				div.id = 'sq'+ordinal;
				div.style.top = y * checker + 'px';
				div.style.left = x * checker + 'px';
				div.setAttribute('data-index', [x,y].join(','))
				if(x % 2)
				{
					div.classList.add( y % 2 ? 'white' : 'black' );
				}
				else
				{
					div.classList.add( y % 2 ? 'black' : 'white' );
				}
				return div
			}
		};
				
		function dragnMotion (el){
			var $el = $(el);

			$el.draggable({
				helper: function(){
					var div = document.createElement('div');
					this.dragImg = this.dragImg || $(this).clone()[0]
					this.dragImg.classList.add('dragImg');
					document.body.appendChild(this.dragImg)
					div.classList.add('helper');
					return div
				},
				start: function(evt, ui){	
					this.classList.add('fade')
				},
				drag: function(evt, ui){
					console.log('ui.position ', ui.position)
					console.log('ui.offset ', ui.offset)
					$(this.dragImg).css({
						top: evt.pageY - 50,
						left: evt.pageX - 50
					})
				},
				stop: function(evt, ui){	
					this.classList.remove('fade');
					document.body.removeChild(this.dragImg);
				}
			})
		}
		
		function makeDroppable(el){
			$(el).droppable({
				tolerance: 'pointer',
				drop: function(evt, ui){
					var $self = $(this);
					var piece = ui.draggable;
					if(piece.hasClass('sidebar')) return;
					if ($self.attr('data-index') == piece.attr('data-checker')) 
					{
						return;
					}
					else
					{
						var data = {piece: piece[0].id, start: piece.attr('data-checker'), endPoint: $self[0].id};
						game.move(data);
						socket.emit('move', data)
					}
				} 
			})
		}
		
		$('.captured').droppable({
			drop: function(evt, ui){
				var $self = $(this);
				var piece = ui.draggable;
				piece.css({
					top: 0,
					left: 0
				});
				if ($self.attr('data-index') == piece.attr('data-checker')) 
				{
					return;
				}
				else
				{
					var data = {piece: piece[0].id, start: piece.attr('data-checker'), endPoint: $self[0].id};
					game.move(data);
					socket.emit('move', data)
				}
			}
		})

		return this.table

	}