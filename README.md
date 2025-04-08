# Portfolio Professionnel

Un portfolio moderne, élégant et responsive avec de belles animations utilisant HTML, CSS et JavaScript.

## Caractéristiques

- **Design Responsive** - S'adapte parfaitement à tous les appareils
- **Accessibilité** - Respecte les normes WCAG pour une meilleure accessibilité
- **Animations élégantes** - Transitions fluides et effets visuels attrayants
- **Code optimisé** - HTML sémantique et CSS bien structuré
- **Performance** - Temps de chargement rapide et optimisations intégrées
- **Palette de couleurs personnalisable** - Facile à adapter à vos préférences
- **Mode sombre automatique** - S'adapte aux préférences système de l'utilisateur

## Structure du projet

```
portfolio/
├── portfolio.html    # Structure HTML principale
├── style.css         # Styles et animations CSS
├── script.js         # Interactivité et fonctionnalités JavaScript
└── README.md         # Documentation
```

## Comment personnaliser

### Informations personnelles

Ouvrez `portfolio.html` et modifiez:

1. Votre nom (section Accueil)
2. Votre description (section À propos)
3. Vos compétences (section Compétences)
4. Vos projets (section Projets)
5. Vos coordonnées (section Contact)

### Photo de profil

Remplacez l'image placeholder par votre photo:

```html
<img src="votre-photo.jpg" alt="Ma photo de profil" width="400" height="400" />
```

### Palette de couleurs

Pour changer la palette de couleurs, modifiez les variables CSS dans `style.css`:

```css
:root {
  --primary-color: #a5d8ff; /* Bleu pastel */
  --secondary-color: #ffd0c9; /* Rose pastel */
  --accent-color: #bae1ff; /* Bleu clair pastel */
  /* Autres couleurs... */
}
```

### Projets

Pour chaque projet, utilisez le modèle suivant:

```html
<div class="project-card">
  <div class="project-image">
    <img src="image-projet.jpg" alt="Nom du projet" width="600" height="400" />
  </div>
  <div class="project-content">
    <h3>Nom du projet</h3>
    <p>Description du projet.</p>
    <div class="project-tech">
      <span class="tech-tag">HTML</span>
      <span class="tech-tag">CSS</span>
      <span class="tech-tag">JavaScript</span>
    </div>
    <div class="project-links">
      <a href="#" class="btn btn-small"><i class="fas fa-eye"></i> Voir</a>
      <a href="#" class="btn btn-small"><i class="fab fa-github"></i> Code</a>
    </div>
  </div>
</div>
```

### Liens sociaux

Mettez à jour vos liens de réseaux sociaux:

```html
<div class="social-links">
  <a
    href="https://linkedin.com/in/votre-profil"
    aria-label="LinkedIn"
    class="social-icon"
    ><i class="fab fa-linkedin"></i
  ></a>
  <a
    href="https://github.com/votre-username"
    aria-label="GitHub"
    class="social-icon"
    ><i class="fab fa-github"></i
  ></a>
  <a
    href="https://twitter.com/votre-username"
    aria-label="Twitter"
    class="social-icon"
    ><i class="fab fa-twitter"></i
  ></a>
</div>
```

## Configuration du formulaire de contact

Pour que le formulaire de contact fonctionne, vous devrez:

1. Configurer un backend pour traiter les soumissions (PHP, Node.js, etc.)
2. Modifier l'attribut `action` du formulaire pour pointer vers votre script
3. Mettre à jour la gestion des réponses dans `script.js`

Exemple avec un service comme FormSubmit:

```html
<form
  id="contactForm"
  action="https://formsubmit.co/votre-email@exemple.com"
  method="POST"
>
  <!-- Champs de formulaire... -->
</form>
```

## Optimisation pour le référencement

1. Personnalisez les méta-tags dans le `<head>` avec vos informations
2. Ajoutez un fichier sitemap.xml
3. Vérifiez que toutes les images ont des attributs alt descriptifs
4. Assurez-vous que les balises sémantiques sont utilisées correctement

## Déploiement

Ce site statique peut être déployé sur n'importe quel hébergeur web:

1. GitHub Pages
2. Netlify
3. Vercel
4. Firebase Hosting
5. Hébergement web traditionnel

## Ressources additionnelles

- [Font Awesome](https://fontawesome.com/) - Pour les icônes
- [Google Fonts](https://fonts.google.com/) - Pour la typographie
- [Unsplash](https://unsplash.com/) - Pour des images libres de droits
- [unDraw](https://undraw.co/) - Pour des illustrations

## Licence

Libre d'utilisation pour des projets personnels et commerciaux.

---

Créé avec ❤️ par [Votre Nom]
