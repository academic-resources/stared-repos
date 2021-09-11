document.addEventListener('DOMContentLoaded', e => {
    let sentences = ["Are my customers actually satisfied?", "Will my product be a success or a flop?", "Are my employees happy at work?", "Do people like attending my events?"];
    if (document.querySelector('.typingAnimation_span')) typingAnim(sentences);
});


const typingAnim = (array) => {

    const animSpan = document.querySelector('.typingAnimation_span');
    let index = 0;
    animSpan.style.fontSize = '50px';
    animSpan.style.fontWeight = 'bold';
    animSpan.style.color = ' #333E48';

    setInterval(_ => {
        if (animSpan.style.borderRight) {
            animSpan.style.borderRight = '';
            animSpan.style.paddingRight = '8px';
        } else {
            animSpan.style.borderRight = 'solid 8px #00BF6F';
            animSpan.style.paddingRight = '0px';
        }
    }, 350);

    setTimeout(_ => {
        incrementAnim(array[index].split(''));
    }, 500);

    const incrementAnim = (arr) => {
        let increment = setInterval(_ => {
            animSpan.textContent += arr.shift();
            animSpan.style.borderRight = 'solid 8px #00BF6F';
            animSpan.style.paddingRight = '0px';
            if (arr.length < 1) {
                clearInterval(increment);
                index++
                setTimeout(_ => {
                    decramentAnim(animSpan.textContent.split(''));
                }, 1500);
            };
        }, 50);
    };

    const decramentAnim = (arr) => {
        let decrement = setInterval(_ => {
            arr.pop()
            animSpan.textContent = arr.join('');
            animSpan.style.borderRight = 'solid 8px #00BF6F'
            animSpan.style.paddingRight = '0px'
            if (arr < 1) {
                clearInterval(decrement);
                if (index >= array.length) index = 0;
                animSpan.style.borderRight = 'solid 8px #00BF6F'
                setTimeout(_ => {
                    incrementAnim(array[index].split(''));
                }, 350);
            }
        }, 25);
    };
};
