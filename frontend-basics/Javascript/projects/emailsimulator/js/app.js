/* Vars */

const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

/* Event listeners */

insertEventListeners()

function insertEventListeners(){
    document.addEventListener('DOMContentLoaded', inicioApp);

    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    formularioEnviar.addEventListener('submit', enviarEmail);

    resetBtn.addEventListener('click', resetForm)

}

/* Functions */

function inicioApp(){
    btnEnviar.disabled = true;
}

function validarCampo(){
    validarLongitud(this);

    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if(email.value != '' && asunto.value != '' && mensaje.value != ''){
        if (errores.length === 0){
            btnEnviar.disabled = false;
        }
    } else{
        btnEnviar.disabled = true;
    }
}

function validarLongitud(campo){

    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@') != -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function enviarEmail(e){
    e.preventDefault();

    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    const enviado = document.createElement('img');
    enviado.src = "img/mail.gif";
    enviado.style.display = 'block';

    setTimeout(function(){
        spinnerGif.style.display = "none";
        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function(){
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);

    }, 3000);
}

function resetForm(e){
    e.preventDefault();

    formularioEnviar.reset();
}
