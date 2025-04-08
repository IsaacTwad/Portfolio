// Nom du cache et liste des fichiers à mettre en cache
const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = [
  "/", // Page d'accueil
  "/index.html", // Fichier HTML principal (si différent de '/')
  "/portfolio.html", // Votre page de portfolio
  "/style.css", // Feuille de style CSS
  "/script.js", // Script JavaScript principal
  "/manifest.json", // Fichier de configuration PWA
  // Images et ressources supplémentaires
  "/images/favicon.png",
  "/images/og-image.jpg",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
  // Ajoutez ici d'autres ressources à mettre en cache
];

// Événement d'installation du Service Worker
// Cet événement se déclenche lorsque le Service Worker est installé pour la première fois
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installation en cours");

  // waitUntil() garantit que le Service Worker ne sera pas installé
  // tant que le code à l'intérieur n'est pas terminé
  event.waitUntil(
    // Ouvre un cache avec le nom défini
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Mise en cache des fichiers");
        // Ajoute tous les URLs à mettre en cache
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force l'activation immédiate du Service Worker
        // sans attendre que les onglets ouverts soient fermés
        console.log("Service Worker: Tous les fichiers mis en cache");
        return self.skipWaiting();
      })
  );
});

// Événement d'activation du Service Worker
// Cet événement se déclenche lorsque le Service Worker devient actif
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activé");

  // Nettoyage des anciens caches
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          // Pour chaque cache existant
          cacheNames.map((cacheName) => {
            // Si le cache actuel est différent de notre CACHE_NAME actuel
            if (cacheName !== CACHE_NAME) {
              console.log(
                "Service Worker: Suppression de l'ancien cache",
                cacheName
              );
              // On le supprime pour éviter de garder des ressources obsolètes
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Prend le contrôle de toutes les pages immédiatement
        // sans attendre qu'elles soient rechargées
        console.log("Service Worker: Prêt à gérer les requêtes");
        return self.clients.claim();
      })
  );
});

// Événement de récupération (fetch)
// Cet événement intercepte toutes les requêtes réseau de l'application
self.addEventListener("fetch", (event) => {
  // Stratégie "Cache First, Network Fallback"
  // Vérifie d'abord si la ressource est dans le cache
  // Si non, la récupère depuis le réseau
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Si la ressource est trouvée dans le cache, on la renvoie
        if (response) {
          console.log(
            "Service Worker: Ressource trouvée dans le cache",
            event.request.url
          );
          return response;
        }

        // Sinon, on récupère la ressource depuis le réseau
        console.log(
          "Service Worker: Récupération depuis le réseau pour",
          event.request.url
        );
        return fetch(event.request).then((networkResponse) => {
          // Vérifie que la réponse est valide
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          // Important: on clone la réponse
          // Une réponse est un flux qui ne peut être consommé qu'une fois
          // On veut la stocker dans le cache ET la renvoyer au navigateur
          // donc on doit la cloner pour l'utiliser deux fois
          const responseToCache = networkResponse.clone();

          // On ouvre le cache et on y stocke la nouvelle réponse
          caches.open(CACHE_NAME).then((cache) => {
            console.log(
              "Service Worker: Mise en cache de la nouvelle ressource",
              event.request.url
            );
            cache.put(event.request, responseToCache);
          });

          // On renvoie la réponse au navigateur
          return networkResponse;
        });
      })
      .catch((error) => {
        // En cas d'erreur (par exemple, hors ligne)
        console.log("Service Worker: Erreur de récupération", error);

        // Vous pouvez ici servir une page d'erreur hors ligne personnalisée
        // si la demande concerne une page HTML
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }

        // Pour les autres ressources, on ne peut rien faire
        return new Response("Ressource non disponible hors ligne.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        });
      })
  );
});

// Événement de synchronisation en arrière-plan (pour les formulaires hors ligne)
// Se déclenche lorsque la connexion est rétablie après avoir été perdue
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Événement de synchronisation", event.tag);

  if (event.tag === "submit-form") {
    // Traitement des formulaires mis en file d'attente lorsque hors ligne
    event.waitUntil(
      // Code pour envoyer les données stockées localement au serveur
      submitOfflineForms()
    );
  }
});

// Fonction pour envoyer les formulaires stockés localement
// Cette fonction serait implémentée pour gérer l'envoi des formulaires
// qui ont été soumis lorsque l'utilisateur était hors ligne
async function submitOfflineForms() {
  console.log("Service Worker: Tentative d'envoi des formulaires stockés");

  // Exemple d'implémentation (à adapter selon vos besoins)
  // 1. Récupérer les données de formulaire depuis IndexedDB ou autre stockage local
  // 2. Envoyer chaque formulaire au serveur
  // 3. Supprimer les formulaires envoyés avec succès du stockage local

  // Exemple simplifié (non fonctionnel, à adapter)
  /*
    const db = await openDB('offlineForms', 1);
    const forms = await db.getAll('forms');
    
    for (const form of forms) {
        try {
            const response = await fetch(form.url, {
                method: 'POST',
                body: JSON.stringify(form.data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                await db.delete('forms', form.id);
                console.log('Service Worker: Formulaire envoyé avec succès', form.id);
            }
        } catch (error) {
            console.error('Service Worker: Échec de l\'envoi du formulaire', form.id, error);
        }
    }
    */
}

// Événement de notification push
// Se déclenche lorsque le serveur envoie une notification push
self.addEventListener("push", (event) => {
  console.log("Service Worker: Notification push reçue", event);

  // Extraction des données de la notification
  const data = event.data.json();

  // Affichage de la notification
  const options = {
    body: data.body || "Nouvelle notification",
    icon: data.icon || "/images/icon-192x192.png",
    badge: data.badge || "/images/notification-badge.png",
    vibrate: data.vibrate || [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Notification", options)
  );
});

// Événement de clic sur une notification
// Se déclenche lorsque l'utilisateur clique sur une notification
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Clic sur notification", event);

  // Ferme la notification
  event.notification.close();

  // Ouvre l'URL associée à la notification
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
