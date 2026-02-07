/**
 * ARCHIVO: menu.js
 * DESCRIPCIÓN: Funcionalidades del menú de navegación
 * AUTOR: David Ivan Granada Pachacama
 */

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('menu.js cargado - Inicializando menú');
    
    // ============================================
    // 1. MENÚ HAMBURGUESA PARA DISPOSITIVOS MÓVILES
    // ============================================
    
    // Selecciona el botón del menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    // Selecciona la lista de navegación
    const navList = document.querySelector('.nav-list');
    
    // Verifica que ambos elementos existan
    if (menuToggle && navList) {
        // Agrega evento click al botón del menú
        menuToggle.addEventListener('click', function() {
            console.log('Menú hamburguesa clickeado');
            // Alterna la clase 'active' para mostrar/ocultar el menú
            navList.classList.toggle('active');
            
            // Cambia el icono del menú
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ============================================
    // 2. CERRAR MENÚ AL HACER CLIC EN UN ENLACE
    // ============================================
    
    // Selecciona todos los enlaces del menú de navegación
    const navLinks = document.querySelectorAll('.nav-list a');
    
    // Agrega evento click a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Solo en dispositivos móviles (ancho <= 768px)
            if (window.innerWidth <= 768) {
                // Cierra el menú
                if (navList) {
                    navList.classList.remove('active');
                }
                
                // Restaura el icono del menú hamburguesa
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                console.log('Menú cerrado después de click en enlace');
            }
        });
    });
    
    // ============================================
    // 3. CERRAR MENÚ AL HACER CLIC FUERA DE ÉL
    // ============================================
    
    // Agrega evento click al documento
    document.addEventListener('click', function(event) {
        // Verifica si el click fue fuera del menú
        if (navList && navList.classList.contains('active') &&
            !navList.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            
            // Cierra el menú
            navList.classList.remove('active');
            
            // Restaura el icono del menú hamburguesa
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            console.log('Menú cerrado al hacer click fuera');
        }
    });
    
    // ============================================
    // 4. CERRAR MENÚ AL CAMBIAR EL TAMAÑO DE VENTANA
    // ============================================
    
    // Agrega evento resize a la ventana
    window.addEventListener('resize', function() {
        // Si la ventana es más grande que 768px, cierra el menú móvil
        if (window.innerWidth > 768) {
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            
            // Restaura el icono del menú hamburguesa
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    console.log('Funcionalidades del menú inicializadas correctamente');
});