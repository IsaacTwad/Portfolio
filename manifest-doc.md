# Documentation du Manifest.json

Le fichier `manifest.json` est un élément essentiel pour transformer votre site web en Progressive Web App (PWA). Il définit comment votre application s'affiche et se comporte lorsqu'elle est installée sur l'appareil d'un utilisateur.

## Propriétés du Manifest

### Informations de base

| Propriété     | Description                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| `name`        | Nom complet de l'application, affiché lors de l'installation et sur l'écran d'accueil |
| `short_name`  | Version courte du nom, utilisée sur les écrans d'accueil où l'espace est limité       |
| `description` | Description de l'application pour les utilisateurs et les moteurs de recherche        |

### Navigation et affichage

| Propriété     | Description                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `start_url`   | URL chargée lorsque l'utilisateur lance l'application depuis l'écran d'accueil                                         |
| `display`     | Mode d'affichage de l'application (`standalone` fait apparaître l'app comme une application native sans UI navigateur) |
| `orientation` | Orientation préférée de l'application (`portrait-primary` pour un affichage vertical)                                  |

### Apparence

| Propriété          | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `background_color` | Couleur de fond affichée pendant le chargement de l'application                 |
| `theme_color`      | Couleur principale de l'interface utilisateur (barre d'adresse, etc.)           |
| `icons`            | Liste des icônes utilisées pour représenter l'application à différentes tailles |

#### Détails des icônes

- L'icône de **192x192** pixels est utilisée pour la plupart des appareils
- L'icône de **512x512** pixels est nécessaire pour les écrans haute résolution
- La propriété `purpose: "any maskable"` permet à l'icône de s'adapter aux différentes formes d'icônes sur Android

### Internationalisation

| Propriété | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `lang`    | Langue principale de l'application (ex: `fr-FR`)            |
| `dir`     | Direction du texte (`ltr` = left to right, gauche à droite) |

### Métadonnées supplémentaires

| Propriété                     | Description                                                        |
| ----------------------------- | ------------------------------------------------------------------ |
| `prefer_related_applications` | Indique si le navigateur doit suggérer des applications similaires |
| `categories`                  | Catégories pour les magasins d'applications web                    |
| `screenshots`                 | Captures d'écran pour les magasins d'applications                  |

## Comment tester votre PWA

1. Utilisez l'outil Lighthouse dans Chrome DevTools pour vérifier si votre PWA est configurée correctement
2. Sur mobile, accédez à votre site et vérifiez si la bannière "Ajouter à l'écran d'accueil" apparaît
3. Sur desktop, recherchez l'icône d'installation dans la barre d'adresse

## Conseils d'optimisation

- Assurez-vous que toutes les icônes sont disponibles dans les tailles spécifiées
- Testez votre PWA sur différents appareils pour vérifier l'affichage
- La propriété `maskable` sur les icônes est importante pour l'apparence sur Android
- Le `theme_color` doit correspondre à la palette de couleurs de votre site

## Ressources utiles

- [Web.dev - Add a web app manifest](https://web.dev/add-manifest/)
- [MDN Web Docs - Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Builder](https://www.pwabuilder.com/) - Outil pour générer votre manifest et icônes
