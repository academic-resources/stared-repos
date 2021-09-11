export default function (text, container, lastPageEl, selected = false) {
  const btn = document.createElement('div');
  btn.innerHTML = `
    <button id=numberedButtonId__${text} class='numberedButton buttonHover${selected ? ' numberedButton--selected' : ''}'>
      ${text}
    </button>
  `;
  container.appendChild(btn);
  return selected ? btn : lastPageEl;
}
