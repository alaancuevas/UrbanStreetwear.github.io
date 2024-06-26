const formularioDeContacto = document.getElementById('container-form');

let nombre = document.getElementById('txtNombre');
let errorNombre = document.getElementById('errorNombre');
let telefono = document.getElementById('txtTel');
let errorTel = document.getElementById('errorTel');
let email = document.getElementById('txtMail');
let errorEmail = document.getElementById('errorEmail');
let comentarios = document.getElementById('txtComentarios');
let errorComentarios = document.getElementById('errorComentarios');
//inicia página con el foco en el campo nombre
nombre.focus();
//limpiar campos después de error
function limpiarCampos(inputElement, errorElement){
    errorElement.innerHTML= '';
    inputElement.classList.remove('error-campo');
    inputElement.value = '';
}
function agregarEventoFocus(inputElement, errorElement) {
    inputElement.addEventListener('focus', function() {
        if (inputElement.classList.contains('error-campo')) {
            limpiarCampos(inputElement, errorElement);
        }
    });
}

agregarEventoFocus(nombre, errorNombre);
agregarEventoFocus(telefono, errorTel);
agregarEventoFocus(email, errorEmail);
agregarEventoFocus(comentarios, errorComentarios);


// fijar modo de escritura 
nombre.addEventListener('input', function(){
    nombre.value = nombre.value.toUpperCase();
});
email.addEventListener('input', function(){
    email.value = email.value.toLowerCase();
});

//validar

function validar() {
    errorNombre.textContent = '';
    errorTel.textContent = '';
    errorEmail.textContent = '';
    errorComentarios.textContent = '';
    nombre.classList.remove('error-campo');
    telefono.classList.remove('error-campo');
    email.classList.remove('error-campo');
    comentarios.classList.remove('error-campo');

    let errores = [];
    let regex_nombre = /^(?=.*\s).{7,30}$/;
    let regex_tel = /^[1-9]\d{9}$/;
    let regex_email = /^[a-zA-Z0-9._%+-]{1,30}@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/;
    

    if (nombre.value.trim().length === 0) {
        errores.push("Debes ingresar tu nombre");
        errorNombre.innerHTML = "Campo obligatorio";
        nombre.classList.add('error-campo');
    } else if (!regex_nombre.test(nombre.value)) {
        errores.push("Ingresá tu nombre completo");
        errorNombre.innerHTML = "Ingresá tu nombre completo";
        nombre.classList.add('error-campo');
    } 

    if (telefono.value.length > 0 && (telefono.value.length < 10 || !regex_tel.test(telefono.value))) {
        errores.push("El teléfono debe contener 10 números");
        errorTel.innerHTML = "El teléfono debe contener 10 números";
        telefono.classList.add('error-campo');
    }

    if (email.value.trim().length === 0) {
        errores.push("Debes ingresar tu email");
        errorEmail.innerHTML = "Campo obligatorio";
        email.classList.add('error-campo');
    } else if (!regex_email.test(email.value)) {
        errores.push("Email inválido");
        errorEmail.innerHTML = "Email inválido";
        email.classList.add('error-campo');
    }
    if(comentarios.value.trim().length === 0){
        errores.push('Debes agregar un comentario');
        errorComentarios.innerHTML = 'Campo obligatorio';
        comentarios.classList.add('error-campo');
    }else if (comentarios.value.length > 200) {
        errores.push('Máximo 200 caracteres');
        errorComentarios.innerHTML = 'Máximo 200 caracteres';
        comentarios.classList.add('error-campo');
    }

    if (errores.length > 0) {
        errores.forEach(error => {
            console.log(error);
        });
        return false;
    }else{
        console.log("No hay errores en la carga del formulario");
        const enviado= document.getElementById('formulario-enviado');
        enviado.innerHTML = '';
        let contenido = document.createElement('div');
            contenido.innerHTML = `
            <div class='container-mensaje'>
            <div class='cont-mensaje'>
            <h2>Tu consulta se envió Exitosamente!</h2>
            <h3>Nos comunicaremos con usted a través de: <br>
            <span>${email.value}</span></h3>
            <a href="../productos/productos.html"><button id='irAProductos'>Ir a productos</button></a>
            </div>
            </div>
            `;
            enviado.appendChild(contenido);
            formularioDeContacto.style.display = 'none';
            window.scrollTo(0, 0); 
    }
    
    return false; 
}
formularioDeContacto.addEventListener('submit', function(event) {
    event.preventDefault();  
    validar();
});


