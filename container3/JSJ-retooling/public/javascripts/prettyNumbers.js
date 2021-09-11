export default function () {
  document.querySelectorAll('.scoreThreadPage').forEach(score => {
    if (+score.innerText > 1000000) score.innerText = '999k';
    else if (+score.innerText > 1000) score.innerText = `${(+score.innerText / 1000).toPrecision(2)}k`;
  });
}
