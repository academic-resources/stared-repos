import { createQuestionDiv } from './index.js';

export default function (pageData) {
  document.getElementById('questions').innerHTML = '';
  for (let i = 0; i < pageData.length; i++) createQuestionDiv(pageData[i]);
}
