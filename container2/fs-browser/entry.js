module.exports = list;

function getState(){
	
	var xhr = new XMLHttpRequest()
	xhr.open('GET', 'path' + window.location.pathname, true);
	xhr.onload = function(e) {
	  if (this.status == 200) {
	    // Note: .response instead of .responseText
	    var state = this.responseText;
		console.log(state)
	  }
	};
	xhr.send()	
}

getState()

function list(obj){
	
	var p = obj[Object.keys(obj)[0]]

	var div = document.createElement('div');
	var parent = document.createElement('a');
	parent.textContent = Object.keys(obj)[0];
	parent.href = '/' + Object.keys(obj)[0];
	var ul = document.createElement('ul');
	div.appendChild(ul);
	div.appendChild(parent);
	
	var children = []
	
	for(x in p){
		
		var li = document.createElement('li');
		li.textContent = p[x];
		children.unshift(li)
		
	}
	
	children.forEach(function(e){
		ul.appendChild(e)
	})
	
	document.body.appendChild(div)
	
}