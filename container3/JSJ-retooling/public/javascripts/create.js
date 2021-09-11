export default function create (type, id = null, ...classes) {
  const el = document.createElement(type);
  if (id) el.setAttribute('id', id);
  if (classes.length) classes.forEach(hClass => el.classList.add(hClass));
  return el;
}
