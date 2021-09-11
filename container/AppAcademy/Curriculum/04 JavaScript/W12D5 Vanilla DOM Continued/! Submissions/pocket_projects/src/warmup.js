
const partyHeader = document.getElementById('party');

export const htmlGenerator = (string, htmlElement) => {
  const pTag = document.createElement('p')
  pTag.innerHTML = string
  
  if (Array.from(htmlElement.children).length > 0)
  htmlElement.removeChild(htmlElement.childNodes[0]);
  
  htmlElement.appendChild(pTag)
};

htmlGenerator('Party Time.', partyHeader);