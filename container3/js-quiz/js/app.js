(() => {

    var questions = document.getElementsByClassName('inline-code-quiz');

    var buttonSubmit = document.getElementsByClassName('btn-submit')[0];

    buttonSubmit.addEventListener('click', checkAnswer);

    var correctAnswers = 0;

    var quiz = [{
            question: '"4" > 1',
            answer: true,
            selected: false
        },

        {
            question: '"4" != 4',
            answer: false,
            selected: false
        },
        {
            question: 'true >= 0',
            answer: true,
            selected: false
        },
        {
            question: '1 !== false',
            answer: true,
            selected: false
        },
        {
            question: '"false" === 0',
            answer: false,
            selected: false
        },

        {
            question: '5 === 5',
            answer: true,
            selected: false
        },

    ]

    console.log('questions is ', questions.length)

    function checkAnswer() {
        for (var i = 0; i < questions.length; i++) {

            if ((questions[i].dataset.quiz == 1 && questions[i].parentNode.previousElementSibling.checked) && questions[i].dataset.answered == 0) {
                correctAnswers++
                console.log('correct')
                questions[i].dataset.answered = '1'
                // questions[i].parentNode.parentNode.classList.add('correct')
                console.log(questions[i].parentNode.previousElementSibling.disabled)
            }
        }

        // console.log('Correct Answers is: ', correctAnswers)
        // if (correctAnswers === 4) {
        //     displayDialog('Bien', 'Genial!', 'success')
        // } else if (correctAnswers === 0) {
        //     displayDialog('Tenes que seleccionar algo', 'Daleee', 'info')
        // } else {
        //     displayDialog('Nop', 'Daleee', 'error')
        // }

          switch(correctAnswers) {

            case 4:
              displayDialog('Bien', 'Genial!', 'success')
              break
            case 3:
              displayDialog('Ok', `vas bien, aun quedan ${4 - correctAnswers} opciones validas.`, 'info')
              break
            case 2:
              displayDialog('Ok', `vas bien, aun quedan ${4 - correctAnswers} opciones validas.`, 'info')
              break
            case 1:
              displayDialog('Ok', `vas bien, aun quedan ${4 - correctAnswers} opciones validas.`, 'info')
              break
            case 0:
              displayDialog('Tenes que seleccionar algo', 'Daleee', 'info')
            default:
              displayDialog('Nop', 'Daleee', 'error')

          }
    }


    function displayDialog(message, bla, icon) {
        swal(message, bla, icon);
    }



    function showAnswer() {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].dataset.quiz === '1') {
                console.log('Right: ', questions[i].innerText)
                questions[i].insertAdjacentHTML('afterend', '<span class="answer">correcto</span>');
            } else if (questions[i].dataset.quiz === '0') {
                console.log('Wrong: ', questions[i].innerText)
                questions[i].insertAdjacentHTML('afterend', '<span class="answer">incorrecto</span>');
            }
        }

        console.log('Correct answers: ', correctAnswers);
    }

})()