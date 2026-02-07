/**
 * ARCHIVO: validacion.js
 * DESCRIPCIÓN: Validación del formulario de registro
 * AUTOR: David Ivan Granada Pachacama
 * ASIGNATURA: Fundamentos de Sistemas Web
 */

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('validacion.js cargado - Inicializando validación');
    
    // ============================================
    // 1. VARIABLES GLOBALES
    // ============================================
    
    // Obtiene referencias a elementos importantes
    const formulario = document.getElementById('registroForm');
    const mensajeGeneral = document.getElementById('mensajeGeneral');
    const limpiarBtn = document.getElementById('limpiarFormulario');
    
    // Verifica que el formulario exista
    if (!formulario) {
        console.error('Formulario no encontrado');
        return;
    }
    
    // ============================================
    // 2. INICIALIZACIÓN DEL FORMULARIO
    // ============================================
    
    // Establece fecha máxima para fecha de nacimiento
    establecerFechaMaxima();
    
    // Establece fecha por defecto (hace 25 años)
    establecerFechaPorDefecto();
    
    // ============================================
    // 3. EVENT LISTENERS
    // ============================================
    
    // 3.1 Evento submit del formulario
    formulario.addEventListener('submit', function(event) {
        console.log('Formulario enviado - Iniciando validación');
        event.preventDefault(); // Previene envío por defecto
        
        // Valida el formulario
        const esValido = validarFormulario();
        
        // Si es válido, muestra mensaje de éxito
        if (esValido) {
            mostrarMensajeExito();
        } else {
            mostrarMensajeError();
        }
    });
    
    // 3.2 Evento click para limpiar formulario
    if (limpiarBtn) {
        limpiarBtn.addEventListener('click', function() {
            console.log('Limpiando formulario');
            limpiarFormulario();
        });
    }
    
    // 3.3 Validación en tiempo real
    configurarValidacionTiempoReal();
    
    // ============================================
    // 4. FUNCIONES DE VALIDACIÓN
    // ============================================
    
    /**
     * Función principal de validación del formulario
     * @returns {boolean} true si el formulario es válido, false si no
     */
    function validarFormulario() {
        console.log('Ejecutando validación completa del formulario');
        
        // Obtiene valores de los campos
        const datos = obtenerDatosFormulario();
        
        // Limpia errores previos
        limpiarErrores();
        
        // Variable para rastrear si hay errores
        let hayErrores = false;
        
        // Valida cada campo
        if (!validarCampoRequerido(datos.nombres, 'nombres', 'El campo Nombres es obligatorio')) {
            hayErrores = true;
        }
        
        if (!validarCampoRequerido(datos.apellidos, 'apellidos', 'El campo Apellidos es obligatorio')) {
            hayErrores = true;
        }
        
        if (!validarFechaNacimiento(datos.fechaNacimiento)) {
            hayErrores = true;
        }
        
        if (!validarPais(datos.pais)) {
            hayErrores = true;
        }
        
        if (!validarEmail(datos.email)) {
            hayErrores = true;
        }
        
        if (!validarPassword(datos.password)) {
            hayErrores = true;
        }
        
        // Retorna true si no hay errores
        return !hayErrores;
    }
    
    /**
     * Obtiene los datos del formulario
     * @returns {object} Objeto con los datos del formulario
     */
    function obtenerDatosFormulario() {
        return {
            nombres: document.getElementById('nombres').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            pais: document.getElementById('pais').value,
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value
        };
    }
    
    /**
     * Valida un campo requerido
     * @param {string} valor - Valor del campo
     * @param {string} campoId - ID del campo
     * @param {string} mensajeError - Mensaje de error a mostrar
     * @returns {boolean} true si el campo es válido
     */
    function validarCampoRequerido(valor, campoId, mensajeError) {
        if (!valor) {
            mostrarError(campoId, mensajeError);
            marcarCampoError(campoId);
            return false;
        }
        marcarCampoValido(campoId);
        return true;
    }
    
    /**
     * Valida la fecha de nacimiento
     * @param {string} fecha - Fecha a validar
     * @returns {boolean} true si la fecha es válida
     */
    function validarFechaNacimiento(fecha) {
        if (!fecha) {
            mostrarError('fechaNacimiento', 'La fecha de nacimiento es obligatoria');
            marcarCampoError('fechaNacimiento');
            return false;
        }
        
        const fechaNacimiento = new Date(fecha);
        const hoy = new Date();
        
        // Valida que sea una fecha válida
        if (isNaN(fechaNacimiento.getTime())) {
            mostrarError('fechaNacimiento', 'La fecha no es válida');
            marcarCampoError('fechaNacimiento');
            return false;
        }
        
        // Valida que no sea futura
        if (fechaNacimiento > hoy) {
            mostrarError('fechaNacimiento', 'La fecha no puede ser futura');
            marcarCampoError('fechaNacimiento');
            return false;
        }
        
        // Calcula la edad
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        
        // Ajusta la edad si aún no ha pasado el mes de cumpleaños
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        
        // Valida edad mínima (18 años)
        if (edad < 18) {
            mostrarError('fechaNacimiento', 'Debes tener al menos 18 años');
            marcarCampoError('fechaNacimiento');
            return false;
        }
        
        marcarCampoValido('fechaNacimiento');
        return true;
    }
    
    /**
     * Valida el campo país
     * @param {string} pais - País seleccionado
     * @returns {boolean} true si el país es válido
     */
    function validarPais(pais) {
        if (!pais) {
            mostrarError('pais', 'Debes seleccionar un país');
            marcarCampoError('pais');
            return false;
        }
        marcarCampoValido('pais');
        return true;
    }
    
    /**
     * Valida el campo email
     * @param {string} email - Email a validar
     * @returns {boolean} true si el email es válido
     */
    function validarEmail(email) {
        if (!email) {
            mostrarError('email', 'El email es obligatorio');
            marcarCampoError('email');
            return false;
        }
        
        // Expresión regular para validar email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(email)) {
            mostrarError('email', 'El formato del email no es válido');
            marcarCampoError('email');
            return false;
        }
        
        marcarCampoValido('email');
        return true;
    }
    
    /**
     * Valida el campo contraseña
     * @param {string} password - Contraseña a validar
     * @returns {boolean} true si la contraseña es válida
     */
    function validarPassword(password) {
        if (!password) {
            mostrarError('password', 'La contraseña es obligatoria');
            marcarCampoError('password');
            return false;
        }
        
        if (password.length < 6) {
            mostrarError('password', 'La contraseña debe tener al menos 6 caracteres');
            marcarCampoError('password');
            return false;
        }
        
        marcarCampoValido('password');
        return true;
    }
    
    // ============================================
    // 5. FUNCIONES AUXILIARES
    // ============================================
    
    /**
     * Establece fecha máxima para fecha de nacimiento
     */
    function establecerFechaMaxima() {
        const fechaInput = document.getElementById('fechaNacimiento');
        if (fechaInput) {
            const hoy = new Date();
            fechaInput.max = hoy.toISOString().split('T')[0];
            console.log('Fecha máxima establecida: ' + fechaInput.max);
        }
    }
    
    /**
     * Establece fecha por defecto (hace 25 años)
     */
    function establecerFechaPorDefecto() {
        const fechaInput = document.getElementById('fechaNacimiento');
        if (fechaInput) {
            const hoy = new Date();
            const fechaPorDefecto = new Date(hoy.getFullYear() - 25, hoy.getMonth(), hoy.getDate());
            fechaInput.value = fechaPorDefecto.toISOString().split('T')[0];
            console.log('Fecha por defecto establecida: ' + fechaInput.value);
        }
    }
    
    /**
     * Configura validación en tiempo real
     */
    function configurarValidacionTiempoReal() {
        const campos = [
            { id: 'nombres', evento: 'blur', validacion: validarCampoRequeridoTiempoReal },
            { id: 'apellidos', evento: 'blur', validacion: validarCampoRequeridoTiempoReal },
            { id: 'email', evento: 'blur', validacion: validarEmailTiempoReal },
            { id: 'password', evento: 'input', validacion: validarPasswordTiempoReal }
        ];
        
        campos.forEach(campo => {
            const elemento = document.getElementById(campo.id);
            if (elemento) {
                elemento.addEventListener(campo.evento, function() {
                    campo.validacion(this);
                });
            }
        });
        
        console.log('Validación en tiempo real configurada');
    }
    
    /**
     * Valida campo requerido en tiempo real
     * @param {HTMLElement} elemento - Elemento del campo
     */
    function validarCampoRequeridoTiempoReal(elemento) {
        const valor = elemento.value.trim();
        const campoId = elemento.id;
        
        if (!valor) {
            mostrarError(campoId, `El campo ${capitalizeFirstLetter(campoId)} es obligatorio`);
            marcarCampoError(campoId);
        } else {
            mostrarError(campoId, '');
            marcarCampoValido(campoId);
        }
    }
    
    /**
     * Valida email en tiempo real
     * @param {HTMLElement} elemento - Elemento del email
     */
    function validarEmailTiempoReal(elemento) {
        const email = elemento.value.trim();
        
        if (!email) {
            mostrarError('email', 'El email es obligatorio');
            marcarCampoError('email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarError('email', 'El formato del email no es válido');
            marcarCampoError('email');
        } else {
            mostrarError('email', '');
            marcarCampoValido('email');
        }
    }
    
    /**
     * Valida contraseña en tiempo real
     * @param {HTMLElement} elemento - Elemento de la contraseña
     */
    function validarPasswordTiempoReal(elemento) {
        const password = elemento.value;
        
        if (!password) {
            mostrarError('password', 'La contraseña es obligatoria');
            marcarCampoError('password');
        } else if (password.length < 6) {
            mostrarError('password', 'Mínimo 6 caracteres');
            marcarCampoError('password');
        } else {
            mostrarError('password', '');
            marcarCampoValido('password');
        }
    }
    
    /**
     * Capitaliza la primera letra de un string
     * @param {string} string - String a capitalizar
     * @returns {string} String capitalizado
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    /**
     * Muestra un mensaje de error en un campo específico
     * @param {string} campoId - ID del campo
     * @param {string} mensaje - Mensaje de error
     */
    function mostrarError(campoId, mensaje) {
        const errorElement = document.getElementById(`error${capitalizeFirstLetter(campoId)}`);
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = mensaje ? 'block' : 'none';
        }
    }
    
    /**
     * Marca un campo como con error
     * @param {string} campoId - ID del campo
     */
    function marcarCampoError(campoId) {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.classList.add('campo-error');
            campo.classList.remove('campo-valido');
        }
    }
    
    /**
     * Marca un campo como válido
     * @param {string} campoId - ID del campo
     */
    function marcarCampoValido(campoId) {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.classList.add('campo-valido');
            campo.classList.remove('campo-error');
        }
    }
    
    /**
     * Limpia todos los errores del formulario
     */
    function limpiarErrores() {
        const errores = document.querySelectorAll('.error-message');
        errores.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        const campos = document.querySelectorAll('input, select');
        campos.forEach(campo => {
            campo.classList.remove('campo-error');
            campo.classList.remove('campo-valido');
        });
        
        console.log('Errores limpiados');
    }
    
    /**
     * Muestra mensaje de éxito
     */
    function mostrarMensajeExito() {
        const datos = obtenerDatosFormulario();
        
        if (mensajeGeneral) {
            mensajeGeneral.textContent = `¡SU REGISTRO FUE EXITOSO! Bienvenido/a ${datos.nombres} ${datos.apellidos}.`;
            mensajeGeneral.className = 'mensaje-general success-message';
            mensajeGeneral.style.display = 'block';
            
            // Desplaza la vista hacia el mensaje
            mensajeGeneral.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            console.log('Mensaje de éxito mostrado');
            
            // Limpia el formulario después de 3 segundos
            setTimeout(limpiarFormulario, 3000);
        }
    }
    
    /**
     * Muestra mensaje de error
     */
    function mostrarMensajeError() {
        if (mensajeGeneral) {
            mensajeGeneral.textContent = 'EXISTEN CAMPOS QUE REQUIEREN SU ATENCIÓN. Por favor, corrige los errores marcados en rojo.';
            mensajeGeneral.className = 'mensaje-general warning-message';
            mensajeGeneral.style.display = 'block';
            
            // Desplaza la vista hacia el mensaje
            mensajeGeneral.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            console.log('Mensaje de error mostrado');
        }
    }
    
    /**
     * Limpia todo el formulario
     */
    function limpiarFormulario() {
        formulario.reset();
        limpiarErrores();
        
        if (mensajeGeneral) {
            mensajeGeneral.style.display = 'none';
        }
        
        establecerFechaPorDefecto();
        
        console.log('Formulario limpiado completamente');
    }
    
    console.log('Sistema de validación inicializado correctamente');
});