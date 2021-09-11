const partyHeader = document.getElementById('party')

export const htmlGenerator = (string, htmlElement) => {
  htmlElement.innerHTML = '<p>' + string + '</p>'
}

htmlGenerator('Party Time.', partyHeader)
