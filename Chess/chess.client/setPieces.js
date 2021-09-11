module.exports = setPieces;

function setPieces (){
	var st = this.state = Object.create(null);

	var squares = $('[data-index]');

	function dragnMotion (el){
		var $el = $(el);
	
		$el.draggable({
			helper: function(){
				var div = document.createElement('div');
				this.dragImg = document.createElement('img');
				this.dragImg.src = this.src;
				this.dragImg.width = this.width;
				this.dragImg.classList.add('dragImg');
				document.body.appendChild(this.dragImg)
				div.classList.add('helper');
				return div
			},
			start: function(evt, ui){	
				this.classList.add('fade')
			},
			drag: function(evt, ui){
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

	squares.each(function(i, sq){
		var $sq = $(sq);
		var c = $sq.attr('data-index').split(',')
		st[c] = Object.create(null);
		st[c].el = $sq;

		if (c[1] == 2)
		{
			var img = document.createElement('img');
			$sq.append(img);
			img.src = '../images/chesspieces/p_w.png'
			img.id = 'p' + c.join(',')
			img.setAttribute('data-checker', c.join(',')) // id == starting position
			img.setAttribute('data-side', 'white')
			dragnMotion(img)
		}
	
		if (c[1] == 7)
		{
			var img = document.createElement('img');
			$sq.append(img);
			img.src = '../images/chesspieces/p_b.png'
			img.id = 'p' + c.join(',')
			img.setAttribute('data-checker', c.join(','))
			dragnMotion(img)
		}
	
		if (c[1] == 1 || c[1] == 8)
		{	
			var img = document.createElement('img');
			img.id = 'p' + c.join(',')
			img.setAttribute('data-checker', c.join(','))
			var $img = $(img);
			$sq.append(img);
			dragnMotion(img);
			var x = (c[1] == 1) ? 'w' : 'b'
		
			if ( c[0] == 1 || c[0] == 8 )
				img.src = '../images/chesspieces/r_'+x+'.png';
			if ( c[0] == 2 || c[0] == 7 )
				img.src = '../images/chesspieces/n_'+x+'.png';
			if ( c[0] == 3 || c[0] == 6 )
				img.src = '../images/chesspieces/b_'+x+'.png';
			if ( c[0] == 4 && c[1] == 1 ){
				img.src = '../images/chesspieces/k_'+x+'.png';				
			}
			if ( c[0] == 5 && c[1] == 1 ){
				img.src = '../images/chesspieces/q_w.png';				
			}
			if ( c[0] == 4 && c[1] == 8 ){
				img.src = '../images/chesspieces/k_b.png';				
			}
			if ( c[0] == 5 && c[1] == 8 ){
				img.src = '../images/chesspieces/q_b.png';				
			}
		}

		st[c.join(',')] = ''
	})

};