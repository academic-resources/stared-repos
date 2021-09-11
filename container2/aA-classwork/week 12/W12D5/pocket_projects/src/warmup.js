
const partyHeader = document.getElementById('party');

export const htmlGenerator = (string, htmlElement) => {
  const p = document.createElement("p");
  const children = htmlElement.children;
  if (children) {
    const childrenArray = Array.from(children);
    childrenArray.forEach( child => {
      child.remove();
    })
  }
  p.innerHTML = string;
  htmlElement.appendChild(p);
};

htmlGenerator('Party Time.', partyHeader);

// module.exports = htmlGenerator