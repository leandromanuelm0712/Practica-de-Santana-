

document.addEventListener('DOMContentLoaded', function () {
  'use strict';


  var darkModeToggle = document.getElementById('darkModeToggle');
  var darkModeIcon = document.getElementById('darkModeIcon');


  var STORAGE_KEY = 'leandro-portfolio-dark-mode';

  
  function applyDarkMode(isDark) {
    document.body.classList.toggle('dark', isDark);

   
    var navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    }
    if (darkModeToggle) {
      darkModeToggle.setAttribute('aria-pressed', String(isDark));
    }
    if (darkModeIcon) {
      darkModeIcon.classList.toggle('fa-moon', !isDark);
      darkModeIcon.classList.toggle('fa-sun', isDark);
    }
  }

  
  function getSavedMode() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
     
    }
  }

 
  var savedMode = getSavedMode();

  if (savedMode !== null) {
    applyDarkMode(savedMode === 'dark');
  } else if (window.matchMedia &&
             window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyDarkMode(false);
  } else {
    applyDarkMode(true);
  }

  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      var isDark = !document.body.classList.contains('dark');
      applyDarkMode(isDark);
      saveMode(isDark ? 'dark' : 'light');
    });
  }


  var imagenesCarrusel = [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvz5s6cIQdBoZVV3Wj_P1s-H3cS7BxDNGwwRNrMNxa5g&s=10',
      alt: 'E-commerce: tienda online de productos',
      titulo: 'NovaShop E-commerce 🛒'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThM-MPG-7ywXXW6XbwRC1sizjghK_4BC4BfvGoMO4sXQ&s=10',
      alt: 'Dashboard: panel de control de métricas',
      titulo: 'InsightBoard Dashboard 📊'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyzyA9mNHOTpePkocibHy3tFzepNRWnH4uGw2BmJiIQ&s',
      alt: 'App Móvil: aplicación de tareas',
      titulo: 'TaskFlow PWA 📱'
    }
  ];

  var carrusel = document.getElementById('carrusel');
  var carruselImagen = document.getElementById('carruselImagen');
  var carruselPie = document.getElementById('carruselPie');
  var carruselPuntos = document.getElementById('carruselPuntos');
  var btnPrev = document.getElementById('carruselPrev');
  var btnNext = document.getElementById('carruselNext');
  var indiceActual = 0;
  var temporizador = null;
  var INTERVALO_MS = 4000;

  function mostrarImagen(indice) {
    if (!carruselImagen || imagenesCarrusel.length === 0) {
      return;
    }


    indiceActual = (indice + imagenesCarrusel.length) % imagenesCarrusel.length;

    var item = imagenesCarrusel[indiceActual];

    
    carruselImagen.style.opacity = '0';
    setTimeout(function () {
      carruselImagen.src = item.src;
      carruselImagen.alt = item.alt;
      carruselImagen.style.opacity = '1';
    }, 200);

    if (carruselPie) {
      carruselPie.textContent = item.titulo;
    }


    if (carruselPuntos) {
      Array.prototype.forEach.call(carruselPuntos.children, function (punto, i) {
        punto.classList.toggle('activo', i === indiceActual);
        punto.setAttribute('aria-selected', String(i === indiceActual));
      });
    }
  }

  function siguiente() {
    mostrarImagen(indiceActual + 1);
  }

  function anterior() {
    mostrarImagen(indiceActual - 1);
  }

  function iniciarAuto() {
    detenerAuto();
    temporizador = setInterval(siguiente, INTERVALO_MS);
  }

  function detenerAuto() {
    if (temporizador) {
      clearInterval(temporizador);
      temporizador = null;
    }
  }

  if (carrusel) {

    imagenesCarrusel.forEach(function (item, i) {
      var punto = document.createElement('button');
      punto.type = 'button';
      punto.className = 'carrusel-punto';
      punto.setAttribute('role', 'tab');
      punto.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
      punto.addEventListener('click', function () {
        mostrarImagen(i);
        iniciarAuto();
      });
      carruselPuntos.appendChild(punto);
    });

 
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        anterior();
        iniciarAuto();
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        siguiente();
        iniciarAuto();
      });
    }

  
    carrusel.addEventListener('mouseenter', detenerAuto);
    carrusel.addEventListener('mouseleave', iniciarAuto);
    carrusel.addEventListener('focusin', detenerAuto);
    carrusel.addEventListener('focusout', iniciarAuto);

   
    mostrarImagen(0);
    iniciarAuto();
  }

 
  var navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');

      if (targetId && targetId !== '#' && targetId.length > 1) {
        var target = document.querySelector(targetId);

        if (target) {
          event.preventDefault();

         
          var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 60;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });

         
          var navbarCollapse = document.getElementById('navbarNav');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }

          
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var nameInput = document.getElementById('name');
      var emailInput = document.getElementById('email');
      var messageInput = document.getElementById('message');


      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Por favor, completa todos los campos antes de enviar. ⚠️');
        return;
      }

     
      alert('¡Mensaje enviado! 📧');

      contactForm.reset();
    });
  }
});