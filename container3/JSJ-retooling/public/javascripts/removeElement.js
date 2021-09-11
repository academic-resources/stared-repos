export default function removeElement (element) {
  if (element instanceof Element) {
    element.parentNode.removeChild(element);
  }
}
