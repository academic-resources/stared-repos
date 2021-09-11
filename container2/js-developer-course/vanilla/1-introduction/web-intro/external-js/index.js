const exampleParagraph = document.querySelector('p#test');
exampleParagraph.addEventListener('click', updateName);

function updateName() {
	let name = prompt('Enter your name');
	exampleParagraph.textContent = `Hello, ${name}!`;
}
