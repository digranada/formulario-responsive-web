/**
 * ARCHIVO: scroll.js
 * DESCRIPCIÓN: Funcionalidades de scroll suave
 * AUTOR: David Ivan Granada Pachacama
 */

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('scroll.js cargado - Inicializando scroll suave');
    
    // ============================================
    // 1. SCROLL SUAVE PARA ENLACES INTERNOS
    // ============================================
    
    // Selecciona todos los enlaces que comienzan con #
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    // Agrega evento click a cada enlace interno
    internalLinks.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            // Previene el comportamiento por defecto del enlace
            event.preventDefault();
            
            // Obtiene el ID del elemento destino del atributo href
            const targetId = this.getAttribute('href');
            
            // Si el enlace es solo #, no hace nada
            if (targetId === '#') {
                console.log('Enlace # ignorado');
                return;
            }
            
            // Busca el elemento destino en el documento
            const targetElement = document.querySelector(targetId);
            
            // Si el elemento destino existe
            if (targetElement) {
                // Calcula la posición del elemento destino
                const targetPosition = targetElement.offsetTop - 80; // Ajusta para el header fijo
                
                // Realiza el scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // Hace el scroll suave
                });
                
                console.log('Scroll suave hacia: ' + targetId);
                
                // Si es un enlace del menú, actualiza la URL sin recargar
                if (this.classList.contains('nav-link')) {
                    history.pushState(null, null, targetId);
                }
            } else {
                console.log('Elemento no encontrado: ' + targetId);
            }
        });
    });
    
    // ============================================
    // 2. DETECCIÓN DE SCROLL PARA EFECTOS
    // ============================================
    
    // Variable para controlar si ya se han agregado los eventos
    let scrollEventsAdded = false;
    
    // Función para agregar efectos al scroll
    function agregarEfectosScroll() {
        if (!scrollEventsAdded) {
            // Efecto de header al hacer scroll
            const header = document.querySelector('.header');
            
            if (header) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 100) {
                        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        header.style.backdropFilter = 'blur(10px)';
                    } else {
                        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        header.style.backdropFilter = 'none';
                    }
                });
            }
            
            scrollEventsAdded = true;
            console.log('Efectos de scroll agregados');
        }
    }
    
    // Agrega los efectos después de un pequeño delay
    setTimeout(agregarEfectosScroll, 1000);
    
    // ============================================
    // 3. SCROLL AL TOP
    // ============================================
    
    // Crea botón para ir al inicio
    function crearBotonScrollTop() {
        // Verifica si ya existe el botón
        if (document.getElementById('scrollTopBtn')) {
            return;
        }
        
        // Crea el botón
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scrollTopBtn';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollTopBtn.style.display = 'none';
        scrollTopBtn.style.position = 'fixed';
        scrollTopBtn.style.bottom = '20px';
        scrollTopBtn.style.right = '20px';
        scrollTopBtn.style.zIndex = '1000';
        scrollTopBtn.style.backgroundColor = '#4a90e2';
        scrollTopBtn.style.color = 'white';
        scrollTopBtn.style.border = 'none';
        scrollTopBtn.style.borderRadius = '50%';
        scrollTopBtn.style.width = '50px';
        scrollTopBtn.style.height = '50px';
        scrollTopBtn.style.fontSize = '1.2rem';
        scrollTopBtn.style.cursor = 'pointer';
        scrollTopBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        scrollTopBtn.style.transition = 'all 0.3s ease';
        
        // Agrega el botón al body
        document.body.appendChild(scrollTopBtn);
        
        // Evento click para ir al inicio
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Scroll al top iniciado');
        });
        
        // Muestra/oculta el botón según el scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        // Efecto hover
        scrollTopBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2c3e50';
            this.style.transform = 'scale(1.1)';
        });
        
        scrollTopBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#4a90e2';
            this.style.transform = 'scale(1)';
        });
        
        console.log('Botón scroll top creado');
    }
    
    // Crea el botón después de un delay
    setTimeout(crearBotonScrollTop, 1500);
    
    console.log('Funcionalidades de scroll inicializadas correctamente');
});