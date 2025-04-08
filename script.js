/**
 * SCRIPT PRINCIPAL DU PORTFOLIO
 * Ce fichier gère toutes les interactions et animations du site
 */

// Attendre que le DOM (structure de la page) soit complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {
  // MISE À JOUR DE L'ANNÉE
  // Met à jour automatiquement l'année dans le pied de page
  document.getElementById("year").textContent = new Date().getFullYear();

  // SÉLECTION DES ÉLÉMENTS DU DOM
  // Récupère les références aux éléments HTML qui seront manipulés
  const menuToggle = document.querySelector(".menu-toggle"); // Bouton hamburger pour menu mobile
  const navMenu = document.querySelector(".nav-menu"); // Menu de navigation
  const navLinks = document.querySelectorAll(".nav-link"); // Tous les liens de navigation
  const backToTop = document.querySelector(".back-to-top"); // Bouton "retour en haut"
  const sections = document.querySelectorAll("section"); // Toutes les sections du site
  const skillLevels = document.querySelectorAll(".skill-level"); // Barres de progression des compétences

  // GESTION DU MENU MOBILE
  // Ouvre/ferme le menu sur mobile quand on clique sur le bouton hamburger
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active"); // Active l'animation du bouton hamburger
      navMenu.classList.toggle("active"); // Fait apparaître le menu
      document.body.classList.toggle("no-scroll"); // Empêche le défilement du fond
    });
  }

  // FERMETURE DU MENU MOBILE APRÈS CLIC SUR UN LIEN
  // Ferme le menu quand on clique sur un lien pour naviguer dans la page
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active"); // Désactive l'animation du bouton
      navMenu.classList.remove("active"); // Cache le menu
      document.body.classList.remove("no-scroll"); // Réactive le défilement
    });
  });

  // DÉFILEMENT FLUIDE POUR LES LIENS D'ANCRAGE
  // Crée un effet de défilement doux vers les sections plutôt qu'un saut brutal
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Empêche le comportement par défaut du lien

      const targetId = this.getAttribute("href"); // Récupère l'ID de la cible (#section)

      if (targetId === "#") return; // Si c'est juste "#", ne fait rien

      const targetElement = document.querySelector(targetId); // Trouve l'élément cible

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Position avec ajustement pour la navbar
          behavior: "smooth", // Défilement fluide
        });
      }
    });
  });

  // GESTION DU BOUTON "RETOUR EN HAUT"
  // Fait apparaître/disparaître le bouton selon la position de défilement
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Si on a défilé de plus de 300px
      backToTop.classList.add("show"); // Affiche le bouton
    } else {
      backToTop.classList.remove("show"); // Cache le bouton
    }

    // Met à jour le lien actif dans la navigation
    updateActiveNavLink();
  });

  // ANIMATION DES BARRES DE COMPÉTENCES
  // Fonction pour animer les barres de progression des compétences
  function animateSkillBars() {
    skillLevels.forEach((level) => {
      const valueNow = level.getAttribute("aria-valuenow") + "%"; // Récupère la valeur (ex: "90%")
      level.style.width = valueNow; // Applique cette largeur
    });
  }

  // OBSERVER POUR ANIMATIONS AU DÉFILEMENT
  // Utilise l'Intersection Observer API pour détecter quand des éléments deviennent visibles
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si l'élément est visible
          if (entry.target.classList.contains("skill-level")) {
            // Anime la barre de progression
            entry.target.style.width =
              entry.target.getAttribute("aria-valuenow") + "%";
          } else if (entry.target.classList.contains("fade-in")) {
            // Ajoute une classe pour l'animation d'apparition
            entry.target.classList.add("visible");
          }
        }
      });
    },
    { threshold: 0.1 }
  ); // Déclenche quand 10% de l'élément est visible

  // OBSERVATION DES ÉLÉMENTS À ANIMER
  // Ajoute tous les éléments qui doivent être animés à l'observateur
  document
    .querySelectorAll(
      ".skill-level, .fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3"
    )
    .forEach((el) => {
      observer.observe(el); // Surveille chaque élément
    });

  // MISE À JOUR DU LIEN ACTIF DANS LA NAVIGATION
  // Change la classe 'active' sur les liens de navigation selon la section visible
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY; // Position actuelle du défilement

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Haut de la section (avec marge)
      const sectionHeight = section.offsetHeight; // Hauteur de la section
      const sectionId = section.getAttribute("id"); // ID de la section

      // Si la position de défilement est dans cette section
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active"); // Enlève la classe active de tous les liens
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active"); // Ajoute la classe active au lien correspondant
          }
        });
      }
    });
  }

  // ANIMATION DU HEADER AU SCROLL
  // Change l'apparence de la barre de navigation lors du défilement
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY; // Position actuelle du défilement

    if (scrollTop > 100) {
      // Si on a défilé de plus de 100px
      header.style.padding = "5px 0"; // Réduit la taille du header
      header.style.boxShadow = "var(--shadow-md)"; // Ajoute une ombre plus prononcée
    } else {
      header.style.padding = ""; // Revient à la taille normale
      header.style.boxShadow = ""; // Revient à l'ombre normale
    }

    lastScrollTop = scrollTop; // Mémorise la dernière position
  });

  // GESTION DU FORMULAIRE DE CONTACT
  // Simulation d'envoi du formulaire (à remplacer par un vrai backend)
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche l'envoi standard du formulaire

      // Simulation d'envoi (à remplacer par un vrai code d'envoi d'email)
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true; // Désactive le bouton pendant l'envoi
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'; // Icône de chargement

      // Simule un délai d'envoi
      setTimeout(() => {
        // Réinitialise le formulaire et affiche un message de succès
        this.reset();

        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success";
        successMessage.textContent = "Votre message a été envoyé avec succès!";

        this.parentNode.insertBefore(successMessage, this); // Insère le message avant le formulaire

        submitBtn.disabled = false; // Réactive le bouton
        submitBtn.textContent = originalText; // Restaure le texte original

        // Supprime le message après quelques secondes
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }, 2000);
    });
  }

  // ANIMATION POUR LES CARTES DE PROJET
  // Ajoute des effets visuels au survol des projets
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("active"); // Ajoute classe active au survol
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("active"); // Enlève classe active à la sortie
    });
  });

  // ANIMATION DU TEXTE DE LA SECTION HERO
  // Ajoute des animations d'apparition au texte d'accueil
  function animateHeroText() {
    const heroElements = document.querySelectorAll(
      ".hero .fade-in, .hero .fade-in-delay, .hero .fade-in-delay-2, .hero .fade-in-delay-3"
    );

    heroElements.forEach((el) => {
      el.classList.add("visible"); // Rend visible tous les éléments
    });
  }

  // Exécute les animations au chargement
  animateHeroText();

  // EFFET DE PARALLAXE POUR L'ARRIÈRE-PLAN DU HERO
  // Crée un léger effet de mouvement sur l'image de fond selon la position de la souris
  document.addEventListener("mousemove", function (e) {
    const hero = document.querySelector(".hero");

    if (hero) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01; // Calcule le déplacement horizontal
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01; // Calcule le déplacement vertical

      hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`; // Applique le mouvement
    }
  });

  // DÉTECTION DE PRÉFÉRENCE POUR LE MODE SOMBRE
  // Adapte le site selon les préférences système de l'utilisateur
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function updateTheme(darkMode) {
    document.body.classList.toggle("dark-mode", darkMode); // Ajoute/enlève la classe dark-mode
  }

  if (prefersDarkScheme) {
    updateTheme(prefersDarkScheme.matches); // Applique le thème initial

    prefersDarkScheme.addEventListener("change", (e) => {
      updateTheme(e.matches); // Met à jour si la préférence change
    });
  }

  // PRÉCHARGEMENT DES IMAGES
  // Améliore les performances en chargeant les images à l'avance
  function preloadImages() {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      const src = img.getAttribute("src");

      if (src) {
        const newImg = new Image();
        newImg.src = src; // Précharge l'image
      }
    });
  }

  // Appel de la fonction de préchargement
  preloadImages();
});
